/* Seasonal copy for the AV Pagebrume homepage and a few page notes.
   No build step.

   The homepage HTML is the holiday default, so the page still reads
   correctly if this file does not run.

   Holiday window for 2026: 11 November through 26 December.
   Thanksgiving is 26 November; Christmas Day is 25 December.
   The window closes the day after Christmas.

   To retire the holiday homepage after Christmas, delete the HOLIDAY
   entry below. Visitors then get COPY.everyday. Also remove the
   .season-line paragraph in index.html if you want the no-JavaScript
   page to match. Preview without changing the clock:
     ?season=holiday|everyday
     ?on=YYYY-MM-DD   (treated as the visitor's local calendar date)
*/
(function () {
  var HOLIDAY = { id: "holiday", start: [2026, 11, 11], end: [2026, 12, 26] };

  var COPY = {
    holiday: {
      id: "holiday",
      docTitle: "Little Animal Helpers — a coloring storybook | AV Pagebrume",
      docDescription: "Little Animal Helpers is a coloring storybook for kids ages 4-8, with a story on every page. A screen-free gift from Thanksgiving through Christmas, from AV Pagebrume.",
      kicker: "Little Animal Helpers",
      title: "A story on every page",
      line: "A screen-free gift from Thanksgiving through Christmas.",
      lede: "Little Animal Helpers is a coloring storybook for kids ages 4-8. Most coloring books are pictures alone. This one has a story on every page. Max the Puppy carries the mail, Coco the Cat bakes, Freya the Fox teaches, and Bruno the Bear keeps watch.",
      book: "A screen-free gift from Thanksgiving through Christmas. Most coloring books are pictures alone. This one has a story on every page.",
      printKicker: "This season",
      printTitle: "Holiday printables",
      printCopy: "The Christmas gift tracker is a quiet two-page list. The kindness coloring pages are free any day: a short story to read, then a page to color.",
      leadCard: "gifts",
      theme: "#f4eadc",
      beats: {
        max: "Max carries a letter that matters, and the page tells you why.",
        coco: "Coco bakes something sweet to share, and the page shows the kitchen.",
        freya: "Freya keeps a seat for a new friend, and the page tells that story.",
        bruno: "Bruno looks after the neighborhood, and the page shows how."
      },
      notes: {
        kindness: "These pages are free kindness activities for any day of the year. Read a short story, then color Max, Coco, Freya, or Bruno.",
        gifts: "A two-page list for the holiday season: who, the idea, the budget, bought, and wrapped. It is undated, so write in the year and print it when you are ready."
      }
    },
    everyday: {
      id: "everyday",
      docTitle: "AV Pagebrume — Coloring books, planners and printables",
      docDescription: "Coloring books, planners and printables from AV Pagebrume. Little Animal Helpers is a coloring storybook for kids ages 4-8, with a story on every page.",
      kicker: "Little Animal Helpers",
      title: "A story on every page",
      line: "",
      lede: "Little Animal Helpers is a coloring storybook for kids ages 4-8. Most coloring books are pictures alone. This one has a story on every page. Max the Puppy carries the mail, Coco the Cat bakes, Freya the Fox teaches, and Bruno the Bear keeps watch.",
      book: "Most coloring books are pictures alone. This one has a story on every page.",
      printKicker: "Free to print",
      printTitle: "Pages for any week",
      printCopy: "Color a kindness story, print a page, or keep a gift list for later. Free for personal and classroom use. No sign-up.",
      leadCard: "",
      theme: "#f7f4ee",
      beats: {
        max: "Max carries a letter that matters, and the page tells you why.",
        coco: "Coco bakes something sweet to share, and the page shows the kitchen.",
        freya: "Freya keeps a seat for a new friend, and the page tells that story.",
        bruno: "Bruno looks after the neighborhood, and the page shows how."
      },
      notes: {
        kindness: "These pages are free kindness activities for any day of the year. Read a short story, then color the page.",
        gifts: "An undated two-page list. Print it in any year, and write the year at the top."
      }
    }
  };

  function absValue(y, m, d) {
    return y * 10000 + m * 100 + d;
  }

  function inHoliday(date) {
    var value = absValue(date.y, date.m, date.d);
    var start = absValue(HOLIDAY.start[0], HOLIDAY.start[1], HOLIDAY.start[2]);
    var end = absValue(HOLIDAY.end[0], HOLIDAY.end[1], HOLIDAY.end[2]);
    return value >= start && value <= end;
  }

  function partsFromClock(now) {
    return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() };
  }

  function partsFromStamp(stamp) {
    var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(stamp);
    if (!match) return null;
    var y = Number(match[1]);
    var m = Number(match[2]);
    var d = Number(match[3]);
    var check = new Date(y, m - 1, d);
    if (check.getFullYear() !== y || check.getMonth() !== m - 1 || check.getDate() !== d) return null;
    return { y: y, m: m, d: d };
  }

  function queryValue(name) {
    var search = window.location.search;
    if (!search || search.length < 2) return "";
    var pairs = search.substring(1).split("&");
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("=");
      var key = decodeURIComponent(pair[0] || "").replace(/\+/g, " ");
      if (key !== name) continue;
      return decodeURIComponent(pair.slice(1).join("=") || "").replace(/\+/g, " ");
    }
    return "";
  }

  function currentId() {
    var requested = queryValue("season");
    if (requested && COPY[requested]) return requested;
    var stamped = partsFromStamp(queryValue("on"));
    var date = stamped || partsFromClock(new Date());
    return inHoliday(date) ? "holiday" : "everyday";
  }

  function setField(name, value) {
    var nodes = document.querySelectorAll("[data-season-text='" + name + "']");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = value;
      if (name === "line") nodes[i].hidden = !value;
    }
  }

  function setMeta(selector, value) {
    var el = document.querySelector(selector);
    if (el && value) el.setAttribute("content", value);
  }

  function apply(id) {
    var season = COPY[id] || COPY.everyday;
    document.documentElement.setAttribute("data-season", season.id);
    if (document.body) document.body.setAttribute("data-season", season.id);

    setField("kicker", season.kicker);
    setField("title", season.title);
    setField("line", season.line);
    setField("lede", season.lede);
    setField("book", season.book);
    setField("print-kicker", season.printKicker);
    setField("print-title", season.printTitle);
    setField("print-copy", season.printCopy);

    var beats = document.querySelectorAll("[data-beat]");
    for (var b = 0; b < beats.length; b++) {
      var beatKey = beats[b].getAttribute("data-beat");
      if (season.beats[beatKey]) beats[b].textContent = season.beats[beatKey];
    }

    var notes = document.querySelectorAll("[data-season-note]");
    for (var n = 0; n < notes.length; n++) {
      var noteKey = notes[n].getAttribute("data-season-note");
      if (season.notes[noteKey]) notes[n].textContent = season.notes[noteKey];
    }

    var cards = document.querySelectorAll("[data-season-card]");
    for (var c = 0; c < cards.length; c++) {
      var cardName = cards[c].getAttribute("data-season-card");
      cards[c].classList.toggle("is-lead", !!season.leadCard && cardName === season.leadCard);
    }

    if (document.body && document.body.getAttribute("data-season-page") === "home") {
      document.title = season.docTitle;
      setMeta('meta[name="description"]', season.docDescription);
      setMeta('meta[property="og:title"]', season.docTitle);
      setMeta('meta[property="og:description"]', season.docDescription);
      setMeta('meta[name="twitter:title"]', season.docTitle);
      setMeta('meta[name="twitter:description"]', season.docDescription);
      setMeta('meta[name="theme-color"]', season.theme);
    }
  }

  var helpersReady = false;

  function initHelpers() {
    if (helpersReady) return;
    helpersReady = true;
    document.addEventListener("click", function (event) {
      var button = event.target.closest ? event.target.closest(".helper-toggle") : null;
      if (!button) return;
      var card = button.closest(".helper");
      if (!card) return;
      var willOpen = !card.classList.contains("is-open");
      var openCards = document.querySelectorAll(".helper.is-open");
      for (var i = 0; i < openCards.length; i++) {
        openCards[i].classList.remove("is-open");
        var toggle = openCards[i].querySelector(".helper-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
      if (willOpen) {
        card.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  }

  document.documentElement.setAttribute("data-season", currentId());

  function boot() {
    apply(currentId());
    initHelpers();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
