# Reta Yamaci — WhatsApp API

Node.js/Express Backend, das Formulareinsendungen von `anfrage.html` als WhatsApp-Nachricht via Meta WhatsApp Cloud API weiterleitet.

---

## 1. Meta Business Account & WhatsApp Cloud API einrichten

1. **Meta Business Account** erstellen: [business.facebook.com](https://business.facebook.com)
2. **Meta Developer App** anlegen: [developers.facebook.com](https://developers.facebook.com) → „Neue App erstellen" → „Business"
3. In der App: **WhatsApp** als Produkt hinzufügen
4. Unter **WhatsApp → API Setup**:
   - Testtelefonnummer notieren oder eigene verifizieren
   - **Phone Number ID** notieren (wird in `.env` eingetragen)
5. **Permanent Token** erstellen:
   - Business Settings → System Users → System User anlegen
   - Berechtigungen: `whatsapp_business_messaging`
   - Token generieren und sicher speichern

---

## 2. Umgebungsvariablen konfigurieren

```bash
cp .env.example .env
```

`.env` ausfüllen:

```
WHATSAPP_TOKEN=EAAxxxxxxxxxxxxx
WHATSAPP_PHONE_NUMBER_ID=123456789012345
RECIPIENT_PHONE_NUMBER=4915112345678
PORT=3001
```

> **Format für `RECIPIENT_PHONE_NUMBER`:** Ländervorwahl + Nummer, ohne `+` oder Leerzeichen.  
> Beispiel: `+49 151 12345678` → `4915112345678`

---

## 3. Lokal starten

```bash
cd api
npm install
npm run dev
```

Server läuft auf `http://localhost:3001`

---

## 4. Lokal testen

Mit curl:

```bash
curl -X POST http://localhost:3001/anfrage \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Max Mustermann",
    "email": "max@beispiel.de",
    "telefon": "+49 151 12345678",
    "leistung": "Braut",
    "event_datum": "15. Juni 2026",
    "fertig_um": "10:00",
    "ort": "Beim Kunden",
    "nachricht": "Testanfrage"
  }'
```

Erwartete Antwort: `{"success":true}`  
Reta sollte die WhatsApp-Nachricht erhalten.

Health-Check: `GET http://localhost:3001/health`

---

## 5. Deployment

### Option A: Render.com (kostenlos, empfohlen)

1. [render.com](https://render.com) → „New Web Service"
2. GitHub-Repo verbinden, Root Directory: `api`
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Umgebungsvariablen unter „Environment" eintragen
6. Nach dem Deploy: URL kopieren (z.B. `https://reta-yamaci-api.onrender.com`)

### Option B: Railway

1. [railway.app](https://railway.app) → „New Project" → GitHub-Repo
2. Root Directory: `api`
3. Umgebungsvariablen eintragen
4. Deploy

---

## 6. Frontend-URL nach Deployment anpassen

In `anfrage.html` die fetch-URL aktualisieren:

```js
// Vorher (lokal):
const res = await fetch('http://localhost:3001/anfrage', ...);

// Nachher (Produktion):
const res = await fetch('https://reta-yamaci-api.onrender.com/anfrage', ...);
```

---

## Sicherheitshinweise

- `.env` niemals committen (ist in `.gitignore` eingetragen)
- In Produktion `cors({ origin: 'https://retayamaci.de' })` einschränken
- Den WhatsApp Token regelmäßig rotieren
