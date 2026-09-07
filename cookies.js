/* ============================================================
   Cookiebalk + Consent Mode v2 voor Google Analytics (GA4)
   ============================================================
   Simpel gehouden op verzoek: 2 knoppen (Accepteren/Weigeren), geen
   uitgebreid instellingenpaneel met losse categorieën -- deze site
   gebruikt alleen analytische cookies (geen advertenties), dus een
   binaire keuze volstaat.

   Hoe het werkt:
   - index.html zet vóór alles "analytics_storage: denied" (zie de
     gtag-snippet in <head>) -- GA4 meet dus standaard NIET totdat de
     bezoeker kiest.
   - Bij "Accepteren" wordt dat via gtag('consent','update', ...) op
     "granted" gezet en onthouden (localStorage) voor volgende bezoeken.
   - Bij "Weigeren" blijft het op "denied" staan, ook onthouden -- de
     balk verschijnt dan niet steeds opnieuw.
   ============================================================ */
(function () {
  "use strict";

  var STORAGE_KEY = "campagne444-cookie-consent"; // waarde: "granted" | "denied"

  var banner = document.getElementById("cookie-banner");
  if (!banner) return;

  var acceptBtn = document.getElementById("cookie-accept");
  var rejectBtn = document.getElementById("cookie-reject");

  function applyConsent(state) {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: state });
    }
  }

  function getStoredConsent() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      // bijv. een privé-venster dat opslag blokkeert -- dan gewoon
      // elke keer opnieuw de balk tonen i.p.v. de pagina te laten breken
      return null;
    }
  }

  function storeConsent(state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, state);
    } catch (e) {
      /* zie hierboven -- negeren als opslag niet lukt */
    }
  }

  function choose(state) {
    applyConsent(state);
    storeConsent(state);
    banner.hidden = true;
  }

  var stored = getStoredConsent();
  if (stored === "granted" || stored === "denied") {
    applyConsent(stored);
  } else {
    banner.hidden = false;
  }

  if (acceptBtn) acceptBtn.addEventListener("click", function () { choose("granted"); });
  if (rejectBtn) rejectBtn.addEventListener("click", function () { choose("denied"); });
})();
