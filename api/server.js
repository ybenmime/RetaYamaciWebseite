require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const nodemailer = require('nodemailer');
const app        = express();

app.use(cors({ origin: '*' })); // Prod: auf die eigene Domain einschränken
app.use(express.json());

// --- Mail-Transport aufbauen ------------------------------------------------
// Wenn SMTP-Zugangsdaten in der .env stehen, wird echt verschickt.
// Fehlen sie, läuft der Server im DEV-MODUS: die Mail wird nur in der Konsole
// ausgegeben (jsonTransport) und das Formular bekommt trotzdem "success".
const hasSmtp = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

const transporter = hasSmtp
  ? nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465, // true für Port 465, sonst STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : nodemailer.createTransport({ jsonTransport: true });

if (!hasSmtp) {
  console.warn('⚠️  Kein SMTP konfiguriert — DEV-MODUS aktiv. E-Mails werden nur in der Konsole ausgegeben, nicht verschickt.');
  console.warn('    Zum echten Versand SMTP_HOST, SMTP_USER, SMTP_PASS (und RECIPIENT_EMAIL) in api/.env eintragen.\n');
}

app.post('/anfrage', async (req, res) => {
  const {
    name, email, telefon, leistung, option, probe_styling,
    event_datum, fertig_um, ort, adresse, nachricht,
  } = req.body;

  // Pflichtfeld-Validierung
  if (!name || !email) {
    return res.status(400).json({ error: 'Name und E-Mail sind Pflichtfelder.' });
  }

  // Mail-Inhalt aufbauen
  const rows = [
    ['Name',          name],
    ['E-Mail',        email],
    ['Telefon',       telefon],
    ['Leistung',      leistung],
    ['Option',        option],
    ['Probe-Styling', probe_styling],
    ['Datum',         event_datum],
    ['Fertig um',     fertig_um ? `${fertig_um} Uhr` : ''],
    ['Ort',           ort],
    ['Adresse',       adresse],
    ['Nachricht',     nachricht],
  ].filter(([, v]) => v && String(v).trim());

  const textBody = ['Neue Anfrage über das Kontaktformular:', '', ...rows.map(([k, v]) => `${k}: ${v}`)].join('\n');

  const htmlBody = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#242424;max-width:560px;">
      <h2 style="font-weight:600;">Neue Anfrage — Reta Yamaci</h2>
      <table style="border-collapse:collapse;width:100%;">
        ${rows.map(([k, v]) => `
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;white-space:nowrap;vertical-align:top;">${k}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;">${String(v).replace(/\n/g, '<br>')}</td>
          </tr>`).join('')}
      </table>
    </div>`;

  const mail = {
    from:    process.env.SENDER_EMAIL || process.env.SMTP_USER || 'kontaktformular@retayamaci.de',
    to:      process.env.RECIPIENT_EMAIL || 'kontakt@retayamaci.de',
    replyTo: email, // Antworten gehen direkt an die anfragende Person
    subject: `Neue Anfrage von ${name}${leistung ? ` — ${leistung}` : ''}`,
    text:    textBody,
    html:    htmlBody,
  };

  try {
    await transporter.sendMail(mail);
    if (!hasSmtp) {
      console.log('\n📧 [DEV-MODUS] E-Mail würde verschickt werden:\n');
      console.log(`An: ${mail.to}`);
      console.log(`Betreff: ${mail.subject}\n`);
      console.log(textBody);
      console.log('\n---\n');
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Fehler beim E-Mail-Versand:', err);
    return res.status(502).json({ error: 'E-Mail konnte nicht gesendet werden.' });
  }
});

// Health-Check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Reta Yamaci API läuft auf Port ${PORT}`));
