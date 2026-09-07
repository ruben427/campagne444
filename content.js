/* ============================================================
   ALLE TEKST VAN DE PAGINA -- pas hier aan, niet in index.html.
   ============================================================
   Dit bestand bevat de Nederlandse tekst van de site, op één plek --
   je hoeft dus nooit door de 4 breakpoints heen dezelfde tekst op
   meerdere plekken te wijzigen: er is maar één versie van elke tekst,
   en die wordt door render.js in de pagina gezet zodra die laadt.

   UITZONDERING: de <title>, de meta-omschrijving en de Open
   Graph/Twitter-preview-tags bovenin index.html staan met opzet NIET
   hier, maar rechtstreeks in de HTML. Linkpreview-bots (WhatsApp,
   LinkedIn, Facebook, Slack, ...) voeren geen JavaScript uit, dus als
   die tekst hier zou staan, zou zo'n bot 'm nooit te zien krijgen --
   dat is precies de reden dat we de og:image eerder moesten
   debuggen. Wijzig die 3 tags dus rechtstreeks bovenin index.html.

   Hoe dit bestand te lezen:
   - Losse tekst: gewoon de waarde tussen aanhalingstekens aanpassen.
   - "paragraphs" / "items" / "chapters" e.d.: een lijst. Je mag een
     regel toevoegen, verwijderen of de volgorde omgooien -- render.js
     bouwt de pagina op basis van hoeveel er in de lijst staan.
   - Gebruik altijd rechte aanhalingstekens ' of " om tekst te
     omsluiten. Wil je zelf een aanhalingsteken IN de tekst gebruiken,
     zet er dan een backslash voor, bijvoorbeeld: "de \"beste\" tip".
   - Vergeet geen komma tussen twee regels in een lijst.
   ============================================================ */

var SITE_CONTENT = {

  hero: {
    title: "Yes Girl!",
    kicker: "Tijd voor zichtbaarheid",
    stats: [
      { number: "4", label: "plekken" },
      { number: "44", label: "assets" },
      { number: "444", label: "euro" }
    ],
    lead: "Je bedrijf is gegroeid. Nu mag jouw zichtbaarheid meegroeien.",
    cta: "Yes, ik doe mee"
  },

  why: {
    heading: "Waarom 444",
    paragraphs: [
      "Op 15 september word ik 44.",
      
      "Het getal 444 draag ik al jaren bij me als tattoo. Voor mij staat het voor vertrouwen, richting en durven gaan.",

      "Niet wachten tot alles perfect is, maar zichtbaar maken wat er al staat.",

      "Daarom open ik vier plekken voor deze bijzondere Birthday Edition."
      
    ]
  },

  forYou: {
    heading: "Is dit iets voor jou?",
    bodyBefore: [
      "Je bedrijf staat.",
      "Je weet wat je te bieden hebt.",
      "Maar je beelden laten nog niet volledig zien wie jij bent en waarom mensen voor jou kiezen."
    ],
    quoteLineLeft: "Je wilt geen losse foto's.",
    quoteLineRight: "Je wilt een beeldvoorraad die past bij jouw verhaal en waarmee je zichtbaar kunt zijn.",

    bodyAfterIntro: "Dit past bij jou als je:",
    bodyAfterList: [
      "een bestaand bedrijf hebt",
      "persoonlijk zichtbaar wilt zijn",
      "klaar bent om samen te creëren"
    ]
  },

  make: {
    heading: ["Dit mag je echt", "niet missen"],
    intro: "We fotograferen en filmen vier uur op een locatie die bij jou en je merk past. Vooraf analyseer ik je bedrijf, website en socials en werk ik een creatieve richting en shootplan uit.",
    outro: "Je ontvangt geen 44 kant-en-klare posts, maar een veelzijdige beeldvoorraad waarmee je langere tijd vooruit kunt.",
    card: {
      // Badge rechtsboven is nu één losse SVG (Ruben kan hier zelf een ander
      // bestand koppelen door de svg te vervangen en/of dit pad aan te passen).
      badgeIcon: "img/badge-korting.svg",
      title: "44x jij zoals je bent",
      descShort: "Met beelden die laten zien wie jij echt bent, wordt ook online voelbaar wie er achter je bed...",
      // Volledige tekst ontbrak nog in het Figma-ontwerp (alleen de ingekorte "basis"-variant
      // stond er) -- op verzoek van Ruben hier lorem ipsum als placeholder, zodat de
      // uitklap-functionaliteit al wel klopt. Vervang door de echte tekst zodra die er is.
      descFull: "Met beelden die laten zien wie jij echt bent, wordt ook online voelbaar wie er achter je bedrijf zit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      readMore: "Lees meer",
      readLess: "Lees minder",
      listItems: [
        "4 uur foto + video",
        "44 bewerkte assets",
        "Foto\u2019s, Reels en Stories",
        "Persoonlijk contentplan",
        "4 voorbeeldweken"
      ],
      priceNote: "€ 1355 Extra Birthday korting",
      priceWas: "€ 1799",
      priceNow: "€ 444",
      priceExcl: "Excl btw",
      cta: "Ik wil kans maken",
      scarcity: "Slechts 4 plaatsen beschikbaar"
    }
  },

  signup: {
    heading: "Ja, ik doe mee!",
    cadeauLine1: [ 
                  "Mijn cadeau aan jullie.",
                  "Beter kan ik het niet vieren.",
                  "Voor deze eenmalige Birthday Edition zijn 4 plekken beschikbaar."
                  ],
    cadeauLine2: "Investering: €444 exclusief btw**",
    form: {
      naamLabel: "Jouw naam",
      naamPlaceholder: "Voornaam, achternaam",
      emailLabel: "E-mailadres",
      emailPlaceholder: "jij@bedrijf.nl",
      bedrijfLabel: "Bedrijfsnaam",
      bedrijfPlaceholder: "Zoals je online te vinden bent.",
      probleemLabel: "Wat houd je tegen om zichtbaarder te zijn?",
      probleemPlaceholder: "Bijvoorbeeld, ik vind het lastig om mij zelf goed en authentiek op beeld te zetten",
      akkoordPrefix: "Ik ga akkoord met de ",
      akkoordLinkText: "voorwaarden",
      akkoordSuffix: " van de 444 Birthday Edition.",
      submit: "Meld mij direct aan"
    },
    errors: {
      naamRequired: "Vul je naam in.",
      emailRequired: "Vul je e-mailadres in.",
      emailInvalid: "Vul een geldig e-mailadres in.",
      bedrijfRequired: "Vul je bedrijfsnaam in.",
      probleemMax: "Je antwoord mag maximaal {max} tekens bevatten.",
      akkoordRequired: "Je moet akkoord gaan met de actievoorwaarden om je aan te melden."
    },
    statusError: "Er ging iets mis bij het versturen. Probeer het opnieuw, of mail mij rechtstreeks op.",
    success: {
      title: "Bedankt!",
      subtitle: "Ik heb je aanmelding ontvangen",
      paragraphs: [
        "Uiterlijk 21 September laat ik weten of jij één van de vier gelukkig bent waar ik iets tofs mee ga maken.",
        "Ik laat sowieso wat van mij horen.\nSuper tof dat je je hebt aangemeld.",
        "Liefs\nAnnemarie"
      ],
      close: "Sluiten"
    }
  },

  faq: {
    heading: "Veelgestelde vragen",
    items: [
      { q: "Krijg ik 44 posts?", a: "Nee. Je ontvangt geen kant-en-klare posts, maar een veelzijdige beeldvoorraad waarmee je zelf content kunt maken." },
      { q: "Moet ik goed voor de camera zijn?", a: "Nee. We maken beelden die passen bij jou. Je hoeft geen model te zijn." },
      { q: "Mag ik zelf een locatie kiezen?", a: "Ja. Samen kiezen we een locatie die past bij jouw merk en verhaal." },
      { q: "Kan ik me aanmelden als ik ver van Ede woon?", a: "Ja. We bespreken samen wat mogelijk is." },
      { q: "Hoe worden de vier ondernemers gekozen?", a: "Ik kijk naar de match tussen jouw bedrijf, jouw verhaal en wat we samen kunnen creëren." }
    ]
  },

  terms: {
    title: "Actievoorwaarden SOLIKE 444",
    intro: "SOLIKE 444 is een eenmalige pilotactie van SOLIKE. Vier vrouwelijke ondernemers krijgen de kans om voor €444 excl. btw samen met SOLIKE hun zichtbaarheid een flinke beeldboost te geven.",
    closeLabel: "Sluiten",
    /* Elk hoofdstuk mag óf "paragraphs" (losse alinea's) óf "list" (opsomming)
       hebben, of allebei -- zoals hoofdstuk 1, dat alleen een lijst heeft. */
    chapters: [
      {
        heading: "1. Aanmelden en selectie",
        list: [
          "Er zijn 4 plekken beschikbaar.",
          "Aanmelden betekent niet automatisch dat je een plek hebt.",
          "Uit de aanmeldingen selecteert SOLIKE vier ondernemers bij wie het traject en de werkwijze goed aansluiten.",
          "Na de selectie ontvang je persoonlijk bericht.",
          "Na bevestiging van jouw deelname ontvang je een factuur.",
          "De opdracht is pas definitief na ontvangst van de volledige betaling."
        ]
      },
      {
        heading: "2. Investering en betaling",
        paragraphs: [
          "De investering voor het 444-traject bedraagt €444 excl. btw.",
          "Na bevestiging van jouw deelname ontvang je een factuur. De betaaltermijn is 14 dagen en de factuur dient altijd volledig te zijn voldaan vóór aanvang van de shoot.",
          "De opdracht is pas definitief na ontvangst van de volledige betaling. De shootdatum wordt definitief gereserveerd zodra de betaling binnen is.",
          "Eventuele reis-, parkeer- en locatiekosten zijn niet inbegrepen. Wanneer aanvullende kosten van toepassing zijn, worden deze vooraf besproken."
        ]
      },
      {
        heading: "3. Wat je ontvangt",
        paragraphs: [
          "Het 444-traject bestaat uit de voorbereiding en creatieve shoot zoals omschreven op de landingspagina.",
          "Tijdens het traject creëren we samen ongeveer 44 bruikbare foto- en video-assets voor jouw zichtbaarheid.",
          "Een asset is een los beeldbestand, bijvoorbeeld een foto of videoclip. De 44 assets zijn dus niet hetzelfde als 44 volledig gemonteerde Reels, posts of andere kant-en-klare contentstukken.",
          "De inhoud van het traject en de uiteindelijke selectie van beelden worden afgestemd op jouw merk en wat we tijdens de voorbereiding bepalen."
        ]
      },
      {
        heading: "4. Planning",
        paragraphs: [
          "Na bevestiging en betaling plannen we samen de voorbereiding en shoot in.",
          "Het traject wordt bij voorkeur binnen 3 maanden na bevestiging uitgevoerd, tenzij we samen schriftelijk iets anders afspreken.",
          "De shootdatum wordt pas definitief gereserveerd zodra de betaling is ontvangen."
        ]
      },
      {
        heading: "5. Verplaatsen of annuleren",
        paragraphs: [
          "Na betaling wordt jouw plek definitief gereserveerd.",
          "Een shoot kan tot 7 dagen voor de geplande shootdatum kosteloos één keer worden verplaatst.",
          "Bij annulering door de klant vindt geen restitutie plaats.",
          "Moet de shoot binnen 7 dagen voor de geplande datum worden verplaatst door ziekte of een andere aantoonbare overmachtssituatie? Dan zoeken we in overleg naar een passende nieuwe datum.",
          "Wanneer SOLIKE het traject zelf onverhoopt niet kan uitvoeren, zoeken we eerst samen naar een nieuwe datum. Wanneer geen passende nieuwe datum kan worden gevonden, wordt het reeds betaalde bedrag terugbetaald."
        ]
      },
      {
        heading: "6. Weer en locatie",
        paragraphs: [
          "Bij een shoot waarbij buitenbeelden onderdeel zijn van het plan, kan slecht weer reden zijn om de planning of invulling aan te passen.",
          "We bepalen samen wat op dat moment de beste oplossing is. Dit kan bijvoorbeeld betekenen dat we andere beelden maken, de planning aanpassen of in overleg een nieuwe datum kiezen."
        ]
      },
      {
        heading: "7. Gebruik van de beelden en marketing",
        paragraphs: [
          "De ondernemer ontvangt de afgesproken beelden voor gebruik binnen haar eigen bedrijf, waaronder haar website, socialmediakanalen en eigen marketinguitingen.",
          "Omdat SOLIKE 444 een pilottraject is, maakt het vastleggen en delen van het traject onderdeel uit van de samenwerking.",
          "SOLIKE mag de tijdens het traject gemaakte beelden en resultaten gebruiken voor het eigen portfolio, de website, socialmediakanalen en marketing- en promotiedoeleinden.",
          "Ook mag SOLIKE het traject als praktijkcase gebruiken om de eigen werkwijze, resultaten en het toekomstige aanbod te laten zien.",
          "Persoonlijke of vertrouwelijke bedrijfsinformatie wordt niet zonder toestemming gedeeld."
        ]
      },
      {
        heading: "8. Pilot, feedback en review",
        paragraphs: [
          "SOLIKE 444 is bewust een pilot.",
          "De vier trajecten worden mede gebruikt om de werkwijze en het toekomstige aanbod van SOLIKE verder te ontwikkelen. Daarom kan SOLIKE na afloop vragen naar jouw ervaring en feedback.",
          "Het geven van feedback wordt gewaardeerd. Een review of testimonial is altijd vrijwillig en hoeft vanzelfsprekend niet positief te zijn."
        ]
      },
      {
        heading: "9. Persoonlijk aanbod",
        paragraphs: [
          "De 444-plek is bedoeld voor de ondernemer die is geselecteerd en kan niet zonder voorafgaand overleg worden overgedragen aan iemand anders."
        ]
      },
      {
        heading: "10. Tot slot",
        paragraphs: [
          "Door jouw plek definitief te bevestigen en de factuur te voldoen, ga je akkoord met deze actievoorwaarden.",
          "De inhoud van de landingspagina, deze actievoorwaarden en eventuele individuele afspraken die we schriftelijk met elkaar maken, vormen samen de afspraken rondom het SOLIKE 444-traject."
        ]
      }
    ]
  },

  cookies: {
    title: "Cookies om van te leren",
    messagePrefix: "Het zijn alleen analytische cookies om te zien hoe je de site gebruikt. ",
    messageEmphasis: "Niet",
    messageSuffix: " voor advertentie- of trackingcookies.",
    reject: "Doe maar niet",
    accept: "Accepteren"
  }

};
