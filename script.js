/* ============================================================
   Aanmeldformulier -> Google Apps Script Web App
   ============================================================ */
(function () {
  "use strict";

  var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz_gM4F2hepzlCJlA51111VI9NPu_MeUeMPkbc_vKpEvcstHPm0IkjTorMGh45db9v7eg/exec";
  var PROBLEEM_MAX = 444;

  var form = document.getElementById("signup-form");
  if (!form) return;

  var fields = {
    naam: form.querySelector("#naam"),
    email: form.querySelector("#email"),
    bedrijf: form.querySelector("#bedrijf"),
    probleem: form.querySelector("#probleem"),
    akkoord: form.querySelector("#akkoord")
  };
  var counter = document.getElementById("probleem-counter");
  var status = document.getElementById("form-status");
  var submitBtn = document.getElementById("signup-submit");
  var submitLabel = submitBtn.textContent;

  var cardInner = document.getElementById("signup-card-inner");
  var successEl = document.getElementById("signup-success");
  var successCloseBtn = document.getElementById("signup-success-close");

  function showSuccess() {
    if (cardInner) cardInner.hidden = true;
    if (successEl) successEl.hidden = false;
  }
  function showForm() {
    if (successEl) successEl.hidden = true;
    if (cardInner) cardInner.hidden = false;
  }
  if (successCloseBtn) {
    successCloseBtn.addEventListener("click", showForm);
  }

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(name, message) {
    var wrap = form.querySelector('[data-field="' + name + '"]');
    var errorEl = document.getElementById(name + "-error");
    if (!wrap || !errorEl) return;
    errorEl.textContent = message || "";
    if (message) {
      wrap.classList.add("field--invalid");
      fields[name].setAttribute("aria-invalid", "true");
    } else {
      wrap.classList.remove("field--invalid");
      fields[name].removeAttribute("aria-invalid");
    }
  }

  function clearErrors() {
    Object.keys(fields).forEach(function (name) { setError(name, ""); });
  }

  // foutmeldingen komen uit content.js (SITE_CONTENT.signup.errors), met een
  // fallback ervoor terug voor het geval content.js onverhoopt niet laadt
  var ERRORS = (typeof SITE_CONTENT !== "undefined" && SITE_CONTENT.signup && SITE_CONTENT.signup.errors) || {
    naamRequired: "Vul je naam in.",
    emailRequired: "Vul je e-mailadres in.",
    emailInvalid: "Vul een geldig e-mailadres in.",
    bedrijfRequired: "Vul je bedrijfsnaam in.",
    probleemMax: "Je antwoord mag maximaal {max} tekens bevatten.",
    akkoordRequired: "Je moet akkoord gaan met de actievoorwaarden om je aan te melden."
  };
  var STATUS_ERROR = (typeof SITE_CONTENT !== "undefined" && SITE_CONTENT.signup && SITE_CONTENT.signup.statusError) ||
    "Er ging iets mis bij het versturen. Probeer het opnieuw, of mail ons rechtstreeks.";

  function validate() {
    clearErrors();
    var firstInvalid = null;
    var ok = true;

    if (!fields.naam.value.trim()) {
      setError("naam", ERRORS.naamRequired);
      ok = false;
      firstInvalid = firstInvalid || fields.naam;
    }

    var email = fields.email.value.trim();
    if (!email) {
      setError("email", ERRORS.emailRequired);
      ok = false;
      firstInvalid = firstInvalid || fields.email;
    } else if (!EMAIL_RE.test(email)) {
      setError("email", ERRORS.emailInvalid);
      ok = false;
      firstInvalid = firstInvalid || fields.email;
    }

    if (!fields.bedrijf.value.trim()) {
      setError("bedrijf", ERRORS.bedrijfRequired);
      ok = false;
      firstInvalid = firstInvalid || fields.bedrijf;
    }

    if (fields.probleem.value.length > PROBLEEM_MAX) {
      setError("probleem", ERRORS.probleemMax.replace("{max}", PROBLEEM_MAX));
      ok = false;
      firstInvalid = firstInvalid || fields.probleem;
    }

    if (!fields.akkoord.checked) {
      setError("akkoord", ERRORS.akkoordRequired);
      ok = false;
      firstInvalid = firstInvalid || fields.akkoord;
    }

    if (firstInvalid) firstInvalid.focus();
    return ok;
  }

  function updateCounter() {
    if (!counter) return;
    var len = fields.probleem.value.length;
    counter.textContent = len + "/" + PROBLEEM_MAX;
    counter.classList.toggle("field__counter--max", len >= PROBLEEM_MAX);
  }
  if (fields.probleem) {
    fields.probleem.addEventListener("input", updateCounter);
    updateCounter();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validate()) {
      status.textContent = "";
      status.className = "signup__form-status";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Bezig met versturen...";
    status.textContent = "";
    status.className = "signup__form-status";

    var body = new URLSearchParams();
    body.append("naam", fields.naam.value.trim());
    body.append("email", fields.email.value.trim());
    body.append("bedrijf", fields.bedrijf.value.trim());
    body.append("probleem", fields.probleem.value.trim());
    body.append("akkoord", "ja");

    // mode: "no-cors" -- Apps Script webapp-URL's redirecten intern naar een
    // googleusercontent.com-content-URL, en die response stuurt geen
    // Access-Control-Allow-Origin-header mee. Daardoor blokkeert de browser een
    // gewone (cors-)fetch vanaf een ander domein (solike.nl), ook al staat de
    // deploy-toegang gewoon op "Iedereen" (zie project-doc: eerst een 401 door
    // een domain-restricted deploy, nu -- na het fixen daarvan -- deze CORS-fout
    // door Google's eigen redirect-gedrag). "no-cors" omzeilt dat, maar geeft een
    // ondoorzichtige (opaque) response terug: we kunnen de inhoud niet uitlezen,
    // dus geen echte succes/foutbevestiging vanuit Apps Script zelf. Als de fetch
    // niet gooit is het verzoek in elk geval verstuurd -- de Google Sheet is de
    // bron van waarheid voor of het ook echt is aangekomen.
    fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", body: body })
      .then(function () {
        form.reset();
        updateCounter();
        status.textContent = "";
        status.className = "signup__form-status";
        showSuccess();
      })
      .catch(function () {
        status.textContent = STATUS_ERROR;
        status.className = "signup__form-status signup__form-status--error";
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
      });
  });
})();

/* ============================================================
   Actievoorwaarden -> overlay (bottomsheet <720px, schermvullend vanaf 720px)
   ============================================================ */
(function () {
  "use strict";

  var overlay = document.getElementById("terms-overlay");
  var link = document.getElementById("terms-link");
  if (!overlay || !link) return;

  var closeTriggers = overlay.querySelectorAll("[data-terms-close]");
  var lastFocused = null;

  function onKeydown(e) {
    if (e.key === "Escape" || e.key === "Esc") closeTerms();
  }

  function openTerms(e) {
    if (e) e.preventDefault();
    lastFocused = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeydown);
    var closeBtn = overlay.querySelector(".terms__close--desktop, .terms__close--sheet");
    if (closeBtn) closeBtn.focus();
  }

  function closeTerms() {
    overlay.hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKeydown);
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  link.addEventListener("click", openTerms);
  for (var i = 0; i < closeTriggers.length; i++) {
    closeTriggers[i].addEventListener("click", closeTerms);
  }
})();

/* ============================================================
   Aanbiedingskaart ("Dit mag je echt niet missen") -- "Lees meer"/
   "Lees minder"-toggle voor de kaartbeschrijving. Tekst komt uit
   content.js (SITE_CONTENT.make.card), zelfde patroon als de
   foutmeldingen hierboven bij het aanmeldformulier.
   ============================================================ */
(function () {
  "use strict";

  var desc = document.getElementById("make-card-desc");
  var toggle = document.getElementById("make-card-desc-toggle");
  if (!desc || !toggle) return;

  var CARD = (typeof SITE_CONTENT !== "undefined" && SITE_CONTENT.make && SITE_CONTENT.make.card) || {};
  var shortText = CARD.descShort || desc.textContent;
  var fullText = CARD.descFull || shortText;
  var moreLabel = CARD.readMore || "Lees meer";
  var lessLabel = CARD.readLess || "Lees minder";
  var expanded = false;

  toggle.addEventListener("click", function () {
    expanded = !expanded;
    desc.textContent = expanded ? fullText : shortText;
    toggle.textContent = expanded ? lessLabel : moreLabel;
    toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
  });
})();
