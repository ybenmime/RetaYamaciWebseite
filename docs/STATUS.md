# Projektstatus — reta-webseite

**Stand: 2026-08-16** · Live unter <https://reta-yamaci.de>

---

## 🟢 Live-Status

Die Seite ist seit dem 16.08.2026 unter der eigenen Domain live. Die alte
WordPress-Seite bei All-Inkl ist über die Domain nicht mehr erreichbar.

| | |
|---|---|
| **Domain** | `reta-yamaci.de` (kanonisch, ohne `www`) |
| **Hosting** | Vercel — Projekt `reta-yamaci-webseite` |
| **Repo** | `ybenmime/RetaYamaciWebseite`, Branch `main` (Auto-Deploy) |
| **DNS** | All-Inkl KAS, Account `w0186e41` |
| **SSL** | Let's Encrypt, automatische Erneuerung |
| **Backend** | `api/anfrage.js` — Serverless Function, Versand via nodemailer/SMTP |

---

## DNS-Zone `reta-yamaci.de` (KAS → Domain → DNS-Einstellungen)

| # | Name | Typ | Wert | |
|---|---|---|---|---|
| 1 | (Root) | A | `216.198.79.1` | → Vercel |
| 2 | `*` | A | `85.13.146.87` | Wildcard, bewusst auf All-Inkl belassen |
| 3 | `www` | CNAME | `0bd2391943982669.vercel-dns-017.com.` | → Vercel, 308 auf Root |
| 4 | | MX 10 | `w0186e41.kasserver.com.` | **E-Mail** |
| 5 | | TXT | `v=spf1 a mx include:spf.kasserver.com ~all` | **SPF** |
| 6 | `kas202606070335._domainkey` | TXT | DKIM-Key | **DKIM** |

### ⚠️ Nicht anfassen
- **Zeilen 4–6** sind Retas E-Mail-Zustellung. Änderungen führen dazu, dass Mails
  im Spam landen oder gar nicht mehr ankommen.
- **„Zone zurücksetzen"** in KAS löscht MX, SPF und DKIM auf einen Schlag — niemals klicken.
- **All-Inkl-Paket nicht kündigen** — die Domain und die `make-up-hair.de`-Weiterleitung hängen daran.

### Nebendomain
`make-up-hair.de` liegt weiter auf All-Inkl und leitet serverseitig per 301 auf
`https://reta-yamaci.de/` weiter. Funktioniert unverändert, kein Handlungsbedarf.

---

## Seitenstruktur

| Datei | Indexierung |
|---|---|
| `index.html` | `index, follow` + JSON-LD |
| `leistungen.html` | `index, follow` + JSON-LD |
| `ueber-mich.html` | `index, follow` |
| `anfrage.html` | `index, follow` — Kontaktformular → `/api/anfrage` |
| `impressum.html` | `noindex, follow` |
| `datenschutz.html` | `noindex, follow` |
| `masterclass.html` | `noindex, follow` — Coming Soon |

Nicht deployt (via `.vercelignore`): `masterclass-login.html`, `_mobile-preview.html`,
`api/server.js` (lokaler Dev-Server), `docs/`, interne Bildordner.

---

## ✅ Verifiziert beim Go-Live

- Alle 7 Seiten, `robots.txt`, `sitemap.xml`, Favicon, OG-Image → HTTP 200
- Alle 19 referenzierten Assets über alle Seiten → HTTP 200
- `www` → 308 auf Root, inklusive Pfaderhalt; HTTP → HTTPS → 308
- Ausgeschlossene Dateien → korrekt 404
- API erreichbar, Validierung greift (400 bei leerem Request)
- MX/SPF/DKIM nach der Umstellung unverändert
- SEO-Grundlagen: Titles, Descriptions, Canonicals, OG-Image, `lang="de"`,
  je genau ein `<h1>`, **kein Bild ohne alt-Text**

### Hinweis: DNS-Cache nach dem Go-Live
Direkt nach der Umstellung können lokal noch gemischte Ergebnisse auftreten —
HTML von Vercel, Bilder oder Unterseiten dagegen vom alten Server (404 im alten
WordPress-Design). Ursache ist der DNS-Cache (**TTL 7200 s = 2 h**), nicht die
Konfiguration. Abhilfe: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`,
in Chrome zusätzlich `chrome://net-internals/#dns` → *Clear host cache* und
`#sockets` → *Flush socket pools*.

---

## 🔜 Offene Punkte

### Geplant: Redesign / großes Upgrade
Ein umfassendes Redesign der Website ist vorgesehen. Der aktuelle Stand ist die
stabile, live geschaltete Basis — Ausgangspunkt und Rückfallebene für den Umbau.
Gestalterische Leitlinien: `docs/design/DESIGN.md`.

### Technisch
- **Tailwind läuft über das Play-CDN** (`cdn.tailwindcss.com?plugins=forms,container-queries`,
  auf allen Seiten). Nicht für Produktion gedacht: Das CSS wird erst im Browser des
  Besuchers kompiliert → langsamerer LCP, kurzes Aufblitzen ungestylten Inhalts,
  Abhängigkeit von einem fremden CDN. Fix = echter Build-Schritt (Tailwind CLI →
  statische `styles.css`, Script-Tag durch `<link>` ersetzen). Aufwand ~30–60 Min
  inklusive Gegenprüfung aller Seiten. **Sinnvoll im Zuge des Redesigns.**
- **Google-gehostetes Platzhalterbild** in `index.html` (Masterclass-Teaser,
  `lh3.googleusercontent.com/aida-public/…`). Temporäre KI-URL, lädt Stand 16.08.2026
  noch, kann aber jederzeit ablaufen → durch lokales Bild ersetzen. Quellordner liegen
  lokal: `Foto Webseite Reta/`, `reta bilder neu/` (beide gitignored).

### Inhaltlich / Marketing
- **Formular-Test auf der Live-Domain** steht noch aus. Die API-Validierung ist
  verifiziert, der echte Mailversand über die neue Domain noch nicht.
- **Google Search Console** einrichten und Sitemap einreichen, damit der Domainwechsel
  schnell im Index ankommt und die alten WordPress-URLs herausfallen.
- **E-Mail-Zustellbarkeit:** Mails landeten bei live.de im Spam. Reta sollte
  `reta.kontaktformular@gmail.com` als sicheren Absender freigeben. Robuster wäre
  domain-authentifizierter Versand über `kontakt@reta-yamaci.de` — nötig, falls später
  Bestätigungsmails an Kundinnen verschickt werden.
- Mobile-/Responsive-Feinschliff über alle Seiten.
- Google-Bewertungen als Testimonials einbinden (Methode noch offen).
