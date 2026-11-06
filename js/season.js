/* Seasonal layer for the AV Pagebrume homepage and printable notes.
   No build step. The HTML ships with Diwali copy, so the page still
   greets Diwali if this file does not run.

   Windows are checked in order. Diwali is an absolute 2026 range because
   the lunar date moves; add another absolute entry for a later year.
   Recurring windows must stay inside a single calendar year.

   Preview without changing the clock:
     ?season=diwali|kindness|thanksgiving|christmas|everyday
     ?on=YYYY-MM-DD   (treated as the visitor's local calendar date)
*/
(function () {
  var ABSOLUTE = [
    { id: "diwali", start: [2026, 11, 6], end: [2026, 11, 11] }
  ];

  var RECURRING = [
    { id: "kindness", start: [11, 12], end: [11, 18] },
    { id: "thanksgiving", start: [11, 19], end: [11, 30] },
    { id: "christmas", start: [12, 1], end: [12, 26] }
  ];

  var COPY = {
    diwali: {
      id: "diwali",
      docTitle: "Happy Diwali — AV Pagebrume",
      docDescription: "Happy Diwali from AV Pagebrume. Meet Max, Coco, Freya, and Bruno, color with the helpers, and find free printables for the season.",
      kicker: "Festival of Lights",
      title: "Happy Diwali",
      hindi: "शुभ दीपावली",
      lede: "Max, Coco, Freya, and Bruno help at home this week: a card, something sweet, a welcome, and a careful look around before the family gathers.",
      primary: "Color with the helpers",
      secondary: "See the book",
      nextLead: "World Kindness Day is 13 November",
      nextRest: " — free coloring pages.",
      book: "For Diwali they bring light in ordinary ways: a card at the door, something sweet to share, a place saved, and help at home.",
      printKicker: "This season",
      printTitle: "Happy Diwali",
      printCopy: "The Diwali offer is this greeting, the story of the helpers, and coloring in the browser. World Kindness Day on 13 November is the next activity for kids. The Christmas gift tracker is here when you want to plan ahead.",
      leadCard: "kindness",
      beats: {
        max: "Max tucks a handmade card into the evening post.",
        coco: "Coco sets out a sweet to share when the lamps are lit.",
        freya: "Freya saves a seat so everyone is inside the circle.",
        bruno: "Bruno helps at home before the family gathers."
      },
      notes: {
        kindness: "Kindness Day is 13 November, a few days after Diwali. Max, Coco, Freya, and Bruno are the helpers in the stories below.",
        gifts: "Christmas is still ahead. This two-page list can wait, or you can print it when you start planning."
      }
    },
    kindness: {
      id: "kindness",
      docTitle: "World Kindness Day — AV Pagebrume",
      docDescription: "World Kindness Day coloring pages from AV Pagebrume. Read a short story and color Max, Coco, Freya, and Bruno. Free, no sign-up.",
      kicker: "November 13",
      title: "World Kindness Day",
      hindi: "",
      lede: "A small kind act is enough. Read a short story, then color Max, Coco, Freya, and Bruno.",
      primary: "Color the kindness pages",
      secondary: "See the book",
      nextLead: "Christmas gift tracker",
      nextRest: " — a quiet list when you want it.",
      book: "The same four helpers practice small kindnesses: a card, a shared sweet, a welcome, and care for the neighborhood.",
      printKicker: "This season",
      printTitle: "World Kindness Day",
      printCopy: "November 13 is World Kindness Day. Five pages to read and color: Max, Coco, Freya, Bruno, and a page for a kind act of your own. The gift tracker can wait.",
      leadCard: "kindness",
      beats: {
        max: "Max carries a feel-better card to someone who needs it.",
        coco: "Coco bakes extra so every friend can have one.",
        freya: "Freya says, \"Come sit with us,\" to a shy new friend.",
        bruno: "Bruno looks after the park so neighbors can enjoy it."
      },
      notes: {
        kindness: "This is the week of World Kindness Day, 13 November. Read a story aloud, then color the page.",
        gifts: "A quiet Christmas list, when you want it. Two pages, no sign-up."
      }
    },
    thanksgiving: {
      id: "thanksgiving",
      docTitle: "Thankful for helpers — AV Pagebrume",
      docDescription: "A week for gratitude at AV Pagebrume. Little Animal Helpers and free kindness coloring pages for families.",
      kicker: "A week for gratitude",
      title: "Thankful for helpers",
      hindi: "",
      lede: "Around a table, thank the people who carry, cook, teach, and look after home. Max, Coco, Freya, and Bruno do those jobs in the book.",
      primary: "See the book",
      secondary: "Color a kind act",
      nextLead: "Christmas gift tracker",
      nextRest: " — print it when you start planning.",
      book: "Gratitude in this book looks like ordinary helping: the mail, the baking, the classroom, and the neighborhood.",
      printKicker: "This season",
      printTitle: "A grateful table",
      printCopy: "A week for gratitude and gathering. Color a kind act with the helpers, or read the book together. When you want a gift list, the tracker is ready.",
      leadCard: "kindness",
      beats: {
        max: "Max is glad for every door that opens to a letter.",
        coco: "Coco saves a treat for the people at the table.",
        freya: "Freya makes room so no one eats alone.",
        bruno: "Bruno helps at home so the meal can be peaceful."
      },
      notes: {
        kindness: "Kindness Day was 13 November. These pages are still free to color together.",
        gifts: "If gifts are starting to come up, this two-page tracker is ready. No sign-up."
      }
    },
    christmas: {
      id: "christmas",
      docTitle: "A calm Christmas list — AV Pagebrume",
      docDescription: "A calm Christmas gift tracker from AV Pagebrume, plus Little Animal Helpers and free coloring pages.",
      kicker: "A quiet list",
      title: "A calm Christmas list",
      hindi: "",
      lede: "No rush. A two-page gift tracker for who, the idea, the budget, and whether it is bought and wrapped.",
      primary: "Get the gift tracker",
      secondary: "Color with the helpers",
      nextLead: "World Kindness Day pages",
      nextRest: " — still free to color.",
      book: "The coloring book makes a quiet gift. Max, Coco, Freya, and Bruno keep the same jobs in December as they do all year.",
      printKicker: "This season",
      printTitle: "Christmas planning",
      printCopy: "The useful page this month is the Christmas gift tracker: who, the idea, the budget, bought, and wrapped, plus a budget summary. The kindness coloring pages are still free.",
      leadCard: "gifts",
      beats: {
        max: "Max delivers the cards and remembers who is still waiting.",
        coco: "Coco tucks a small sweet in with the gifts.",
        freya: "Freya writes names carefully on the tags.",
        bruno: "Bruno carries the parcels in and stacks them safely."
      },
      notes: {
        kindness: "These kindness pages stay free beside the Christmas gift tracker.",
        gifts: "A calm list for this month. Two pages, undated, so write in the year and print when you are ready."
      }
    },
    everyday: {
      id: "everyday",
      docTitle: "AV Pagebrume — Coloring books, planners and printables",
      docDescription: "Coloring books, planners and printables from AV Pagebrume. See Little Animal Helpers and free coloring pages.",
      kicker: "Coloring books",
      title: "A quiet hour with a pencil",
      hindi: "",
      lede: "Coloring books, planners and printables from AV Pagebrume. Meet Max, Coco, Freya, and Bruno.",
      primary: "See the book",
      secondary: "Free printables",
      nextLead: "",
      nextRest: "",
      book: "Four helpers, four jobs, and pages meant to be colored together.",
      printKicker: "Free to print",
      printTitle: "Pages for any week",
      printCopy: "Color with the helpers, print a page, or keep a gift list for later. Free for personal and classroom use. No sign-up.",
      leadCard: "",
      beats: {
        max: "Max carries letters, and the important cards too.",
        coco: "Coco bakes sweets meant for sharing.",
        freya: "Freya teaches, and keeps a chair free for a new friend.",
        bruno: "Bruno fights fires, and he helps at home."
      },
      notes: {
        kindness: "World Kindness Day is 13 November. These pages are free to color all year.",
        gifts: "An undated two-page list. Print it in any year, and write the year at the top."
      }
    }
  };

  function absValue(y, m, d) {
    return y * 10000 + m * 100 + d;
  }

  function seasonFor(date) {
    var i;
    var value = absValue(date.y, date.m, date.d);
    for (i = 0; i < ABSOLUTE.length; i++) {
      var absWindow = ABSOLUTE[i];
      var start = absValue(absWindow.start[0], absWindow.start[1], absWindow.start[2]);
      var end = absValue(absWindow.end[0], absWindow.end[1], absWindow.end[2]);
      if (value >= start && value <= end) return absWindow.id;
    }
    var md = date.m * 100 + date.d;
    for (i = 0; i < RECURRING.length; i++) {
      var recurring = RECURRING[i];
      var from = recurring.start[0] * 100 + recurring.start[1];
      var to = recurring.end[0] * 100 + recurring.end[1];
      if (md >= from && md <= to) return recurring.id;
    }
    return "everyday";
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
    return seasonFor(date);
  }

  function setField(name, value) {
    var nodes = document.querySelectorAll("[data-season-text='" + name + "']");
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = value;
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
    setField("lede", season.lede);
    setField("primary", season.primary);
    setField("secondary", season.secondary);
    setField("book", season.book);
    setField("print-kicker", season.printKicker);
    setField("print-title", season.printTitle);
    setField("print-copy", season.printCopy);

    var hindi = document.querySelector("[data-season-text='hindi']");
    if (hindi) {
      hindi.textContent = season.hindi || "";
      hindi.hidden = !season.hindi;
    }

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

    var links = document.querySelectorAll("[data-season-link]");
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("data-href-" + season.id);
      if (href) links[i].setAttribute("href", href);
    }

    var next = document.querySelector("[data-season-next]");
    if (next) {
      if (!season.nextLead) {
        next.hidden = true;
      } else {
        next.hidden = false;
        var nextLink = next.querySelector("a");
        var rest = next.querySelector("[data-next-rest]");
        if (nextLink) {
          nextLink.textContent = season.nextLead;
          var nextHref = nextLink.getAttribute("data-href-" + season.id);
          if (nextHref) nextLink.setAttribute("href", nextHref);
        }
        if (rest) rest.textContent = season.nextRest || "";
      }
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
      setMeta('meta[name="theme-color"]', {
        diwali: "#f4b942",
        kindness: "#8fb89a",
        thanksgiving: "#e2b08a",
        christmas: "#1e4a38",
        everyday: "#f7f4ee"
      }[season.id] || "#f7f4ee");
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

  var initialId = currentId();
  document.documentElement.setAttribute("data-season", initialId);

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
