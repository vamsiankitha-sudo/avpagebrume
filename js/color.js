/* In-browser coloring for the free Little Animal Helpers pages.
   Tap a color, then tap a closed area. Lines stay put. No build step. */
(function () {
  var COLORS = [
    ["Red", "#E25B4A"],
    ["Orange", "#F0A04B"],
    ["Yellow", "#F2D36B"],
    ["Sage", "#8DB596"],
    ["Green", "#3E8C5A"],
    ["Blue", "#6AA6D6"],
    ["Purple", "#A88BC4"],
    ["Pink", "#F0A0B4"],
    ["Brown", "#8C6239"],
    ["Charcoal", "#2B2B2B"]
  ];

  var studio = document.querySelector("[data-color-page]");
  if (!studio) return;

  var palette = studio.querySelector("[data-palette]");
  var stage = studio.querySelector("[data-stage]");
  var sourceImg = stage.querySelector("img");
  var hint = studio.querySelector("[data-hint]");
  var undoBtn = studio.querySelector("[data-act='undo']");
  var clearBtn = studio.querySelector("[data-act='clear']");
  var saveBtn = studio.querySelector("[data-act='save']");

  var selected = COLORS[3];
  var mask = null;
  var pixels = null;
  var view = null;
  var lineCanvas = null;
  var width = 0;
  var height = 0;
  var undoStack = [];
  var painted = false;
  var ready = false;
  var pointer = null;

  function say(text) {
    if (hint) hint.textContent = text;
  }

  function pack(hex) {
    var n = parseInt(hex.slice(1), 16);
    var r = (n >> 16) & 255;
    var g = (n >> 8) & 255;
    var b = n & 255;
    return (r | (g << 8) | (b << 16) | (255 << 24)) >>> 0;
  }

  var WHITE = pack("#FFFFFF");
  var fillValue = pack(selected[1]);

  function setPressed(button) {
    var buttons = palette.querySelectorAll(".swatch");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", buttons[i] === button ? "true" : "false");
    }
  }

  function choose(name, hex, button) {
    selected = [name, hex];
    fillValue = name === "Eraser" ? WHITE : pack(hex);
    setPressed(button);
    say(name === "Eraser" ? "Eraser selected. Tap a colored area to clear it." : name + " selected. Tap an area to fill it.");
  }

  function addSwatch(name, hex, extraClass) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "swatch" + (extraClass ? " " + extraClass : "");
    button.style.backgroundColor = hex;
    button.setAttribute("aria-label", name);
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", function () {
      choose(name, hex, button);
    });
    palette.appendChild(button);
    return button;
  }

  COLORS.forEach(function (pair, index) {
    var button = addSwatch(pair[0], pair[1], "");
    if (index === 3) setPressed(button);
  });
  addSwatch("Eraser", "#FFFFFF", "eraser");

  function loadImage(src) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = function () { reject(new Error("load")); };
      img.src = src;
    });
  }

  function snapshot() {
    undoStack.push(new Uint32Array(pixels));
    if (undoStack.length > 8) undoStack.shift();
    undoBtn.disabled = false;
  }

  function render() {
    var ctx = view;
    var image = new ImageData(new Uint8ClampedArray(pixels.buffer), width, height);
    ctx.putImageData(image, 0, 0);
    ctx.drawImage(lineCanvas, 0, 0);
  }

  function findOpen(x, y) {
    if (x < 0 || y < 0 || x >= width || y >= height) return null;
    if (!mask[y * width + x]) return [x, y];
    for (var r = 1; r <= 10; r++) {
      for (var dy = -r; dy <= r; dy++) {
        for (var dx = -r; dx <= r; dx++) {
          if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue;
          var nx = x + dx;
          var ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          if (!mask[ny * width + nx]) return [nx, ny];
        }
      }
    }
    return null;
  }

  /* Scanline flood fill. Walls are the black lines; the color buffer stays opaque. */
  function flood(startX, startY, color) {
    var target = pixels[startY * width + startX];
    if (target === color) return 0;
    var stack = [startX, startY];
    var written = 0;
    while (stack.length) {
      var y = stack.pop();
      var x = stack.pop();
      while (x >= 0 && pixels[y * width + x] === target && !mask[y * width + x]) x--;
      x++;
      var above = false;
      var below = false;
      while (x < width && pixels[y * width + x] === target && !mask[y * width + x]) {
        pixels[y * width + x] = color;
        written++;
        if (y > 0) {
          var up = (y - 1) * width + x;
          var openUp = pixels[up] === target && !mask[up];
          if (!above && openUp) {
            stack.push(x, y - 1);
            above = true;
          } else if (above && !openUp) {
            above = false;
          }
        }
        if (y < height - 1) {
          var down = (y + 1) * width + x;
          var openDown = pixels[down] === target && !mask[down];
          if (!below && openDown) {
            stack.push(x, y + 1);
            below = true;
          } else if (below && !openDown) {
            below = false;
          }
        }
        x++;
      }
    }
    return written;
  }

  function paintAt(clientX, clientY) {
    if (!ready) return;
    var canvas = view.canvas;
    var rect = canvas.getBoundingClientRect();
    var x = Math.floor(((clientX - rect.left) / rect.width) * width);
    var y = Math.floor(((clientY - rect.top) / rect.height) * height);
    var spot = findOpen(x, y);
    if (!spot) {
      say("That spot is a line. Tap just beside it.");
      return;
    }
    if (pixels[spot[1] * width + spot[0]] === fillValue) {
      say("That area is already " + selected[0].toLowerCase() + ".");
      return;
    }
    snapshot();
    var count = flood(spot[0], spot[1], fillValue);
    if (!count) {
      undoStack.pop();
      undoBtn.disabled = undoStack.length === 0;
      say("That area is already " + selected[0].toLowerCase() + ".");
      return;
    }
    painted = true;
    clearBtn.disabled = false;
    render();
    say(selected[0] === "Eraser" ? "Cleared that area." : "Filled with " + selected[0].toLowerCase() + ".");
  }

  function onPointerDown(event) {
    if (event.button !== undefined && event.button !== 0) return;
    pointer = { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event) {
    if (!pointer) return;
    var dx = event.clientX - pointer.x;
    var dy = event.clientY - pointer.y;
    pointer = null;
    if (dx * dx + dy * dy > 64) return;
    paintAt(event.clientX, event.clientY);
  }

  undoBtn.addEventListener("click", function () {
    var prev = undoStack.pop();
    if (!prev) return;
    pixels.set(prev);
    undoBtn.disabled = undoStack.length === 0;
    painted = true;
    clearBtn.disabled = false;
    render();
    say("Undid the last fill.");
  });

  clearBtn.addEventListener("click", function () {
    if (!painted) return;
    snapshot();
    pixels.fill(WHITE);
    painted = false;
    clearBtn.disabled = true;
    render();
    say("Cleared the colors. Undo brings them back.");
  });

  saveBtn.addEventListener("click", function () {
    if (!ready) return;
    view.canvas.toBlob(function (blob) {
      if (!blob) {
        say("Could not save the picture.");
        return;
      }
      var link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = studio.getAttribute("data-save") || "colored-page.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000);
      say("Saved your picture.");
    }, "image/png");
  });

  say("Getting the page ready…");
  undoBtn.disabled = true;
  clearBtn.disabled = true;
  saveBtn.disabled = true;

  var src = studio.getAttribute("data-image");
  var fallback = studio.getAttribute("data-fallback");

  loadImage(src).catch(function () { return loadImage(fallback); }).then(function (img) {
    width = img.naturalWidth;
    height = img.naturalHeight;
    var sample = document.createElement("canvas");
    sample.width = width;
    sample.height = height;
    var sampleCtx = sample.getContext("2d", { willReadFrequently: true });
    sampleCtx.drawImage(img, 0, 0);
    var srcData = sampleCtx.getImageData(0, 0, width, height).data;

    lineCanvas = document.createElement("canvas");
    lineCanvas.width = width;
    lineCanvas.height = height;
    var lineCtx = lineCanvas.getContext("2d");
    var lineImage = lineCtx.createImageData(width, height);
    var line = lineImage.data;
    mask = new Uint8Array(width * height);

    for (var p = 0, i = 0; p < mask.length; p++, i += 4) {
      var lum = (srcData[i] + srcData[i + 1] + srcData[i + 2]) / 3;
      if (lum < 210) {
        var alpha = Math.max(0, Math.min(255, ((210 - lum) * 255) / 70));
        line[i] = 20;
        line[i + 1] = 20;
        line[i + 2] = 20;
        line[i + 3] = alpha;
      }
      if (lum < 150) mask[p] = 1;
    }
    lineCtx.putImageData(lineImage, 0, 0);

    pixels = new Uint32Array(width * height);
    pixels.fill(WHITE);

    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", studio.getAttribute("data-label") || "Coloring page");
    view = canvas.getContext("2d", { willReadFrequently: true });
    render();

    sourceImg.setAttribute("hidden", "");
    stage.appendChild(canvas);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("contextmenu", function (event) { event.preventDefault(); });

    ready = true;
    saveBtn.disabled = false;
    say(selected[0] + " selected. Tap an area to fill it.");
  }).catch(function () {
    say("The coloring page did not load. You can still download the PDF.");
  });
})();
