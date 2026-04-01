# Spec: Leistungsübersicht (leistungen.html)
**Datum:** 2026-04-01
**Projekt:** Reta Yamaci — Hair & Makeup Stylistin

---

## 1. Ziel

Die Leistungsseite zeigt alle Services von Reta Yamaci übersichtlich mit Preisen. Besucher können bei Anlass-Kategorien die gewünschte Option wählen und direkt zur Anfrage weitergeführt werden.

---

## 2. Seitenstruktur

```
Nav (identisch index.html, "Leistungen" aktiv in accent-rose)
│
├── Hero Header (bg: near-white)
│
├── Sektion "Besondere Anlässe" (bg: champagne)
│   └── 5 Karten: Braut / Henna / Standesamt / Verlobung / Gäste
│
├── Sektion "Weitere Leistungen" (bg: near-white)
│   └── 3 Karten: Shooting Makeup / 1:1 Workshop / Online Masterclass
│
└── Footer (identisch index.html)
```

---

## 3. Design-System

Strikt nach `atelier_champagne/DESIGN.md` und identisch mit `index.html`:
- Farben: Champagne `#EEE9E4`, Near-White `#FAFAF8`, Dark Text `#242424`, Accent Rose `#D4A49C`, Footer Black `#000000`
- Typografie: Playfair Display (Headlines), Montserrat (Body/Label)
- No-Line-Regel: Keine 1px-Borders — nur Hintergrundwechsel
- Border Radius: `0px` überall
- CTAs: `Text ——` mit hover translateX(8px)

---

## 4. Nav & Footer

Identisch zu `index.html`. Einzige Änderung:
- Nav-Link „Leistungen" bekommt `text-accent-rose` (aktive Seite) statt `text-dark-text`
- „Termin Buchen ——" bleibt `text-dark-text` mit hover

---

## 5. Hero Header

- Hintergrund: `near-white` `#FAFAF8`
- Padding: `pt-40 pb-24 px-6 md:px-12`
- Layout: 2-spaltig (Text links, vertikale Linie rechts als Dekorelement)
- Label: `Professional Artistry` — Montserrat, xs, tracking, opacity-60
- H1: `Meine Leistungen` — Playfair Display, 96px (hero-title), dark-text
- Body: `Eine kuratierte Auswahl hochwertiger Beauty-Services, gestaltet für Ihren besonderen Moment.` — Montserrat 17px, max-w-md

---

## 6. Sektion "Besondere Anlässe"

- Hintergrund: Champagne `#EEE9E4`
- Padding: `py-24 px-6 md:px-12`
- Sektion-Label: `Besondere Anlässe` — Montserrat xs, tracking, accent-rose
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0` (kein Gap — tonal separation)

### 5 Karten (Braut, Henna, Standesamt, Verlobung, Gäste)

**Karten-Struktur:**
```
bg-near-white (#FAFAF8), p-10, flex flex-col
│
├── Nummer (01–05) — Montserrat xs, tracking, opacity-40
├── Titel (z.B. "Braut") — Playfair 32px
├── Trennlinie — bg-champagne h-px (tonal, kein border)
├── Optionen-Liste (3 Zeilen, auswählbar):
│   ├── [○] Hairstyling         220 €
│   ├── [○] Makeup              220 €
│   └── [○] Hairstyling + Makeup 400 €
│       ↑ Radio-Input versteckt, visuell als klickbare Zeile
│       ↑ Ausgewählte Zeile: accent-rose Punkt + leicht dunkler bg
└── CTA: "Jetzt anfragen ——" → anfrage.html?service=Braut&option=Hairstyling
```

**Preistabelle:**

| Kategorie   | Hairstyling | Makeup | Hairstyling + Makeup |
|-------------|-------------|--------|----------------------|
| Braut       | 220 €       | 220 €  | 400 €                |
| Henna       | 220 €       | 220 €  | 400 €                |
| Standesamt  | 200 €       | 200 €  | 380 €                |
| Verlobung   | 200 €       | 200 €  | 380 €                |
| Gäste       | 120 €       | 120 €  | 240 €                |

**Interaktion:**
- Standardmäßig ist keine Option ausgewählt
- Klick auf eine Zeile: wählt die Option aus (accent-rose Indikator)
- CTA-Link kodiert die gewählte Option als URL-Parameter: `anfrage.html?service=Braut&option=Hairstyling`
- Ohne Auswahl: CTA linkt zu `anfrage.html?service=Braut`

---

## 7. Sektion "Weitere Leistungen"

- Hintergrund: Near-White `#FAFAF8`
- Padding: `py-24 px-6 md:px-12`
- Sektion-Label: `Weitere Leistungen` — Montserrat xs, tracking, accent-rose
- Grid: `grid-cols-1 md:grid-cols-3 gap-0`

### Karte 1: Shooting Makeup
```
bg-champagne, p-10, flex flex-col
├── Nummer "06"
├── Titel: "Shooting Makeup" — Playfair 32px
├── Body: "Professionelles Make-up für Foto- und Video-Produktionen." — 17px
├── Preis: "100 € / Stunde" — Playfair italic, accent-rose
└── CTA: "Jetzt anfragen ——" → anfrage.html?service=Shooting+Makeup
```

### Karte 2: 1:1 Workshop Hairstyling
```
bg-champagne, p-10, flex flex-col (etwas mehr Inhalt)
├── Nummer "07"
├── Titel: "1:1 Workshop Hairstyling" — Playfair 32px
├── Details (Montserrat 14px, opacity-70):
│   ├── 2 Tage · 5 Stunden pro Tag
│   ├── In Person
│   ├── Goodie Bag & Verpflegung inbegriffen
│   └── Inhalte: Wasserwelle · Messy Bun · Hochsteck · Materialien & Technik
├── Kleiner Empfehlungstext (italic, opacity-60):
│   "Empfehlung: Nutze beide Tage in Person. Du nimmst dir Zeit und lernst
│    welche Materialien, Geräte und Techniken wann und wie eingesetzt werden."
├── Preis: "950 €" — Playfair italic, accent-rose
└── CTA: "Jetzt anfragen ——" → anfrage.html?service=1:1+Workshop
```

### Karte 3: Online Masterclass
```
bg-champagne, p-10, flex flex-col
├── Nummer "08"
├── Titel: "Online Masterclass" — Playfair 32px
├── Details:
│   ├── 3 Frisuren im Trend
│   ├── Tips & Tricks · Technik
│   └── 1 Jahr Zugriff
├── Preis: "499 €" — Playfair italic, accent-rose
└── CTA: "Zur Masterclass ——" → masterclass.html
```

---

## 8. Technische Details

### URL-Parameter für Anfrageformular
Der CTA jeder Karte codiert Service und Option als Query-Parameter:
- `anfrage.html?service=Braut&option=Hairstyling%20%2B%20Makeup`
- Das Anfrageformular liest diese Parameter aus und befüllt den Dropdown vor

### Optionen-Auswahl (JavaScript)
```javascript
// Pro Karte: Radio-ähnliche Auswahl
// Klick auf Zeile → setzt data-selected, updated CTA href
// Kein Framework, reines Vanilla JS
```

### Selektions-Stil
- Unausgewählt: normale Zeile, opacity-70
- Ausgewählt: linker accent-rose Balken (2px, kein border — bg element), text opacity-100

---

## 9. Offene Punkte

- Echte Fotos für die Leistungskarten (optional, Seite funktioniert auch rein typografisch)
- Backend-Integration für Formular-Prefilling (aktuell: URL-Parameter, client-side)
- Mögliche Erweiterung: Preisliste als PDF zum Download
