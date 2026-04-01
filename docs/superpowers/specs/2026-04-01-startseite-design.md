# Spec: Startseite (index.html)
**Datum:** 2026-04-01
**Projekt:** Reta Yamaci — Hair & Makeup Stylistin

---

## 1. Ziel

Die Startseite ist die digitale Visitenkarte von Reta Yamaci. Sie soll neue Besucher sofort von der Qualität und Ästhetik überzeugen, alle vier Hauptbereiche der Website anteasern und zur Anfrage motivieren.

---

## 2. Dateistruktur (gesamtes Projekt)

```
index.html              ← Startseite (diese Spec)
leistungen.html         ← Leistungsübersicht
portfolio.html          ← Portfolio (später)
ueber-mich.html         ← Über Mich (später)
masterclass.html        ← Masterclass Bereich (später, dunkel)
anfrage.html            ← Anfrageformular (Felder werden später präzisiert)
```

---

## 3. Design-System

Strikt nach `atelier_champagne/DESIGN.md`:

- **Farben:** Champagne `#EEE9E4`, Near-White `#FAFAF8`, Dark Text `#242424`, Accent Rose `#D4A49C`, Footer `#000000`
- **Typografie:** Playfair Display (Headlines), Montserrat (Body/Label)
- **No-Line-Regel:** Keine 1px-Borders zur Trennung — nur Hintergrundwechsel
- **Border Radius:** `0px` überall (außer `border-radius: 9999px` für Kreise)
- **CTAs:** Editorial Text Links — `Text ——` mit hover translate-x(8px)
- **Schatten:** Keine harten Drop-Shadows — nur tonal layering

---

## 4. Shared Components (auf allen Seiten identisch)

### Navigation
- Fixed, glassmorphic: `bg-[#EEE9E4]/40 backdrop-blur-sm`
- Links: `Reta Yamaci` (Playfair italic, 24px)
- Mitte: `Leistungen` → `leistungen.html` | `Portfolio` → `portfolio.html` | `Über Mich` → `ueber-mich.html` | `Masterclass` → `masterclass.html`
- Rechts: `Termin Buchen ——` → `anfrage.html`
- Mobile: Hamburger-Menü

### Footer
- Vollbild schwarz `#000000`
- `Reta Yamaci` in Playfair, weiß
- Links: Impressum — Datenschutz — Kontakt — Instagram — Pinterest
- Copyright: `© 2026 Reta Yamaci. Alle Rechte vorbehalten.`

---

## 5. Sektionen der Startseite

### 5.1 Hero
- Vollbild (100vh), Foto mit dunklem Gradient-Overlay (unten → transparent)
- Label: `est. 2014` — Montserrat, 12px, Accent Rose, tracking-widest
- H1: `Die Kunst der Verfeinerung.` — Playfair 96px, weiß, `<em>` auf "Verfeinerung."
- Subtitle: `Ein exklusives Erlebnis für Haar und Make-up.` — Montserrat 42px light, weiß
- CTA: `Leistungen entdecken ——` → `leistungen.html`
- Bild: Placeholder-URL aus bestehendem Code (wird später durch echtes Foto ersetzt)

### 5.2 Philosophy Quote
- Hintergrund: `#FAFAF8`, viel vertikaler Weißraum (py-32)
- Accent Rose `format_quote` Icon oben, zentriert
- Blockquote: `„Bei mir sind Sie in sicheren Händen – mobil, flexibel und mit echter Leidenschaft für Ihr perfektes Styling."` — Playfair italic, 40px
- Cite: `— Reta Yamaci` — Montserrat, 12px, uppercase, tracking

### 5.3 Services Preview
- Hintergrund: Champagne `#EEE9E4`
- Header-Zeile: Label `Exklusive Auswahl` + H2 `Unsere Signatur-Services` links | `Alle Services ansehen ——` → `leistungen.html` rechts
- 3-Card-Grid (asymmetrisch):
  - **Große Karte (2/3 Breite):** Editorial Hair Design — Foto mit Overlay
  - **Kleine Karte (1/3 Breite):** The Nude Glow — Quadratisches Bild + Text
  - **Banner (volle Breite):** Individual Coaching — Text links, CTA `Termin vereinbaren ——` → `anfrage.html` rechts
- Hinweis: Service-Inhalte werden im Projektverlauf aktualisiert

### 5.4 Portfolio Preview *(neu)*
- Hintergrund: `#FAFAF8`
- Header: Label `Ausgewählte Arbeiten` + H2 `Portfolio` | `Alle Arbeiten ——` → `portfolio.html`
- 3-Spalten-Bildgrid (quadratisch, `aspect-square`, kein border-radius, `overflow-hidden`)
- Hover: leichtes scale(1.05) auf dem Bild
- Bilder: Placeholder-URLs (werden später durch echte Portfolio-Fotos ersetzt)

### 5.5 Masterclass Teaser
- Hintergrund: `#242424` (dunkel) — bewusster Kontrast
- Layout: 2-spaltig (Bild links, Text rechts)
- Label: `The Digital Atelier` — Accent Rose
- H2: `Masterclasses für Zuhause`
- Body: Kurzbeschreibung des Mitgliederbereichs
- Bullet-Liste: `Monatlich neue Video-Inhalte` | `Exklusive Produkt-Empfehlungen`
- CTA: `Mitglied werden ——` → `masterclass.html`

---

## 6. Anfrageformular (anfrage.html) — Grundstruktur

- Einfache, minimalistische Seite im Champagne-Design
- Felder (vorläufig, werden später präzisiert):
  - Name
  - E-Mail
  - Telefon
  - Gewünschte Leistung (Dropdown — befüllt aus den 9 Services)
  - Nachricht / Wünsche
  - Absenden-Button
- Hinweis auf der Seite: "Alle weiteren Details wie Ort und Zeit klären wir gemeinsam."
- Nach Absenden: Danke-Meldung auf der Seite (kein separates Backend nötig für jetzt)

---

## 7. Technische Entscheidungen

- **Technologie:** Reines HTML + Tailwind CSS (CDN) — keine Build-Tools
- **Bilder:** Google-Placeholder-URLs bleiben bis echte Fotos geliefert werden
- **Sprache:** Deutsch durchgehend
- **Keine Borders:** Hintergrundwechsel statt Linien (DESIGN.md)
- **Responsive:** Mobile-first, Breakpoint bei `md:` (768px)
- **Masterclass dunkel:** Bewusste Ausnahme vom Champagne-System für premium Gefühl

---

## 8. Offene Punkte (für spätere Phasen)

- Echte Fotos von Reta Yamaci (Hero, Portfolio, Services)
- Finale Service-Liste mit aktuellen Angeboten und Preisen
- Anfrageformular-Felder (genaue Details)
- Backend / E-Mail-Versand für das Formular
- Login/Auth-System für den Masterclass-Bereich
- Impressum & Datenschutz Inhalte
