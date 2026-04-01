# Leistungsübersicht Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Baue `leistungen.html` (Leistungsübersicht mit wählbaren Optionen und Preisen) und aktualisiere `anfrage.html` mit URL-Parameter-Prefilling.

**Architecture:** Reines HTML + Tailwind CSS (CDN). `leistungen.html` zeigt alle 8 Services in zwei Sektionen. Vanilla JS ermöglicht Optionswahl pro Karte und kodiert die Auswahl als URL-Parameter. `anfrage.html` liest diese Parameter und befüllt das Formular vor.

**Tech Stack:** HTML5, Tailwind CSS (CDN), Google Fonts (Playfair Display + Montserrat), Material Symbols, Vanilla JS

---

## Dateistruktur

```
leistungen.html     ← ERSTELLEN
anfrage.html        ← AKTUALISIEREN (URL-Parameter Prefilling)
index.html          ← unverändert (Referenz für Nav/Footer)
```

## Design-Token Referenz

```
Champagne:    #EEE9E4
Near-White:   #FAFAF8
Dark Text:    #242424
Accent Rose:  #D4A49C
Footer Black: #000000
Radius:       0px
CTA:          "Text ——" hover translateX(8px)
```

## Preisdaten

| Kategorie   | Hairstyling | Makeup | H+M   |
|-------------|-------------|--------|-------|
| Braut       | 220 €       | 220 €  | 400 € |
| Henna       | 220 €       | 220 €  | 400 € |
| Standesamt  | 200 €       | 200 €  | 380 € |
| Verlobung   | 200 €       | 200 €  | 380 € |
| Gäste       | 120 €       | 120 €  | 240 € |

---

## Task 1: leistungen.html — Head + Nav + Hero

**Files:**
- Create: `leistungen.html`

- [ ] **Step 1: Datei erstellen mit Head, Nav und Hero**

Erstelle `/Users/yassin/Desktop/Dev/Web/Reta Yamaci/stitch_reta_1/leistungen.html`:

```html
<!DOCTYPE html>
<html class="light" lang="de">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>Leistungen — Reta Yamaci</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  <script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "champagne":    "#EEE9E4",
            "near-white":   "#FAFAF8",
            "accent-rose":  "#D4A49C",
            "dark-text":    "#242424",
            "footer-black": "#000000",
          },
          fontFamily: {
            "headline": ["Playfair Display", "serif"],
            "body":     ["Montserrat", "sans-serif"],
            "label":    ["Montserrat", "sans-serif"],
          },
          borderRadius: {
            "DEFAULT": "0px", "lg": "0px", "xl": "0px", "full": "9999px",
          },
        },
      },
    }
  </script>
  <style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
    }
    .hero-title  { font-size: 96px; line-height: 1.05; }
    .section-h2  { font-size: 48px; }
    .body-text   { font-size: 17px; line-height: 1.65; }
    .cta-dash    { display: inline-block; transition: transform 0.3s ease; }
    .cta-link:hover .cta-dash { transform: translateX(8px); }
    @media (max-width: 768px) {
      .hero-title { font-size: 48px; }
      .section-h2 { font-size: 32px; }
    }

    /* Optionszeile in Anlass-Karte */
    .option-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 16px;
      cursor: pointer;
      transition: background-color 0.2s;
      position: relative;
    }
    .option-row:hover { background-color: rgba(212,164,156,0.08); }
    .option-row.selected { background-color: rgba(212,164,156,0.12); }
    .option-row.selected::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 2px;
      background-color: #D4A49C;
    }
    .option-row .option-label { font-family: 'Montserrat', sans-serif; font-size: 13px; letter-spacing: 0.05em; opacity: 0.7; }
    .option-row.selected .option-label { opacity: 1; }
    .option-row .option-price { font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 500; opacity: 0.7; }
    .option-row.selected .option-price { opacity: 1; color: #D4A49C; }
  </style>
</head>
<body class="bg-near-white text-dark-text font-body">

<!-- NAV -->
<header class="fixed top-0 w-full z-50 bg-[#EEE9E4]/40 backdrop-blur-sm transition-colors duration-500 hover:bg-[#EEE9E4]/90">
  <nav aria-label="Haupt-Navigation" class="flex justify-between items-center px-8 md:px-12 py-6 max-w-[1920px] mx-auto">
    <a href="index.html" class="font-headline text-2xl italic text-dark-text tracking-tight">Reta Yamaci</a>
    <div class="hidden md:flex items-center gap-10 font-label text-xs tracking-[0.2em] uppercase text-dark-text">
      <a href="leistungen.html" class="text-accent-rose">Leistungen</a>
      <a href="portfolio.html"  class="hover:text-accent-rose transition-colors duration-300">Portfolio</a>
      <a href="ueber-mich.html" class="hover:text-accent-rose transition-colors duration-300">Über Mich</a>
      <a href="masterclass.html" class="hover:text-accent-rose transition-colors duration-300">Masterclass</a>
    </div>
    <a href="anfrage.html" class="cta-link hidden md:flex items-center gap-1 font-label text-xs tracking-[0.2em] uppercase text-dark-text hover:text-accent-rose transition-colors duration-300">
      Termin Buchen <span class="cta-dash ml-1">——</span>
    </a>
    <button id="menu-toggle" type="button" class="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menü öffnen" aria-expanded="false">
      <span class="block w-6 h-px bg-dark-text transition-all duration-300"></span>
      <span class="block w-6 h-px bg-dark-text transition-all duration-300"></span>
      <span class="block w-4 h-px bg-dark-text transition-all duration-300"></span>
    </button>
  </nav>
  <div id="mobile-menu" class="hidden md:hidden bg-[#EEE9E4]/95 backdrop-blur-sm px-8 pb-8 flex-col gap-6 font-label text-xs tracking-[0.2em] uppercase text-dark-text">
    <a href="leistungen.html"  class="text-accent-rose">Leistungen</a>
    <a href="portfolio.html"   class="hover:text-accent-rose transition-colors">Portfolio</a>
    <a href="ueber-mich.html"  class="hover:text-accent-rose transition-colors">Über Mich</a>
    <a href="masterclass.html" class="hover:text-accent-rose transition-colors">Masterclass</a>
    <a href="anfrage.html"     class="hover:text-accent-rose transition-colors">Termin Buchen ——</a>
  </div>
</header>

<main>

<!-- HERO HEADER -->
<section class="pt-40 pb-24 px-6 md:px-12 bg-near-white">
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div class="max-w-2xl">
        <span class="font-label text-xs tracking-[0.3em] uppercase opacity-60 mb-4 block">Professional Artistry</span>
        <h1 class="font-headline hero-title text-dark-text mb-8">Meine Leistungen</h1>
        <p class="body-text text-dark-text/70 max-w-md">
          Eine kuratierte Auswahl hochwertiger Beauty-Services, gestaltet für Ihren besonderen Moment.
        </p>
      </div>
      <div class="hidden md:block pb-2">
        <div class="w-px h-32 bg-accent-rose/30 mx-auto"></div>
      </div>
    </div>
  </div>
</section>

  <!-- Sektionen folgen in Task 2 & 3 -->

</main>

<!-- FOOTER -->
<footer class="bg-footer-black w-full">
  <div class="flex flex-col items-center gap-10 py-20 px-8">
    <a href="index.html" class="font-headline text-xl italic text-white">Reta Yamaci</a>
    <nav aria-label="Footer-Navigation" class="flex flex-wrap justify-center gap-8 md:gap-14">
      <a href="#" class="font-label text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors duration-300">Impressum</a>
      <a href="#" class="font-label text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors duration-300">Datenschutz</a>
      <a href="anfrage.html" class="font-label text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors duration-300">Kontakt</a>
      <a href="#0" class="font-label text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors duration-300">Instagram</a>
      <a href="#0" class="font-label text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors duration-300">Pinterest</a>
    </nav>
    <p class="font-label text-xs tracking-[0.2em] uppercase text-stone-600">© 2026 Reta Yamaci. Alle Rechte vorbehalten.</p>
  </div>
</footer>

<script>
  // Mobile Nav Toggle
  (function() {
    const toggle = document.getElementById('menu-toggle');
    const menu   = document.getElementById('mobile-menu');
    const bars   = toggle.querySelectorAll('span');
    toggle.addEventListener('click', function() {
      const open = menu.classList.toggle('hidden') === false;
      menu.classList.toggle('flex', !menu.classList.contains('hidden'));
      toggle.setAttribute('aria-expanded', String(!menu.classList.contains('hidden')));
      bars[0].style.transform = open ? 'translateY(6px) rotate(45deg)' : '';
      bars[1].style.opacity   = open ? '0' : '1';
      bars[2].style.transform = open ? 'translateY(-6px) rotate(-45deg)' : '';
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.add('hidden');
      menu.classList.remove('flex');
      toggle.setAttribute('aria-expanded', 'false');
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }));
  })();
</script>

</body>
</html>
```

- [ ] **Step 2: Im Browser prüfen**

Öffne http://localhost:3000/leistungen.html — du siehst Nav (Leistungen in accent-rose aktiv), Hero mit "Meine Leistungen" 96px, Footer schwarz. Seite hat noch keinen mittleren Content.

---

## Task 2: leistungen.html — Sektion "Besondere Anlässe"

**Files:**
- Modify: `leistungen.html` — `<!-- Sektionen folgen in Task 2 & 3 -->` ersetzen

- [ ] **Step 1: Sektion HTML einfügen**

Ersetze `<!-- Sektionen folgen in Task 2 & 3 -->` durch:

```html
<!-- BESONDERE ANLÄSSE -->
<section class="py-24 px-6 md:px-12 bg-champagne">
  <div class="max-w-7xl mx-auto">

    <div class="mb-16">
      <span class="font-label text-xs tracking-[0.3em] uppercase text-accent-rose block mb-4">Besondere Anlässe</span>
      <h2 class="font-headline section-h2 text-dark-text">Für Ihren besonderen Tag</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

      <!-- Karte: Braut -->
      <div class="anlass-card bg-near-white p-10 flex flex-col" data-service="Braut">
        <span class="font-label text-xs tracking-[0.3em] uppercase text-dark-text/40 mb-3 block">01</span>
        <h3 class="font-headline text-4xl text-dark-text mb-6">Braut</h3>
        <div class="h-px bg-champagne mb-4"></div>
        <div class="options-list flex flex-col mb-8 flex-1">
          <div class="option-row" data-option="Hairstyling" data-price="220">
            <span class="option-label">Hairstyling</span>
            <span class="option-price">220 €</span>
          </div>
          <div class="option-row" data-option="Makeup" data-price="220">
            <span class="option-label">Makeup</span>
            <span class="option-price">220 €</span>
          </div>
          <div class="option-row" data-option="Hairstyling + Makeup" data-price="400">
            <span class="option-label">Hairstyling + Makeup</span>
            <span class="option-price">400 €</span>
          </div>
        </div>
        <a href="anfrage.html?service=Braut" class="cta-link card-cta inline-flex items-center font-label text-xs uppercase tracking-widest text-dark-text hover:text-accent-rose transition-colors">
          Jetzt anfragen <span class="cta-dash ml-2">——</span>
        </a>
      </div>

      <!-- Karte: Henna -->
      <div class="anlass-card bg-near-white p-10 flex flex-col" data-service="Henna">
        <span class="font-label text-xs tracking-[0.3em] uppercase text-dark-text/40 mb-3 block">02</span>
        <h3 class="font-headline text-4xl text-dark-text mb-6">Henna</h3>
        <div class="h-px bg-champagne mb-4"></div>
        <div class="options-list flex flex-col mb-8 flex-1">
          <div class="option-row" data-option="Hairstyling" data-price="220">
            <span class="option-label">Hairstyling</span>
            <span class="option-price">220 €</span>
          </div>
          <div class="option-row" data-option="Makeup" data-price="220">
            <span class="option-label">Makeup</span>
            <span class="option-price">220 €</span>
          </div>
          <div class="option-row" data-option="Hairstyling + Makeup" data-price="400">
            <span class="option-label">Hairstyling + Makeup</span>
            <span class="option-price">400 €</span>
          </div>
        </div>
        <a href="anfrage.html?service=Henna" class="cta-link card-cta inline-flex items-center font-label text-xs uppercase tracking-widest text-dark-text hover:text-accent-rose transition-colors">
          Jetzt anfragen <span class="cta-dash ml-2">——</span>
        </a>
      </div>

      <!-- Karte: Standesamt -->
      <div class="anlass-card bg-near-white p-10 flex flex-col" data-service="Standesamt">
        <span class="font-label text-xs tracking-[0.3em] uppercase text-dark-text/40 mb-3 block">03</span>
        <h3 class="font-headline text-4xl text-dark-text mb-6">Standesamt</h3>
        <div class="h-px bg-champagne mb-4"></div>
        <div class="options-list flex flex-col mb-8 flex-1">
          <div class="option-row" data-option="Hairstyling" data-price="200">
            <span class="option-label">Hairstyling</span>
            <span class="option-price">200 €</span>
          </div>
          <div class="option-row" data-option="Makeup" data-price="200">
            <span class="option-label">Makeup</span>
            <span class="option-price">200 €</span>
          </div>
          <div class="option-row" data-option="Hairstyling + Makeup" data-price="380">
            <span class="option-label">Hairstyling + Makeup</span>
            <span class="option-price">380 €</span>
          </div>
        </div>
        <a href="anfrage.html?service=Standesamt" class="cta-link card-cta inline-flex items-center font-label text-xs uppercase tracking-widest text-dark-text hover:text-accent-rose transition-colors">
          Jetzt anfragen <span class="cta-dash ml-2">——</span>
        </a>
      </div>

      <!-- Karte: Verlobung -->
      <div class="anlass-card bg-near-white p-10 flex flex-col" data-service="Verlobung">
        <span class="font-label text-xs tracking-[0.3em] uppercase text-dark-text/40 mb-3 block">04</span>
        <h3 class="font-headline text-4xl text-dark-text mb-6">Verlobung</h3>
        <div class="h-px bg-champagne mb-4"></div>
        <div class="options-list flex flex-col mb-8 flex-1">
          <div class="option-row" data-option="Hairstyling" data-price="200">
            <span class="option-label">Hairstyling</span>
            <span class="option-price">200 €</span>
          </div>
          <div class="option-row" data-option="Makeup" data-price="200">
            <span class="option-label">Makeup</span>
            <span class="option-price">200 €</span>
          </div>
          <div class="option-row" data-option="Hairstyling + Makeup" data-price="380">
            <span class="option-label">Hairstyling + Makeup</span>
            <span class="option-price">380 €</span>
          </div>
        </div>
        <a href="anfrage.html?service=Verlobung" class="cta-link card-cta inline-flex items-center font-label text-xs uppercase tracking-widest text-dark-text hover:text-accent-rose transition-colors">
          Jetzt anfragen <span class="cta-dash ml-2">——</span>
        </a>
      </div>

      <!-- Karte: Gäste -->
      <div class="anlass-card bg-near-white p-10 flex flex-col" data-service="Gäste">
        <span class="font-label text-xs tracking-[0.3em] uppercase text-dark-text/40 mb-3 block">05</span>
        <h3 class="font-headline text-4xl text-dark-text mb-6">Gäste</h3>
        <div class="h-px bg-champagne mb-4"></div>
        <div class="options-list flex flex-col mb-8 flex-1">
          <div class="option-row" data-option="Hairstyling" data-price="120">
            <span class="option-label">Hairstyling</span>
            <span class="option-price">120 €</span>
          </div>
          <div class="option-row" data-option="Makeup" data-price="120">
            <span class="option-label">Makeup</span>
            <span class="option-price">120 €</span>
          </div>
          <div class="option-row" data-option="Hairstyling + Makeup" data-price="240">
            <span class="option-label">Hairstyling + Makeup</span>
            <span class="option-price">240 €</span>
          </div>
        </div>
        <a href="anfrage.html?service=Gäste" class="cta-link card-cta inline-flex items-center font-label text-xs uppercase tracking-widest text-dark-text hover:text-accent-rose transition-colors">
          Jetzt anfragen <span class="cta-dash ml-2">——</span>
        </a>
      </div>

    </div>
  </div>
</section>

<!-- Weitere Leistungen folgen in Task 3 -->
```

- [ ] **Step 2: Optionen-JS hinzufügen**

Füge direkt vor dem schließenden `</script>`-Tag (vor `})();`) folgenden Code ein — NACH dem Mobile-Nav-Block:

```javascript
  // Optionswahl in Anlass-Karten
  document.querySelectorAll('.anlass-card').forEach(function(card) {
    const cta     = card.querySelector('.card-cta');
    const service = card.dataset.service;
    card.querySelectorAll('.option-row').forEach(function(row) {
      row.addEventListener('click', function() {
        card.querySelectorAll('.option-row').forEach(r => r.classList.remove('selected'));
        row.classList.add('selected');
        const option = row.dataset.option;
        cta.href = 'anfrage.html?service=' + encodeURIComponent(service) + '&option=' + encodeURIComponent(option);
      });
    });
  });
```

- [ ] **Step 3: Im Browser prüfen**

Öffne http://localhost:3000/leistungen.html — du siehst 5 Karten auf Champagne-Hintergrund. Klick auf "Hairstyling" in einer Karte: Zeile bekommt accent-rose linken Balken, Preis wird accent-rose. Browser-Adressleiste des CTA-Links zeigt `?service=Braut&option=Hairstyling`.

---

## Task 3: leistungen.html — Sektion "Weitere Leistungen"

**Files:**
- Modify: `leistungen.html` — `<!-- Weitere Leistungen folgen in Task 3 -->` ersetzen

- [ ] **Step 1: Sektion HTML einfügen**

Ersetze `<!-- Weitere Leistungen folgen in Task 3 -->` durch:

```html
<!-- WEITERE LEISTUNGEN -->
<section class="py-24 px-6 md:px-12 bg-near-white">
  <div class="max-w-7xl mx-auto">

    <div class="mb-16">
      <span class="font-label text-xs tracking-[0.3em] uppercase text-accent-rose block mb-4">Weitere Leistungen</span>
      <h2 class="font-headline section-h2 text-dark-text">Workshops & Shooting</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3">

      <!-- Shooting Makeup -->
      <div class="bg-champagne p-10 flex flex-col">
        <span class="font-label text-xs tracking-[0.3em] uppercase text-dark-text/40 mb-3 block">06</span>
        <h3 class="font-headline text-4xl text-dark-text mb-6">Shooting Makeup</h3>
        <p class="body-text text-dark-text/70 mb-8 flex-1">
          Professionelles Make-up für Foto- und Video-Produktionen.
        </p>
        <p class="font-headline text-2xl italic text-accent-rose mb-8">100 € / Stunde</p>
        <a href="anfrage.html?service=Shooting+Makeup" class="cta-link inline-flex items-center font-label text-xs uppercase tracking-widest text-dark-text hover:text-accent-rose transition-colors">
          Jetzt anfragen <span class="cta-dash ml-2">——</span>
        </a>
      </div>

      <!-- 1:1 Workshop -->
      <div class="bg-champagne p-10 flex flex-col">
        <span class="font-label text-xs tracking-[0.3em] uppercase text-dark-text/40 mb-3 block">07</span>
        <h3 class="font-headline text-4xl text-dark-text mb-6">1:1 Workshop<br/>Hairstyling</h3>
        <ul class="space-y-2 mb-6 flex-1">
          <li class="font-label text-xs tracking-[0.1em] uppercase text-dark-text/70">2 Tage · 5 Stunden pro Tag</li>
          <li class="font-label text-xs tracking-[0.1em] uppercase text-dark-text/70">In Person</li>
          <li class="font-label text-xs tracking-[0.1em] uppercase text-dark-text/70">Goodie Bag & Verpflegung inbegriffen</li>
          <li class="font-label text-xs tracking-[0.1em] uppercase text-dark-text/70">Wasserwelle · Messy Bun · Hochsteck</li>
          <li class="font-label text-xs tracking-[0.1em] uppercase text-dark-text/70">Materialien · Geräte · Technik</li>
        </ul>
        <p class="font-body text-sm italic text-dark-text/50 mb-6 leading-relaxed">
          Empfehlung: Nutze beide Tage in Person. Du nimmst dir Zeit und lernst, welche Materialien, Geräte und Techniken wann und wie eingesetzt werden.
        </p>
        <p class="font-headline text-2xl italic text-accent-rose mb-8">950 €</p>
        <a href="anfrage.html?service=1%3A1+Workshop" class="cta-link inline-flex items-center font-label text-xs uppercase tracking-widest text-dark-text hover:text-accent-rose transition-colors">
          Jetzt anfragen <span class="cta-dash ml-2">——</span>
        </a>
      </div>

      <!-- Online Masterclass -->
      <div class="bg-champagne p-10 flex flex-col">
        <span class="font-label text-xs tracking-[0.3em] uppercase text-dark-text/40 mb-3 block">08</span>
        <h3 class="font-headline text-4xl text-dark-text mb-6">Online<br/>Masterclass</h3>
        <ul class="space-y-2 mb-8 flex-1">
          <li class="font-label text-xs tracking-[0.1em] uppercase text-dark-text/70">3 Frisuren im Trend</li>
          <li class="font-label text-xs tracking-[0.1em] uppercase text-dark-text/70">Tips & Tricks · Technik</li>
          <li class="font-label text-xs tracking-[0.1em] uppercase text-dark-text/70">1 Jahr Zugriff</li>
        </ul>
        <p class="font-headline text-2xl italic text-accent-rose mb-8">499 €</p>
        <a href="masterclass.html" class="cta-link inline-flex items-center font-label text-xs uppercase tracking-widest text-dark-text hover:text-accent-rose transition-colors">
          Zur Masterclass <span class="cta-dash ml-2">——</span>
        </a>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Im Browser prüfen**

Scrolle zur "Weitere Leistungen" Sektion — du siehst 3 Karten auf Near-White Hintergrund, Karten in Champagne. Shooting hat "100 € / Stunde" in Playfair italic accent-rose. Workshop hat Detailliste + Empfehlungstext italic. Masterclass hat "Zur Masterclass ——" Link.

---

## Task 4: anfrage.html — URL-Parameter Prefilling

**Files:**
- Modify: `anfrage.html`

- [ ] **Step 1: JS-Prefill-Code hinzufügen**

In `anfrage.html`, füge am Ende des `<script>`-Blocks (vor dem letzten `</script>`) folgenden Code ein:

```javascript
// URL-Parameter: Service und Option prefill
(function() {
  const params  = new URLSearchParams(window.location.search);
  const service = params.get('service');
  const option  = params.get('option');

  if (service) {
    const leistungSelect = document.querySelector('[name="leistung"]');
    if (leistungSelect) {
      // Versuche exakten Match, sonst partial match
      const options = Array.from(leistungSelect.options);
      const match = options.find(o => o.value === service || o.text === service);
      if (match) {
        leistungSelect.value = match.value;
      } else {
        // Füge dynamisch eine Option hinzu falls Service nicht in Liste
        const newOpt = new Option(service, service, true, true);
        leistungSelect.add(newOpt);
      }
    }
  }

  if (option) {
    // Zeige gewählte Option in der Nachricht vor
    const nachricht = document.querySelector('[name="nachricht"]');
    if (nachricht && !nachricht.value) {
      nachricht.value = 'Gewünschte Option: ' + option;
    }
  }

  // Seiten-Header dynamisch anpassen
  if (service) {
    const label = document.querySelector('span.text-accent-rose');
    if (label && label.textContent === 'Terminanfrage') {
      label.textContent = service;
    }
  }
})();
```

- [ ] **Step 2: Im Browser prüfen**

Öffne http://localhost:3000/anfrage.html?service=Braut&option=Hairstyling+%2B+Makeup
- Der Dropdown "Gewünschte Leistung" ist auf "Braut" vorausgewählt
- Das Textfeld "Ihre Nachricht" enthält "Gewünschte Option: Hairstyling + Makeup"
- Das Label oben zeigt "Braut" statt "Terminanfrage"

---

## Task 5: Qualitätsprüfung & Abschluss

- [ ] **Step 1: Vollständige Prüfung leistungen.html**

| Was | Soll-Zustand |
|---|---|
| Nav "Leistungen" | accent-rose (aktiv) |
| Hero H1 | "Meine Leistungen" 96px Playfair |
| 5 Anlass-Karten | Braut/Henna/Standesamt/Verlobung/Gäste |
| Preise korrekt | Braut: 220/220/400, Standesamt: 200/200/380, Gäste: 120/120/240 |
| Optionswahl | Klick → accent-rose Balken links, Preis accent-rose |
| CTA nach Wahl | href enthält `?service=X&option=Y` |
| 3 Weitere Karten | Shooting/Workshop/Masterclass mit Preisen |
| Masterclass CTA | → masterclass.html (nicht anfrage.html) |
| Footer | schwarz, © 2026 |
| Mobile | Hamburger funktioniert |

- [ ] **Step 2: Cross-Link Prüfung**

- Klick auf "Jetzt anfragen ——" bei Braut (Hairstyling gewählt) → `anfrage.html?service=Braut&option=Hairstyling`
- Formular: Dropdown zeigt "Braut", Nachricht zeigt "Gewünschte Option: Hairstyling"
