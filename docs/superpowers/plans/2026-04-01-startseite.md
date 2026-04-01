# Startseite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Baue `index.html` (Startseite) und `anfrage.html` (Anfrageformular) für die Website von Reta Yamaci, einer Hair & Makeup Stylistin.

**Architecture:** Reines HTML + Tailwind CSS via CDN. Alle Seiten teilen dieselbe Nav- und Footer-Struktur. Die Startseite baut auf dem bestehenden `startseite_klares_header_bild/code.html` auf und wird bereinigt, erweitert und strikt nach DESIGN.md ausgerichtet.

**Tech Stack:** HTML5, Tailwind CSS (CDN), Google Fonts (Playfair Display + Montserrat), Material Symbols Outlined

---

## Dateistruktur

```
/Users/yassin/Desktop/Dev/Web/Reta Yamaci/stitch_reta_1/
├── index.html                  ← ERSTELLEN (Startseite)
├── anfrage.html                ← ERSTELLEN (Anfrageformular)
├── leistungen.html             ← später (Basis: leistungs_bersicht_3x3_minimal_update/code.html)
├── portfolio.html              ← später
├── ueber-mich.html             ← später
├── masterclass.html            ← später (Basis: masterclass_video_bibliothek/code.html)
└── atelier_champagne/DESIGN.md ← Design-Referenz
```

---

## Design-Token Referenz (aus DESIGN.md)

```
Champagne:    #EEE9E4   (Primärhintergrund)
Near-White:   #FAFAF8   (Sekundärhintergrund)
Dark Text:    #242424   (Primärtext)
Accent Rose:  #D4A49C   (Akzent, sparsam)
Footer Black: #000000   (Footer)
Font H:       Playfair Display (Headlines)
Font B:       Montserrat (Body/Label)
Radius:       0px überall
CTA-Style:    "Text ——" mit hover translateX(8px)
```

---

## Task 1: index.html — Head + Tailwind-Konfiguration

**Files:**
- Create: `index.html`

- [ ] **Step 1: Datei erstellen mit Head-Block**

Erstelle `/Users/yassin/Desktop/Dev/Web/Reta Yamaci/stitch_reta_1/index.html` mit folgendem Inhalt:

```html
<!DOCTYPE html>
<html class="light" lang="de">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>Reta Yamaci — Hair & Makeup Stylistin</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  <script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "champagne":   "#EEE9E4",
            "near-white":  "#FAFAF8",
            "accent-rose": "#D4A49C",
            "dark-text":   "#242424",
          },
          fontFamily: {
            "headline": ["Playfair Display", "serif"],
            "body":     ["Montserrat", "sans-serif"],
            "label":    ["Montserrat", "sans-serif"],
          },
          borderRadius: {
            "DEFAULT": "0px",
            "lg":      "0px",
            "xl":      "0px",
            "full":    "9999px",
          },
        },
      },
    }
  </script>
  <style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
    }
    .hero-title    { font-size: 96px; line-height: 1.05; }
    .hero-subtitle { font-size: 42px; line-height: 1.2;  }
    .section-h2    { font-size: 48px; }
    .section-h3    { font-size: 32px; font-weight: 600; }
    .body-text     { font-size: 17px; line-height: 1.65; }
    .cta-dash      { display: inline-block; transition: transform 0.3s ease; }
    .cta-link:hover .cta-dash { transform: translateX(8px); }
    @media (max-width: 768px) {
      .hero-title    { font-size: 48px; }
      .hero-subtitle { font-size: 24px; }
      .section-h2    { font-size: 32px; }
    }
  </style>
</head>
<body class="bg-near-white text-dark-text font-body">
  <!-- Inhalt folgt in den nächsten Tasks -->
</body>
</html>
```

- [ ] **Step 2: Im Browser prüfen**

Öffne http://localhost:3000/index.html — du siehst eine leere champagnefarbene Seite ohne Fehler in der Konsole.

- [ ] **Step 3: Commit**

```bash
cd "/Users/yassin/Desktop/Dev/Web/Reta Yamaci/stitch_reta_1"
git init && git add index.html
git commit -m "feat: add index.html head + tailwind config"
```

---

## Task 2: index.html — Navigation

**Files:**
- Modify: `index.html` — ersetze `<!-- Inhalt folgt -->` Kommentar durch Nav + den Kommentar

- [ ] **Step 1: Nav-HTML einfügen**

Ersetze `<!-- Inhalt folgt in den nächsten Tasks -->` in `index.html` durch:

```html
<!-- NAV -->
<header class="fixed top-0 w-full z-50 bg-[#EEE9E4]/40 backdrop-blur-sm transition-colors duration-500 hover:bg-[#EEE9E4]/90">
  <nav class="flex justify-between items-center px-8 md:px-12 py-6 max-w-[1920px] mx-auto">
    <!-- Logo -->
    <a href="index.html" class="font-headline text-2xl italic text-dark-text tracking-tight">Reta Yamaci</a>

    <!-- Desktop Links -->
    <div class="hidden md:flex items-center gap-10 font-label text-xs tracking-[0.2em] uppercase text-dark-text">
      <a href="leistungen.html" class="hover:text-accent-rose transition-colors duration-300">Leistungen</a>
      <a href="portfolio.html"  class="hover:text-accent-rose transition-colors duration-300">Portfolio</a>
      <a href="ueber-mich.html" class="hover:text-accent-rose transition-colors duration-300">Über Mich</a>
      <a href="masterclass.html" class="hover:text-accent-rose transition-colors duration-300">Masterclass</a>
    </div>

    <!-- CTA -->
    <a href="anfrage.html" class="cta-link hidden md:flex items-center gap-1 font-label text-xs tracking-[0.2em] uppercase text-dark-text hover:text-accent-rose transition-colors duration-300">
      Termin Buchen <span class="cta-dash ml-1">——</span>
    </a>

    <!-- Mobile Hamburger -->
    <button id="nav-toggle" class="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menü öffnen">
      <span class="block w-6 h-px bg-dark-text"></span>
      <span class="block w-6 h-px bg-dark-text"></span>
      <span class="block w-4 h-px bg-dark-text"></span>
    </button>
  </nav>

  <!-- Mobile Menu -->
  <div id="nav-mobile" class="hidden md:hidden flex-col gap-6 px-8 pb-8 font-label text-xs tracking-[0.2em] uppercase text-dark-text bg-[#EEE9E4]">
    <a href="leistungen.html"  class="hover:text-accent-rose transition-colors">Leistungen</a>
    <a href="portfolio.html"   class="hover:text-accent-rose transition-colors">Portfolio</a>
    <a href="ueber-mich.html"  class="hover:text-accent-rose transition-colors">Über Mich</a>
    <a href="masterclass.html" class="hover:text-accent-rose transition-colors">Masterclass</a>
    <a href="anfrage.html"     class="hover:text-accent-rose transition-colors">Termin Buchen ——</a>
  </div>
</header>

<main>
  <!-- Sektionen folgen -->
</main>

<!-- FOOTER -->
<footer class="bg-black w-full">
  <div class="flex flex-col items-center gap-10 py-20 px-8">
    <a href="index.html" class="font-headline text-xl text-white italic">Reta Yamaci</a>
    <div class="flex flex-wrap justify-center gap-8 md:gap-14">
      <a href="#" class="font-label text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors duration-300">Impressum</a>
      <a href="#" class="font-label text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors duration-300">Datenschutz</a>
      <a href="anfrage.html" class="font-label text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors duration-300">Kontakt</a>
      <a href="#" class="font-label text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors duration-300">Instagram</a>
      <a href="#" class="font-label text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors duration-300">Pinterest</a>
    </div>
    <p class="font-label text-xs tracking-[0.2em] uppercase text-stone-600">© 2026 Reta Yamaci. Alle Rechte vorbehalten.</p>
  </div>
</footer>

<script>
  // Mobile Nav Toggle
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('nav-mobile');
  toggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
  });
</script>
```

- [ ] **Step 2: Im Browser prüfen**

Öffne http://localhost:3000/index.html — du siehst die glassmorphic Nav oben mit allen 4 Links + "Termin Buchen ——" rechts. Footer unten schwarz mit "Reta Yamaci" und Links. Auf Mobile erscheint Hamburger-Icon.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add nav + footer shared components"
```

---

## Task 3: index.html — Hero Sektion

**Files:**
- Modify: `index.html` — `<!-- Sektionen folgen -->` ersetzen

- [ ] **Step 1: Hero-HTML einfügen**

Ersetze `<!-- Sektionen folgen -->` durch:

```html
<!-- HERO -->
<section class="relative min-h-screen flex items-center px-6 md:px-12 overflow-hidden">
  <!-- Hintergrundbild -->
  <div class="absolute inset-0 z-0">
    <img
      class="w-full h-full object-cover object-center"
      src="https://lh3.googleusercontent.com/aida/ADBb0ug8jBcY8-yF0F64b_eIn5h_WuLCuGqpr-DNLJXOQIA6iWTI2CfPFknoW17PWWd6S5IOMMaaIqsH6WFIn32M7lm62Z8YWIwkrqHxWJhrTBGAAtMDg8ZDjxrMrquRui6pps3Gt36sTTHdQMbh__GpxktE0kZyFvP--Sxb34jxlRnyuf-pFtDKf8k0O_OqNFn_pvIzHNEC-s-70ZHfyEnPxtxSOU28xpQwtcQoNDSGwYpA7F2Tqo_1RmabYKkn-JFAoOJzUdUbQGg2Zw"
      alt="Reta Yamaci — Hair & Makeup Stylistin"
    />
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
  </div>

  <!-- Content -->
  <div class="relative z-10 max-w-[1440px] mx-auto w-full">
    <span class="font-label text-xs tracking-[0.4em] uppercase text-accent-rose mb-6 block drop-shadow-sm">est. 2014</span>
    <h1 class="font-headline hero-title text-white mb-8 drop-shadow-lg" style="text-shadow: 0 2px 8px rgba(0,0,0,0.3);">
      Die Kunst der<br/><em class="not-italic">Verfeinerung.</em>
    </h1>
    <p class="font-body hero-subtitle text-white max-w-2xl mb-12 font-light drop-shadow-md" style="text-shadow: 0 1px 4px rgba(0,0,0,0.3);">
      Ein exklusives Erlebnis für Haar und Make-up.
    </p>
    <a href="leistungen.html" class="cta-link inline-flex items-center font-label text-sm uppercase tracking-widest text-white hover:text-accent-rose transition-colors duration-300 drop-shadow">
      Leistungen entdecken <span class="cta-dash ml-2">——</span>
    </a>
  </div>
</section>

<!-- Weitere Sektionen folgen -->
```

- [ ] **Step 2: Im Browser prüfen**

Öffne http://localhost:3000/index.html — du siehst ein vollbild Hero mit dunklem Overlay, dem Playfair-Titel "Die Kunst der Verfeinerung." in weiß (96px) und dem CTA Link.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add hero section"
```

---

## Task 4: index.html — Philosophy Quote

**Files:**
- Modify: `index.html` — `<!-- Weitere Sektionen folgen -->` ersetzen

- [ ] **Step 1: Quote-HTML einfügen**

Ersetze `<!-- Weitere Sektionen folgen -->` durch:

```html
<!-- PHILOSOPHY QUOTE -->
<section class="py-32 bg-near-white">
  <div class="max-w-4xl mx-auto text-center px-6">
    <span class="material-symbols-outlined text-4xl text-accent-rose mb-8 block">format_quote</span>
    <blockquote class="font-headline text-3xl md:text-4xl text-dark-text italic leading-snug">
      „Bei mir sind Sie in sicheren Händen – mobil, flexibel und mit echter Leidenschaft für Ihr perfektes Styling."
    </blockquote>
    <cite class="mt-8 block font-label text-xs tracking-[0.3em] text-dark-text/60 uppercase not-italic">— Reta Yamaci</cite>
  </div>
</section>

<!-- Weitere Sektionen folgen -->
```

- [ ] **Step 2: Im Browser prüfen**

Scrolle nach unten — du siehst den Quote-Block auf near-white Hintergrund, Playfair italic, zentriert, mit Accent Rose Anführungszeichen-Icon.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add philosophy quote section"
```

---

## Task 5: index.html — Services Preview

**Files:**
- Modify: `index.html` — `<!-- Weitere Sektionen folgen -->` ersetzen

- [ ] **Step 1: Services-HTML einfügen**

Ersetze `<!-- Weitere Sektionen folgen -->` durch:

```html
<!-- SERVICES PREVIEW -->
<section class="py-32 px-6 md:px-12 bg-champagne">
  <div class="max-w-7xl mx-auto">

    <!-- Header Row -->
    <div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
      <div class="max-w-xl">
        <span class="font-label text-xs tracking-[0.3em] uppercase text-accent-rose mb-4 block">Exklusive Auswahl</span>
        <h2 class="font-headline section-h2 text-dark-text">Unsere Signatur-Services</h2>
      </div>
      <a href="leistungen.html" class="cta-link inline-flex items-center font-label text-xs uppercase tracking-widest text-dark-text hover:text-accent-rose transition-colors">
        Alle Services ansehen <span class="cta-dash ml-2">——</span>
      </a>
    </div>

    <!-- Card Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-0">

      <!-- Große Karte (2/3) -->
      <div class="md:col-span-2 group relative overflow-hidden aspect-video md:aspect-auto md:h-[580px]">
        <img
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtrY79UGuutnDinaC056Dn1N6ftcxV64QYxHIj6_KrFn8Th7_vcat7fmxyFaFQG4N54a1K1eQYX1sNVh7r05WYD73uM-wcCmHJgfRehs32Z-WDj68Y5Y9SreOc1Ccnn8h-il-fPjf3h2L8vw2idtbyWFttM9U4ubq_7EdVjfyON2k8f_LsnTZQGFxST156zPMu63-q_yl3PkXc0IfV5_gYoHkFxGQ4fIEPxy8jAmZ2ptB2RXNpIoTGG1wSZypKzq7hb5rLgXSaFos"
          alt="Hair Styling"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div class="absolute bottom-0 p-10 text-white">
          <span class="font-label text-xs tracking-widest uppercase mb-3 block text-accent-rose">Premium Styling</span>
          <h3 class="font-headline section-h3 mb-3">Editorial Hair Design</h3>
          <p class="font-body body-text text-white/80 max-w-sm">Maßgeschneiderte Schnitte und Stylings für den perfekten Auftritt.</p>
        </div>
      </div>

      <!-- Kleine Karte (1/3) -->
      <div class="bg-near-white p-10 flex flex-col justify-between">
        <div>
          <span class="font-label text-xs tracking-widest uppercase text-accent-rose mb-4 block">Make-Up</span>
          <h3 class="font-headline section-h3 mb-4 text-dark-text">The Nude Glow</h3>
          <p class="font-body body-text text-dark-text/80 mb-8">Ein minimalistisches Make-up, das Ihre Haut zum Strahlen bringt.</p>
        </div>
        <div class="aspect-square overflow-hidden">
          <img
            class="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxY1VQBd6uchrReO7zvCBU6EqE6gZ8StiZWv0vJ22h8-kIqJYLNGBpkUBh4aZOd2m-sNcfuMBkbcj1lxQcZC7f6d7Tgflx_5eSkIUhPzp_ir9disMX2ww8QI3wI9XJUpYfuR-yayEVDI8l2YpaIxiMr_wvPgxDkttHvn6zdnlIU6AGL-MgHYKDNkMXCdVjw4kRLdFoGMtorf_chOyiBdM5EaLeJ9O_ad3w9hMpYmyoSHeHhMNalFiXK6cgULTYbNIPCFi8JZyh8"
            alt="Nude Makeup"
          />
        </div>
      </div>

      <!-- Banner (volle Breite) -->
      <div class="md:col-span-3 py-16 px-10 bg-near-white flex flex-col md:flex-row items-center justify-between gap-10">
        <div class="max-w-2xl">
          <h3 class="font-headline section-h3 mb-4 text-dark-text">Individual Coaching</h3>
          <p class="font-body body-text text-dark-text/80">Lernen Sie die Techniken der Profis in privaten Einzelsitzungen direkt vor Ort.</p>
        </div>
        <a href="anfrage.html" class="cta-link inline-flex items-center font-label text-xs uppercase tracking-widest text-dark-text hover:text-accent-rose transition-colors whitespace-nowrap">
          Termin vereinbaren <span class="cta-dash ml-2">——</span>
        </a>
      </div>

    </div>
  </div>
</section>

<!-- Weitere Sektionen folgen -->
```

- [ ] **Step 2: Im Browser prüfen**

Scrolle zur Services-Sektion — du siehst den asymmetrischen Grid: große Foto-Karte (2/3) links, kleine Info-Karte (1/3) rechts, darunter den Coaching-Banner über volle Breite. Hintergrund Champagne.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add services preview section"
```

---

## Task 6: index.html — Portfolio Preview

**Files:**
- Modify: `index.html` — `<!-- Weitere Sektionen folgen -->` ersetzen

- [ ] **Step 1: Portfolio-Preview-HTML einfügen**

Ersetze `<!-- Weitere Sektionen folgen -->` durch:

```html
<!-- PORTFOLIO PREVIEW -->
<section class="py-32 px-6 md:px-12 bg-near-white">
  <div class="max-w-7xl mx-auto">

    <!-- Header Row -->
    <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
      <div>
        <span class="font-label text-xs tracking-[0.3em] uppercase text-accent-rose mb-4 block">Ausgewählte Arbeiten</span>
        <h2 class="font-headline section-h2 text-dark-text">Portfolio</h2>
      </div>
      <a href="portfolio.html" class="cta-link inline-flex items-center font-label text-xs uppercase tracking-widest text-dark-text hover:text-accent-rose transition-colors">
        Alle Arbeiten <span class="cta-dash ml-2">——</span>
      </a>
    </div>

    <!-- 3-Spalten Bild-Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="aspect-square overflow-hidden group">
        <img
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBYEM7_P7sfXPN94r8cywrdqXI-9g8chOYoGzTwPxTucBiyAklTh1yXwNqnBAkOJduHVeUBrh6ut4zsYjRNqxc4THXhIDh8X8-i8rzT7ByR_6CR0GvjY0iUgl-HuKiTh1htyl7aHmMlNENFpAQSxIpDJ4WdrL-UmxUt5u6MtcNUJAjTgnSqAPXOF8QG3RBGGOmZILHjhmLhQboopDdlZveQP4e3yLtaDHME_MMwOKFTjynj9hABcro3RwSy9ZRNzFPpx7XfOjIDCk"
          alt="Portfolio Bild 1"
        />
      </div>
      <div class="aspect-square overflow-hidden group">
        <img
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIg-sPW_CyAiVB0lwLD0jC9Fdu_xOVa_1RHUioGCO-37NQZ9PXdB7P_2ZDk9lY2daNaxEk1XE8yN8lApsQEXR42DfiBPnXgCSZprQCaZuCG8OopzR9vcxffkDZc9QDYjsmC8B-TcZEybO_Dx3Nz-uGZA5EaYFfOAQN40B1paI9ewlzcEYh_KS00qFTwRWGqemy-K-urTBRgbRkN-3MeubUGZHBYButPzInWEieC1CjetwXpMYcQ_flh5Fw38"
          alt="Portfolio Bild 2"
        />
      </div>
      <div class="aspect-square overflow-hidden group">
        <img
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8QE5dSBQPXIOX6SHmIHp9c_DePmpnRH0Jz2mRmP6a-AFGqoyWVHm19fi_SfHUw2UcQ4Q2ff4jEt_CiNBGYxaMHsa7FhTrritequFaAPBV-X8u8HN1G7l_68RZPIMIhDKKBRFWst_pCDnRxwPcn8f9C6K42VtsHEBqHEcljJAb2GC2wh7ukYJ4T4pSLeky4MzCyx0-p9S3fdrtYucHO_p5ZYE2M4YyOles86alFDPmnWTTe2dz_H0"
          alt="Portfolio Bild 3"
        />
      </div>
    </div>

  </div>
</section>

<!-- Weitere Sektionen folgen -->
```

- [ ] **Step 2: Im Browser prüfen**

Scrolle zur Portfolio-Sektion — du siehst 3 quadratische Bilder nebeneinander auf near-white Hintergrund. Hover skaliert das Bild leicht. Header mit Label + H2 + CTA rechts.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add portfolio preview section"
```

---

## Task 7: index.html — Masterclass Teaser

**Files:**
- Modify: `index.html` — `<!-- Weitere Sektionen folgen -->` ersetzen (letztes Mal)

- [ ] **Step 1: Masterclass-Teaser-HTML einfügen**

Ersetze `<!-- Weitere Sektionen folgen -->` durch:

```html
<!-- MASTERCLASS TEASER -->
<section class="py-32 px-6 md:px-12 bg-[#242424] text-near-white">
  <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">

    <!-- Bild / Video-Placeholder -->
    <div class="lg:w-1/2 relative w-full aspect-video overflow-hidden">
      <img
        class="w-full h-full object-cover opacity-50"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8AxqkFhvDE03n80wjwPDxr89F4z-cjvO4X84WBwnE5eguTOfP08ZTDBE7QKjQyht7YieAzYwGnq3oIIWeA6yQtjjcaJgnYRunHAEiNtyjZe9LajrwXQZ68IhmWa7i62RbQL-Otp8slsmm9Z0-YFZBPir3vRaS_3s172oPs3YmPA3XL2fymqgVvHBHJL8DVJJzPOCiiqBWZCX-pGJz1abuyxWXKMr604Z8GI5iO7sQdf6QDznXFUjHZ0lM0t41Zi39q9TC9uASqtc"
        alt="Masterclass Preview"
      />
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="material-symbols-outlined text-6xl text-accent-rose">play_circle</span>
      </div>
    </div>

    <!-- Text -->
    <div class="lg:w-1/2">
      <span class="font-label text-xs tracking-[0.4em] uppercase text-accent-rose mb-6 block">The Digital Atelier</span>
      <h2 class="font-headline section-h2 mb-8 leading-tight text-near-white">Masterclasses für Zuhause</h2>
      <p class="font-body body-text text-near-white/60 mb-10">
        Erhalten Sie exklusiven Zugang zu unserer kuratierten Bibliothek von Lernvideos. Von täglichen Hair-Hacks bis hin zu fortgeschrittenen Editorial-Make-up-Techniken.
      </p>
      <ul class="space-y-4 mb-12">
        <li class="flex items-center gap-3">
          <span class="material-symbols-outlined text-accent-rose text-sm">check</span>
          <span class="font-label text-xs tracking-widest uppercase">Monatlich neue Video-Inhalte</span>
        </li>
        <li class="flex items-center gap-3">
          <span class="material-symbols-outlined text-accent-rose text-sm">check</span>
          <span class="font-label text-xs tracking-widest uppercase">Exklusive Produkt-Empfehlungen</span>
        </li>
      </ul>
      <a href="masterclass.html" class="cta-link inline-flex items-center font-label text-sm uppercase tracking-widest text-near-white hover:text-accent-rose transition-colors duration-300">
        Mitglied werden <span class="cta-dash ml-2">——</span>
      </a>
    </div>

  </div>
</section>
```

- [ ] **Step 2: Im Browser prüfen**

Scrolle zum Masterclass-Teaser — du siehst die dunkle Sektion (`#242424`) mit Bild links und Text rechts. Play-Icon in der Mitte des Bildes. Accent Rose Label + Playfair H2 + 2 Bullet Points + CTA.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add masterclass teaser section"
```

---

## Task 8: index.html — Abschluss & Qualitätsprüfung

**Files:**
- Modify: `index.html` — keine Code-Änderungen, nur prüfen

- [ ] **Step 1: Vollständige visuelle Prüfung**

Öffne http://localhost:3000/index.html und prüfe folgendes:

| Was | Soll-Zustand |
|---|---|
| Seitentitel | "Reta Yamaci — Hair & Makeup Stylistin" |
| Nav Logo | "Reta Yamaci" in Playfair italic |
| Nav Links | Leistungen, Portfolio, Über Mich, Masterclass |
| Nav CTA | "Termin Buchen ——" mit hover-Animation |
| Hero | Vollbild, weißer Text, "Die Kunst der Verfeinerung." in 96px |
| Quote | Champagnefarbener Hintergrund, Italic, kein Border |
| Services | Champagne BG, asymmetrischer Grid, 0px border-radius |
| Portfolio | Near-white BG, 3 quadratische Bilder, hover scale |
| Masterclass | Dunkel #242424, play icon, korrekte Links |
| Footer | Schwarz, "Reta Yamaci", © 2026, alle 5 Links |
| Mobile | Hamburger erscheint, Nav klappt auf/zu |
| Konsole | Keine JavaScript-Fehler |

- [ ] **Step 2: Link-Prüfung**

Klicke alle CTAs — sie führen zu den richtigen Ziel-URLs (auch wenn die Seiten noch nicht existieren, ist der Href korrekt).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: index.html complete"
```

---

## Task 9: anfrage.html — Anfrageformular

**Files:**
- Create: `anfrage.html`

- [ ] **Step 1: Datei erstellen**

Erstelle `/Users/yassin/Desktop/Dev/Web/Reta Yamaci/stitch_reta_1/anfrage.html`:

```html
<!DOCTYPE html>
<html class="light" lang="de">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>Anfrage — Reta Yamaci</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  <script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "champagne":   "#EEE9E4",
            "near-white":  "#FAFAF8",
            "accent-rose": "#D4A49C",
            "dark-text":   "#242424",
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
    .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }
    .cta-dash { display: inline-block; transition: transform 0.3s ease; }
    .cta-link:hover .cta-dash { transform: translateX(8px); }
    /* Baseline Input */
    .input-base {
      background: transparent;
      border: none;
      border-bottom: 1px solid #D4A49C;
      outline: none;
      width: 100%;
      padding: 12px 0;
      font-family: 'Montserrat', sans-serif;
      font-size: 15px;
      color: #242424;
      transition: border-color 0.3s;
    }
    .input-base:focus { border-bottom: 2px solid #7c554e; }
    .input-base::placeholder { color: #242424; opacity: 0.4; font-size: 13px; letter-spacing: 0.05em; }
  </style>
</head>
<body class="bg-near-white text-dark-text font-body">

  <!-- NAV (identisch mit index.html) -->
  <header class="fixed top-0 w-full z-50 bg-[#EEE9E4]/40 backdrop-blur-sm transition-colors duration-500 hover:bg-[#EEE9E4]/90">
    <nav class="flex justify-between items-center px-8 md:px-12 py-6 max-w-[1920px] mx-auto">
      <a href="index.html" class="font-headline text-2xl italic text-dark-text tracking-tight">Reta Yamaci</a>
      <div class="hidden md:flex items-center gap-10 font-label text-xs tracking-[0.2em] uppercase text-dark-text">
        <a href="leistungen.html"  class="hover:text-accent-rose transition-colors duration-300">Leistungen</a>
        <a href="portfolio.html"   class="hover:text-accent-rose transition-colors duration-300">Portfolio</a>
        <a href="ueber-mich.html"  class="hover:text-accent-rose transition-colors duration-300">Über Mich</a>
        <a href="masterclass.html" class="hover:text-accent-rose transition-colors duration-300">Masterclass</a>
      </div>
      <a href="anfrage.html" class="cta-link hidden md:flex items-center gap-1 font-label text-xs tracking-[0.2em] uppercase text-accent-rose">
        Termin Buchen <span class="cta-dash ml-1">——</span>
      </a>
      <button id="nav-toggle" class="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menü öffnen">
        <span class="block w-6 h-px bg-dark-text"></span>
        <span class="block w-6 h-px bg-dark-text"></span>
        <span class="block w-4 h-px bg-dark-text"></span>
      </button>
    </nav>
    <div id="nav-mobile" class="hidden md:hidden flex-col gap-6 px-8 pb-8 font-label text-xs tracking-[0.2em] uppercase text-dark-text bg-[#EEE9E4]">
      <a href="leistungen.html"  class="hover:text-accent-rose transition-colors">Leistungen</a>
      <a href="portfolio.html"   class="hover:text-accent-rose transition-colors">Portfolio</a>
      <a href="ueber-mich.html"  class="hover:text-accent-rose transition-colors">Über Mich</a>
      <a href="masterclass.html" class="hover:text-accent-rose transition-colors">Masterclass</a>
      <a href="anfrage.html"     class="text-accent-rose">Termin Buchen ——</a>
    </div>
  </header>

  <main class="pt-40 pb-32 px-6 md:px-12">
    <div class="max-w-2xl mx-auto">

      <!-- Header -->
      <div class="mb-16">
        <span class="font-label text-xs tracking-[0.3em] uppercase text-accent-rose mb-4 block">Terminanfrage</span>
        <h1 class="font-headline text-5xl md:text-6xl text-dark-text mb-6">Jetzt anfragen</h1>
        <p class="font-body text-base leading-relaxed text-dark-text/70">
          Teilen Sie mir Ihre Wünsche mit — alle weiteren Details wie Ort, Zeit und Ablauf klären wir gemeinsam im Gespräch.
        </p>
      </div>

      <!-- Formular -->
      <form id="inquiry-form" class="flex flex-col gap-12" novalidate>

        <div>
          <label class="font-label text-xs tracking-[0.2em] uppercase text-dark-text/60 block mb-2">Name *</label>
          <input type="text" name="name" placeholder="Ihr vollständiger Name" class="input-base" required/>
        </div>

        <div>
          <label class="font-label text-xs tracking-[0.2em] uppercase text-dark-text/60 block mb-2">E-Mail *</label>
          <input type="email" name="email" placeholder="ihre@email.de" class="input-base" required/>
        </div>

        <div>
          <label class="font-label text-xs tracking-[0.2em] uppercase text-dark-text/60 block mb-2">Telefon</label>
          <input type="tel" name="telefon" placeholder="+49 000 000 000" class="input-base"/>
        </div>

        <div>
          <label class="font-label text-xs tracking-[0.2em] uppercase text-dark-text/60 block mb-2">Gewünschte Leistung</label>
          <select name="leistung" class="input-base appearance-none cursor-pointer">
            <option value="" disabled selected>Bitte wählen</option>
            <option>Tages & Abend Make-Up</option>
            <option>Foto Make-Up</option>
            <option>Styling</option>
            <option>Augenbrauen Mikroblading</option>
            <option>Gesichts Haarentfernung</option>
            <option>Augenbrauen</option>
            <option>Make-Up Workshop</option>
            <option>Braut Spezial</option>
            <option>Spezial Make-Up Effekt</option>
          </select>
        </div>

        <div>
          <label class="font-label text-xs tracking-[0.2em] uppercase text-dark-text/60 block mb-2">Ihre Nachricht</label>
          <textarea name="nachricht" placeholder="Beschreiben Sie kurz Ihr Anliegen..." rows="4" class="input-base resize-none"></textarea>
        </div>

        <!-- Success Message (versteckt) -->
        <div id="success-msg" class="hidden py-8 text-center">
          <span class="material-symbols-outlined text-3xl text-accent-rose block mb-4">check_circle</span>
          <p class="font-headline text-2xl text-dark-text mb-2">Vielen Dank!</p>
          <p class="font-body text-sm text-dark-text/70">Ihre Anfrage wurde gesendet. Ich melde mich bald bei Ihnen.</p>
        </div>

        <button type="submit" class="cta-link self-start inline-flex items-center font-label text-sm uppercase tracking-widest text-dark-text hover:text-accent-rose transition-colors duration-300 mt-4">
          Anfrage absenden <span class="cta-dash ml-2">——</span>
        </button>

      </form>
    </div>
  </main>

  <!-- FOOTER -->
  <footer class="bg-black w-full">
    <div class="flex flex-col items-center gap-10 py-20 px-8">
      <a href="index.html" class="font-headline text-xl text-white italic">Reta Yamaci</a>
      <div class="flex flex-wrap justify-center gap-8 md:gap-14">
        <a href="#" class="font-label text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors duration-300">Impressum</a>
        <a href="#" class="font-label text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors duration-300">Datenschutz</a>
        <a href="anfrage.html" class="font-label text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors duration-300">Kontakt</a>
        <a href="#" class="font-label text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors duration-300">Instagram</a>
        <a href="#" class="font-label text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors duration-300">Pinterest</a>
      </div>
      <p class="font-label text-xs tracking-[0.2em] uppercase text-stone-600">© 2026 Reta Yamaci. Alle Rechte vorbehalten.</p>
    </div>
  </footer>

  <script>
    // Mobile Nav
    const toggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('nav-mobile');
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
    });

    // Formular Submit (simuliert, kein Backend)
    document.getElementById('inquiry-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const name = this.name.value.trim();
      const email = this.email.value.trim();
      if (!name || !email) {
        alert('Bitte füllen Sie mindestens Name und E-Mail aus.');
        return;
      }
      // Felder ausblenden, Erfolgsmeldung zeigen
      Array.from(this.querySelectorAll('div, button')).forEach(el => el.classList.add('hidden'));
      document.getElementById('success-msg').classList.remove('hidden');
    });
  </script>

</body>
</html>
```

- [ ] **Step 2: Im Browser prüfen**

Öffne http://localhost:3000/anfrage.html — du siehst:
- Nav identisch zur Startseite, "Termin Buchen" in Accent Rose (aktive Seite)
- Headline "Jetzt anfragen" in Playfair 60px
- Formular mit Baseline-Inputs (nur unterer Rand, kein Box)
- Dropdown mit allen 9 Services
- Submit-Button als Editorial Text Link
- Nach Absenden erscheint Erfolgsmeldung, Felder verschwinden

- [ ] **Step 3: Commit**

```bash
git add anfrage.html
git commit -m "feat: add anfrage.html inquiry form"
```

---

## Spec Coverage Check

| Spec-Anforderung | Task |
|---|---|
| Nav: Reta Yamaci, 4 Links, Termin Buchen | Task 2 |
| Footer: Schwarz, Reta Yamaci, © 2026, 5 Links | Task 2 |
| Hero: Vollbild, 96px Playfair, CTA → leistungen.html | Task 3 |
| Quote: Near-white BG, Italic, Accent Rose Icon | Task 4 |
| Services: Champagne BG, asymm. Grid, CTA → anfrage.html | Task 5 |
| Portfolio Preview: 3 Bilder, CTA → portfolio.html | Task 6 |
| Masterclass Teaser: Dunkel, Play-Icon, CTA → masterclass.html | Task 7 |
| Anfrage-Formular: Alle Felder, Success-State | Task 9 |
| DESIGN.md: 0px Radius, No-Line, Editorial CTAs | Alle Tasks |
| Sprache Deutsch | Alle Tasks |
