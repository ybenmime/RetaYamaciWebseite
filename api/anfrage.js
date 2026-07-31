// Vercel Serverless Function — POST /api/anfrage
// Nimmt die Kontaktformular-Daten entgegen und verschickt sie per E-Mail (nodemailer).
// SMTP-Zugangsdaten kommen aus den Environment-Variablen im Vercel-Dashboard.
const nodemailer = require('nodemailer');

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
  : nodemailer.createTransport({ jsonTransport: true }); // Fallback ohne SMTP (nur Logging)

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vercel parst JSON-Bodies automatisch; als Fallback selbst parsen.
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const {
    name, email, telefon, leistung, option, probe_styling,
    event_datum, fertig_um, ort, adresse, nachricht,
  } = body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name und E-Mail sind Pflichtfelder.' });
  }

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

  const senderAddress = process.env.SENDER_EMAIL || process.env.SMTP_USER || 'kontaktformular@reta-yamaci.de';
  const mail = {
    from:    { name: 'Kontaktformular reta-yamaci.de', address: senderAddress },
    to:      process.env.RECIPIENT_EMAIL || 'rita.y@live.de',
    replyTo: { name: name, address: email }, // Antworten gehen direkt an die anfragende Person
    subject: `Neue Anfrage von ${name}${leistung ? ` — ${leistung}` : ''}`,
    text:    textBody,
    html:    htmlBody,
  };

  try {
    await transporter.sendMail(mail);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Fehler beim E-Mail-Versand:', err);
    return res.status(502).json({ error: 'E-Mail konnte nicht gesendet werden.' });
  }
};
