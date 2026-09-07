/* ============================================================
   Zet de tekst uit content.js (SITE_CONTENT) in de pagina.
   Puur "domme" rendering: geen interactiviteit hier (dat staat in
   script.js) -- dit bestand loopt één keer bij het laden van de
   pagina en vult alles wat in content.js staat in op de plek waar
   index.html een `data-key`, `data-placeholder-key` of `data-list`
   markering heeft staan.
   ============================================================ */
(function () {
  "use strict";

  if (typeof SITE_CONTENT === "undefined") return; // content.js niet geladen

  function getPath(obj, path) {
    var parts = path.split(".");
    var value = obj;
    for (var i = 0; i < parts.length; i++) {
      if (value == null) return undefined;
      value = value[parts[i]];
    }
    return value;
  }

  // -- helper: zet tekst in een element, waarbij elke regel op een eigen
  //    <br>-regel komt. Accepteert twee vormen:
  //    - een array van strings, bv. ["Eerste zin.", "Tweede zin."]
  //    - één string met handmatige "\n"-regelafbrekingen erin
  //    (zonder dat we innerHTML/HTML hoeven te gebruiken) --
  function appendTextWithBreaks(el, textOrLines) {
    var lines = Array.isArray(textOrLines) ? textOrLines : String(textOrLines).split("\n");
    for (var k = 0; k < lines.length; k++) {
      if (k > 0) el.appendChild(document.createElement("br"));
      el.appendChild(document.createTextNode(lines[k]));
    }
  }

  // -- simpele tekstvelden: <element data-key="pad.naar.tekst"> --
  //    mag een losse string zijn (komt gewoon als tekst te staan), of een
  //    array van strings -- dan komt elke regel apart te staan met een
  //    <br> ertussen, in hetzelfde element (handig om ergens 1 zin op te
  //    splitsen in 2 of meer zonder de HTML aan te hoeven passen). --
  var textEls = document.querySelectorAll("[data-key]");
  for (var i = 0; i < textEls.length; i++) {
    var el = textEls[i];
    var value = getPath(SITE_CONTENT, el.getAttribute("data-key"));
    if (typeof value === "string") {
      el.textContent = value;
    } else if (Array.isArray(value)) {
      while (el.firstChild) el.removeChild(el.firstChild);
      appendTextWithBreaks(el, value);
    }
  }

  // -- placeholders: <input data-placeholder-key="pad.naar.tekst"> --
  var placeholderEls = document.querySelectorAll("[data-placeholder-key]");
  for (var j = 0; j < placeholderEls.length; j++) {
    var pEl = placeholderEls[j];
    var pValue = getPath(SITE_CONTENT, pEl.getAttribute("data-placeholder-key"));
    if (typeof pValue === "string") pEl.setAttribute("placeholder", pValue);
  }

  // -- afbeeldingsbronnen: <img data-src-key="pad.naar.bestandsnaam"> --
  //    zo staat een bestandsnaam (bv. het badge-icoon rechtsboven op de
  //    aanbiedingskaart) in content.js i.p.v. hardcoded in de HTML, en kan
  //    Ruben 'm daar aanpassen om een eigen SVG te koppelen. --
  var srcEls = document.querySelectorAll("[data-src-key]");
  for (var s = 0; s < srcEls.length; s++) {
    var sEl = srcEls[s];
    var sValue = getPath(SITE_CONTENT, sEl.getAttribute("data-src-key"));
    if (typeof sValue === "string") sEl.setAttribute("src", sValue);
  }

  // -- lijsten: <template data-list="pad.naar.lijst"></template> als
  //    markering; de gegenereerde elementen komen er vlak vóór te
  //    staan, zodat de flex/gap-opmaak van de ouder niet verstoord
  //    wordt door een extra wrapper-element. --
  function renderList(path, buildItem) {
    var templates = document.querySelectorAll('template[data-list="' + path + '"]');
    for (var t = 0; t < templates.length; t++) {
      var tpl = templates[t];
      var items = getPath(SITE_CONTENT, path);
      if (!items || !items.length) continue;
      var frag = document.createDocumentFragment();
      for (var n = 0; n < items.length; n++) {
        var node = buildItem(items[n], n);
        if (node) frag.appendChild(node);
      }
      tpl.parentNode.insertBefore(frag, tpl);
    }
  }

  // hero: statistiekjes (cijfer + label), met een divider ertussen
  renderList("hero.stats", function (stat, idx, arr) {
    var frag = document.createDocumentFragment();
    if (idx > 0) {
      var divider = document.createElement("li");
      divider.className = "stats__divider";
      divider.setAttribute("aria-hidden", "true");
      frag.appendChild(divider);
    }
    var li = document.createElement("li");
    li.className = "stats__item";
    var num = document.createElement("span");
    num.className = "stats__number";
    num.textContent = stat.number;
    var label = document.createElement("span");
    label.className = "stats__label";
    label.textContent = stat.label;
    li.appendChild(num);
    li.appendChild(label);
    frag.appendChild(li);
    return frag;
  });

  // eenvoudige alinea-lijsten (why, for-you)
  function buildParagraph(text) {
    var p = document.createElement("p");
    p.textContent = text;
    return p;
  }
  renderList("why.paragraphs", buildParagraph);
  renderList("forYou.bodyBefore", buildParagraph);

  // "is dit iets voor jou"-bulletlijst (simpele bullets, geen icoon)
  renderList("forYou.bodyAfterList", function (text) {
    var li = document.createElement("li");
    li.textContent = text;
    return li;
  });

  // aanbiedingskaart-lijst met pijltje-icoon ("dit gaan we maken")
  renderList("make.card.listItems", function (text) {
    var li = document.createElement("li");
    var icon = document.createElement("span");
    icon.className = "arrow-list__icon";
    icon.setAttribute("aria-hidden", "true");
    li.appendChild(icon);
    li.appendChild(document.createTextNode(text));
    return li;
  });

  // succesmelding: alinea's die \n als <br> mogen tonen
  renderList("signup.success.paragraphs", function (text) {
    var p = document.createElement("p");
    appendTextWithBreaks(p, text);
    return p;
  });

  // FAQ
  renderList("faq.items", function (item) {
    var details = document.createElement("details");
    details.className = "faq__item";
    var summary = document.createElement("summary");
    summary.appendChild(document.createTextNode(item.q));
    var chevron = document.createElement("span");
    chevron.className = "faq__chevron";
    chevron.setAttribute("aria-hidden", "true");
    summary.appendChild(chevron);
    var answer = document.createElement("p");
    answer.className = "faq__answer";
    answer.textContent = item.a;
    details.appendChild(summary);
    details.appendChild(answer);
    return details;
  });

  // actievoorwaarden: hoofdstukken (elk met optioneel "paragraphs" en/of "list")
  renderList("terms.chapters", function (chapter) {
    var section = document.createElement("section");
    section.className = "terms__section";
    var h3 = document.createElement("h3");
    h3.textContent = chapter.heading;
    section.appendChild(h3);
    if (chapter.paragraphs) {
      for (var i = 0; i < chapter.paragraphs.length; i++) {
        section.appendChild(buildParagraph(chapter.paragraphs[i]));
      }
    }
    if (chapter.list) {
      var ul = document.createElement("ul");
      ul.className = "terms__list";
      for (var j = 0; j < chapter.list.length; j++) {
        var li = document.createElement("li");
        li.textContent = chapter.list[j];
        ul.appendChild(li);
      }
      section.appendChild(ul);
    }
    return section;
  });
})();
