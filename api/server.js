require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(cors({ origin: '*' })); // Prod: auf die eigene Domain einschränken
app.use(express.json());

app.post('/anfrage', async (req, res) => {
  const {
    name, email, telefon, leistung, option, probe_styling,
    event_datum, fertig_um, ort, adresse, nachricht,
  } = req.body;

  // Pflichtfeld-Validierung
  if (!name || !email) {
    return res.status(400).json({ error: 'Name und E-Mail sind Pflichtfelder.' });
  }

  // Nachricht formatieren
  const lines = [
    '📋 *Neue Anfrage — Reta Yamaci*',
    '',
    `👤 *Name:* ${name}`,
    `📧 *E-Mail:* ${email}`,
    telefon       ? `📱 *Telefon:* ${telefon}`                  : null,
    leistung      ? `✨ *Leistung:* ${leistung}`                 : null,
    option        ? `🎨 *Option:* ${option}`                     : null,
    probe_styling ? `🔍 *Probe-Styling:* ${probe_styling}`       : null,
    event_datum   ? `📅 *Datum:* ${event_datum}`                 : null,
    fertig_um     ? `⏰ *Fertig um:* ${fertig_um} Uhr`          : null,
    ort           ? `📍 *Ort:* ${ort}`                          : null,
    adresse       ? `🏠 *Adresse:* ${adresse}`                  : null,
    nachricht     ? `\n💬 *Nachricht:*\n${nachricht}`           : null,
  ];
  const text = lines.filter(Boolean).join('\n');

  // Meta WhatsApp Cloud API aufrufen
  let apiRes;
  try {
    apiRes = await fetch(
      `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: process.env.RECIPIENT_PHONE_NUMBER,
          type: 'text',
          text: { body: text },
        }),
      }
    );
  } catch (networkErr) {
    console.error('Netzwerkfehler beim WhatsApp-API-Aufruf:', networkErr);
    return res.status(502).json({ error: 'Netzwerkfehler beim Senden der Nachricht.' });
  }

  if (!apiRes.ok) {
    const errBody = await apiRes.json().catch(() => ({}));
    console.error('WhatsApp API Fehler:', errBody);
    return res.status(502).json({ error: 'WhatsApp API Fehler.', detail: errBody });
  }

  res.json({ success: true });
});

// Health-Check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Reta Yamaci API läuft auf Port ${PORT}`));
