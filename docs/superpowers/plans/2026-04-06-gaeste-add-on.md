# Gäste-Add-on Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overlay auf leistungen.html das Gäste-Add-on konfiguriert und mit URL-Parametern zu anfrage.html weiterleitet, wo eine Buchungsübersicht angezeigt wird.

**Architecture:** Vanilla JS, kein Framework. Overlay wird per JS in leistungen.html geöffnet (intercepted CTA click). State lebt als JS-Array im Overlay. anfrage.html liest URL-Parameter und rendert eine Buchungsübersicht über dem Formular.

**Tech Stack:** HTML, Tailwind CSS (CDN), Vanilla JS, URL-Parameter (URLSearchParams)

---

## Datei-Übersicht

| Datei | Änderung | Verantwortung |
|---|---|---|
| `leistungen.html` | Erweitern | Overlay-HTML + CSS + JS |
| `anfrage.html` | Erweitern | Buchungsübersicht-Block + JS |

---

### Task 1: Overlay-CSS in leistungen.html

**Files:**
- Modify: `leistungen.html` — `<style>` Block (nach `.service-card > *` Regel)

- [ ] **Schritt 1: CSS einfügen**

Füge folgende Regeln am Ende des `<style>`-Blocks in `leistungen.html` ein (direkt vor `</style>`):

```css
/* Buchungs-Overlay */
.booking-overlay {
  position: fixed;
  inset: 0;
  background: rgba(36,36,36,0.45);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.booking-overlay.open {
  opacity: 1;
  pointer-events: auto;
}
.booking-panel {
  background: white;
  border-radius: 24px;
  padding: 36px;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 16px 64px rgba(36,36,36,0.18);
  transform: translateY(16px);
  transition: transform 0.3s ease;
}
.booking-overlay.open .booking-panel {
  transform: translateY(0);
}
.guest-chip {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 14px;
  cursor: pointer;
  background: #EEE9E4;
  border-radius: 8px;
  transition: background 0.2s;
  position: relative;
}
.guest-chip:hover { background: #e4ddd7; }
.guest-chip.selected { background: #EEE9E4; }
.guest-chip.selected::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  background: #D4A49C;
  border-radius: 2px 0 0 2px;
}
.guest-chip .chip-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.5;
}
.guest-chip.selected .chip-label { opacity: 1; }
.guest-chip .chip-price {
  font-family: 'Cormorant', serif;
  font-size: 20px;
  font-style: italic;
  opacity: 0.65;
  color: #242424;
}
.guest-chip.selected .chip-price { opacity: 1; color: #D4A49C; }
.overlay-cta-inactive { opacity: 0.3; pointer-events: none; cursor: default; }
.overlay-cta-active   { opacity: 1; pointer-events: auto; }
```

- [ ] **Schritt 2: Manuell prüfen**

Lokalen Server starten: `python3 -m http.server 3000`
Seite öffnen: `http://localhost:3000/leistungen.html`
Erwartung: keine sichtbare Änderung, keine Konsolenfehler.

- [ ] **Schritt 3: Commit**

```bash
git add leistungen.html
git commit -m "style: add booking overlay and guest chip CSS"
```

---

### Task 2: Overlay-HTML in leistungen.html

**Files:**
- Modify: `leistungen.html` — direkt vor `</body>`

- [ ] **Schritt 1: Overlay-HTML einfügen**

Füge folgendes direkt vor `</body>` in `leistungen.html` ein:

```html
<!-- BUCHUNGS-OVERLAY -->
<div id="booking-overlay" class="booking-overlay" role="dialog" aria-modal="true" aria-label="Buchungsübersicht">
  <div class="booking-panel">

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="font-headline text-3xl text-dark-text">Deine Buchung</h2>
      <button id="overlay-close" class="font-label text-xl text-dark-text/30 hover:text-dark-text transition-colors leading-none" aria-label="Schließen">✕</button>
    </div>

    <!-- Hauptbuchung (read-only, wird per JS befüllt) -->
    <div class="bg-champagne rounded-xl p-4 mb-6">
      <p class="font-label text-[10px] tracking-[0.2em] uppercase text-dark-text/40 mb-3">Hauptservice</p>
      <div class="flex justify-between items-center">
        <span id="overlay-service-label" class="font-label text-sm text-dark-text"></span>
        <span id="overlay-service-price" class="font-headline text-xl italic text-accent-rose"></span>
      </div>
    </div>

    <!-- Gäste-Sektion -->
    <div class="mb-6">
      <p class="font-label text-[10px] tracking-[0.2em] uppercase text-accent-rose mb-4">Gäste-Styling hinzufügen</p>
      <div id="guest-list" class="flex flex-col gap-3"></div>
      <button id="add-guest-btn" class="cta-link mt-4 inline-flex items-center font-label text-xs uppercase tracking-widest text-dark-text hover:text-accent-rose transition-colors duration-300">
        + Gast hinzufügen
      </button>
    </div>

    <!-- Gesamtpreis -->
    <div class="border-t border-dark-text/10 pt-5 mb-6 flex justify-between items-center">
      <span class="font-label text-xs tracking-[0.2em] uppercase text-dark-text/40">Gesamt (geschätzt)</span>
      <span id="overlay-total" class="font-headline text-2xl italic text-accent-rose"></span>
    </div>

    <!-- CTA -->
    <a id="overlay-cta" href="#" class="cta-link overlay-cta-inactive inline-flex items-center font-label text-xs uppercase tracking-widest text-dark-text hover:text-accent-rose transition-colors duration-300">
      Weiter zum Formular <span class="cta-dash ml-2">——</span>
    </a>

  </div>
</div>
```

- [ ] **Schritt 2: Manuell prüfen**

`http://localhost:3000/leistungen.html` — Overlay soll unsichtbar sein (opacity 0). Keine Konsolenfehler.

- [ ] **Schritt 3: Commit**

```bash
git add leistungen.html
git commit -m "feat: add booking overlay HTML structure"
```

---

### Task 3: Overlay JS — Öffnen & Schließen

**Files:**
- Modify: `leistungen.html` — `<script>` Block, nach dem bestehenden IIFE

- [ ] **Schritt 1: JS einfügen**

Füge folgenden Block nach dem bestehenden `})();` (Ende des IIFE) und vor dem Spotlight-Block ein:

```javascript
// ── Buchungs-Overlay ──────────────────────────────────────────────
(function() {
  var overlay     = document.getElementById('booking-overlay');
  var closeBtn    = document.getElementById('overlay-close');
  var serviceLabel = document.getElementById('overlay-service-label');
  var servicePrice = document.getElementById('overlay-service-price');
  var totalEl     = document.getElementById('overlay-total');
  var overlayCta  = document.getElementById('overlay-cta');
  var addGuestBtn = document.getElementById('add-guest-btn');
  var guestList   = document.getElementById('guest-list');

  // State
  var currentService = '';
  var currentOption  = '';
  var currentPrice   = 0;
  var currentProbe   = '';
  var currentProbePrice = 0;
  var guests = []; // [{option: 'Hairstyling', price: 120}, ...]

  var GUEST_OPTIONS = [
    { label: 'Hairstyling',   price: 120 },
    { label: 'Makeup',        price: 120 },
    { label: 'Complete Look', price: 240 },
  ];

  // Overlay öffnen
  function openOverlay(card) {
    var optRow   = card.querySelector('.option-row.selected');
    var probeRow = card.querySelector('.probe-row.selected');
    if (!optRow) return;

    currentService    = card.dataset.service;
    currentOption     = optRow.dataset.option;
    currentPrice      = parseInt(optRow.dataset.price, 10);
    currentProbe      = probeRow ? probeRow.dataset.probe : '';
    currentProbePrice = probeRow ? parseInt(probeRow.dataset.probePrice, 10) : 0;
    guests = [];

    var label = currentService + ' · ' + currentOption;
    if (currentProbe) label += ' + Probe';
    serviceLabel.textContent = label;
    servicePrice.textContent = (currentPrice + currentProbePrice) + ' €';

    renderGuests();
    updateTotal();
    updateOverlayCta();

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // Overlay schließen
  function closeOverlay() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // CTA-Klicks abfangen — Overlay öffnen statt navigieren
  document.querySelectorAll('.anlass-card').forEach(function(card) {
    card.querySelector('.card-cta').addEventListener('click', function(e) {
      if (!this.classList.contains('card-cta-active')) return;
      e.preventDefault();
      openOverlay(card);
    });
  });

  closeBtn.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeOverlay();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeOverlay();
  });

  // Gast-Zeile rendern
  function renderGuests() {
    guestList.innerHTML = '';
    guests.forEach(function(guest, i) {
      var row = document.createElement('div');
      row.className = 'bg-near-white rounded-xl p-4';

      var header = '<div class="flex justify-between items-center mb-3">'
        + '<span class="font-label text-xs text-dark-text/40 uppercase tracking-widest">Gast ' + (i + 1) + '</span>'
        + '<button class="font-label text-sm text-dark-text/25 hover:text-dark-text transition-colors remove-guest" data-index="' + i + '" aria-label="Gast entfernen">✕</button>'
        + '</div>';

      var chips = '<div class="flex flex-wrap gap-2">';
      GUEST_OPTIONS.forEach(function(opt) {
        var sel = guest.option === opt.label ? ' selected' : '';
        chips += '<div class="guest-chip' + sel + '" data-guest="' + i + '" data-option="' + opt.label + '" data-price="' + opt.price + '">'
          + '<span class="chip-label">' + opt.label + '</span>'
          + '<span class="chip-price">' + opt.price + ' €</span>'
          + '</div>';
      });
      chips += '</div>';

      row.innerHTML = header + chips;
      guestList.appendChild(row);
    });

    // Events: Chip-Auswahl
    guestList.querySelectorAll('.guest-chip').forEach(function(chip) {
      chip.addEventListener('click', function() {
        var idx   = parseInt(this.dataset.guest, 10);
        var opt   = this.dataset.option;
        var price = parseInt(this.dataset.price, 10);
        guests[idx] = { option: opt, price: price };
        renderGuests();
        updateTotal();
        updateOverlayCta();
      });
    });

    // Events: Gast entfernen
    guestList.querySelectorAll('.remove-guest').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var idx = parseInt(this.dataset.index, 10);
        guests.splice(idx, 1);
        renderGuests();
        updateTotal();
        updateOverlayCta();
      });
    });
  }

  // Gast hinzufügen
  addGuestBtn.addEventListener('click', function() {
    guests.push({ option: null, price: 0 });
    renderGuests();
    updateTotal();
    updateOverlayCta();
  });

  // Gesamtpreis berechnen
  function updateTotal() {
    var guestSum = guests.reduce(function(sum, g) { return sum + (g.price || 0); }, 0);
    totalEl.textContent = (currentPrice + currentProbePrice + guestSum) + ' €';
  }

  // Overlay-CTA URL bauen & aktivieren
  function updateOverlayCta() {
    var url = 'anfrage.html?service=' + encodeURIComponent(currentService)
            + '&option='  + encodeURIComponent(currentOption)
            + '&price='   + currentPrice;

    if (currentProbe) {
      url += '&probe=' + encodeURIComponent(currentProbe)
           + '&probePrice=' + currentProbePrice;
    }

    guests.forEach(function(g, i) {
      if (g.option) {
        url += '&g' + i + '=' + encodeURIComponent(g.option)
             + '&gp' + i + '=' + g.price;
      }
    });

    overlayCta.href = url;
    overlayCta.classList.add('overlay-cta-active');
    overlayCta.classList.remove('overlay-cta-inactive');
  }

})();
```

- [ ] **Schritt 2: Manuell prüfen**

1. `http://localhost:3000/leistungen.html` öffnen
2. Auf einer Karte (z.B. Braut) eine Option wählen → CTA wird aktiv
3. Auf „Anfragen" klicken → Overlay öffnet sich mit Hauptbuchung
4. ✕ klicken → Overlay schließt sich
5. Außerhalb des Panels klicken → Overlay schließt sich
6. Escape-Taste → Overlay schließt sich

- [ ] **Schritt 3: Commit**

```bash
git add leistungen.html
git commit -m "feat: add booking overlay open/close and guest management JS"
```

---

### Task 4: anfrage.html — Buchungsübersicht

**Files:**
- Modify: `anfrage.html` — vor dem `<!-- Header -->` Block in der Formular-Sektion

- [ ] **Schritt 1: Buchungsübersicht-HTML einfügen**

Füge folgenden Block direkt vor `<!-- Header -->` (Zeile ~130) in `anfrage.html` ein:

```html
<!-- Buchungsübersicht (erscheint nur wenn URL-Parameter vorhanden) -->
<div id="booking-summary" class="hidden mb-16 bg-champagne rounded-2xl p-8">
  <p class="font-label text-[10px] tracking-[0.3em] uppercase text-accent-rose mb-5">Deine Anfrage</p>
  <div id="summary-lines" class="flex flex-col gap-2 mb-5"></div>
  <div class="border-t border-dark-text/10 pt-4 flex justify-between items-center">
    <span class="font-label text-xs tracking-[0.2em] uppercase text-dark-text/40">Gesamt (geschätzt)</span>
    <span id="summary-total" class="font-headline text-2xl italic text-accent-rose"></span>
  </div>
</div>
```

- [ ] **Schritt 2: JS für Buchungsübersicht einfügen**

Füge folgenden `<script>`-Block direkt vor `</body>` in `anfrage.html` ein:

```javascript
<script>
(function() {
  var params  = new URLSearchParams(window.location.search);
  var service = params.get('service');
  var option  = params.get('option');
  var price   = parseInt(params.get('price') || '0', 10);
  var probe   = params.get('probe');
  var probePrice = parseInt(params.get('probePrice') || '0', 10);

  if (!service || !option) return; // kein Overlay-Flow → nichts anzeigen

  var summary = document.getElementById('booking-summary');
  var lines   = document.getElementById('summary-lines');
  var totalEl = document.getElementById('summary-total');
  summary.classList.remove('hidden');

  var total = price + probePrice;

  function addLine(label, amount) {
    var div = document.createElement('div');
    div.className = 'flex justify-between items-center';
    div.innerHTML = '<span class="font-label text-sm text-dark-text">' + label + '</span>'
                  + '<span class="font-headline text-lg italic text-dark-text/70">' + amount + ' €</span>';
    lines.appendChild(div);
  }

  addLine(service + ' · ' + option, price);
  if (probe) addLine('Probe · ' + probe, probePrice);

  // Gäste auslesen: g0, g1, g2, ...
  var i = 0;
  while (params.get('g' + i)) {
    var gOpt   = params.get('g' + i);
    var gPrice = parseInt(params.get('gp' + i) || '0', 10);
    addLine('Gast ' + (i + 1) + ' · ' + gOpt, gPrice);
    total += gPrice;
    i++;
  }

  totalEl.textContent = total + ' €';
})();
</script>
```

- [ ] **Schritt 3: Manuell prüfen**

URL direkt aufrufen:
```
http://localhost:3000/anfrage.html?service=Braut&option=Makeup&price=220&g0=Hairstyling&gp0=120&g1=Complete+Look&gp1=240
```

Erwartung:
- Champagne-Box erscheint oben mit 3 Zeilen: Braut · Makeup (220 €), Gast 1 · Hairstyling (120 €), Gast 2 · Complete Look (240 €)
- Gesamt: 580 €
- Kontaktformular darunter unverändert

Ohne Parameter (`http://localhost:3000/anfrage.html`):
- Champagne-Box ist nicht sichtbar — bestehender Flow unberührt

- [ ] **Schritt 4: End-to-End Flow manuell prüfen**

1. `leistungen.html` → Braut → Makeup wählen → Anfragen klicken
2. Overlay öffnet: „Braut · Makeup · 220 €"
3. „+ Gast hinzufügen" → Gast-Zeile erscheint
4. Hairstyling bei Gast wählen → Gesamt: 340 €
5. „Weiter zum Formular" klicken → anfrage.html öffnet mit korrekter Übersicht

- [ ] **Schritt 5: Commit**

```bash
git add anfrage.html
git commit -m "feat: add booking summary block to anfrage.html from URL params"
```

---

### Task 5: Außerhalb-Klick-Fix & finaler Push

**Files:**
- Modify: `leistungen.html` — bestehender `document.addEventListener('click', ...)` Handler

- [ ] **Schritt 1: Klick-Handler anpassen**

Der bestehende „Klick außerhalb" Handler setzt die Karten zurück wenn man außerhalb klickt. Er muss jetzt auch den Overlay-Bereich ausschließen. Ersetze die bestehende Zeile:

```javascript
// ALT:
if (e.target.closest('.card-cta')) return;

// NEU:
if (e.target.closest('.card-cta') || e.target.closest('#booking-overlay')) return;
```

- [ ] **Schritt 2: Manuell prüfen**

1. Option auf einer Karte wählen
2. Overlay öffnen
3. Im Overlay klicken → Karten-Auswahl bleibt erhalten
4. Overlay schließen → Karte zeigt noch die gewählte Option

- [ ] **Schritt 3: Alles pushen**

```bash
git add leistungen.html anfrage.html
git commit -m "fix: preserve card selection state while overlay is open"
git push origin main
```
