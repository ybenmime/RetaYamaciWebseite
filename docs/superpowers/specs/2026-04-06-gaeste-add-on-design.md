# Gäste-Add-on — Design Spec

**Datum:** 2026-04-06  
**Status:** Approved

---

## Übersicht

Nutzer können beim Buchen eines Hauptservices (Braut, Henna, Standesamt, Verlobung) zusätzlich Gäste-Styling für beliebig viele Begleitpersonen hinzubuchen. Jeder Gast wählt eine eigene Option (Hairstyling · Makeup · Complete Look) zum Gäste-Preis (120 € / 120 € / 240 €).

---

## User Flow

### Schritt 1 — Leistungskarte (leistungen.html)
- Unverändert: Nutzer wählt Service und Option, CTA wird aktiv.
- Klick auf „Anfragen" öffnet das Buchungs-Overlay (kein Seitenwechsel).

### Schritt 2 — Buchungs-Overlay (leistungen.html)
- Halbtransparenter Backdrop über der Seite, weißes Panel zentriert/mittig.
- Schließen-Button (✕) oben rechts — schließt Overlay ohne Datenverlust der Hauptauswahl.
- **Inhalt des Overlays:**
  1. **Hauptbuchung** (read-only): Service + Option + Preis
  2. **Gäste-Sektion:** Label „Gäste-Styling hinzufügen"
     - Jeder Gast wird als eigene Zeile dargestellt
     - Jede Zeile: Gast-Nummer + 3 Option-Chips (Hairstyling / Makeup / Complete Look) mit Preisangabe
     - Aktive Option hebt sich durch Accent-Rose-Rand und Farbe hervor
     - ✕ pro Gast-Zeile zum Entfernen
     - „+ Gast hinzufügen" Link fügt neue leere Gast-Zeile hinzu (unbegrenzt)
  3. **Gesamtpreis** (dynamisch berechnet): Hauptservice + Summe aller Gäste
  4. **CTA:** „Weiter zum Formular ——" — nur aktiv wenn mindestens Hauptoption gewählt (Gäste optional)

### Schritt 3 — Anfrage-Formular (anfrage.html)
- Buchungsübersicht oben als read-only Block (Champagne-Hintergrund):
  - Jede Zeile: Service/Gast · Option · Preis
  - Gesamtsumme hervorgehoben
- Darunter: bestehendes Kontaktformular (Name, E-Mail, Wunschdatum, Nachricht)
- Daten werden per URL-Parameter übergeben:
  - `service=Braut&option=Makeup&guest[0]=Hairstyling&guest[1]=Complete+Look`

---

## Komponenten

### Overlay (neu, leistungen.html)
- **Trigger:** Klick auf `.card-cta` mit Klasse `.card-cta-active`
- **Verhalten:** `position:fixed`, `z-index:100`, Backdrop `rgba(0,0,0,0.3)` + `backdrop-blur`
- **Panel:** weißes div, `border-radius:24px`, max-width ~480px, scrollbar wenn nötig
- **State (JS):** Array von Gästen `[{option: 'Hairstyling'}, {option: null}, ...]`
- **Preisberechnung:** live bei jeder Option-Änderung aktualisiert

### Gast-Zeile (neu)
- Chip-Gruppe: Hairstyling (120 €) · Makeup (120 €) · Complete Look (240 €)
- Gleiche visuelle Sprache wie bestehende `.option-row` Chips (Champagne-Hintergrund, Rose-Akzent bei Auswahl)
- Entfernen-Button nur sichtbar wenn mind. 1 Gast vorhanden

### anfrage.html — Buchungsübersicht (Erweiterung)
- Neuer Block oben in der Formular-Sektion
- Liest URL-Parameter aus und rendert Übersicht
- Wenn keine Parameter → Block wird nicht angezeigt (bestehender Flow bleibt kompatibel)

---

## Preislogik

| Option        | Preis |
|---------------|-------|
| Hairstyling   | 120 € |
| Makeup        | 120 € |
| Complete Look | 240 € |

- Gesamtpreis = Hauptservice-Preis + Σ Gäste-Preise
- Als „geschätzt" anzeigen (endgültiger Preis nach Rücksprache mit Reta)

---

## Design-Entscheidungen

- **Gäste-Karte auf leistungen.html** bleibt bestehen als eigenständige Buchungsoption (für Gäste ohne Braut-Buchung).
- **Kein Maximum** für Gäste-Anzahl — Reta koordiniert per Formular-Nachricht.
- **Overlay statt Seitenwechsel** für Schritt 2 — hält Kontext der Leistungsseite aufrecht.
- **Gäste sind optional** — „Weiter zum Formular" funktioniert auch ohne Gäste.
- **Gleiche visuelle Sprache** wie bestehende Option-Chips — kein neues Design-System nötig.
