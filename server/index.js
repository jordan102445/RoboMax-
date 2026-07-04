import "dotenv/config";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const distDir = path.join(rootDir, "dist");
const app = express();

const PORT = Number(process.env.PORT || 4174);
const BOOKING_TO = process.env.BOOKING_TO || "";
const FROM_NAME = process.env.FROM_NAME || "RoboMax Outreach";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE = String(process.env.SMTP_SECURE || "true") === "true";

app.use(express.json({ limit: "1mb" }));

function getTransporter() {
  if (!SMTP_USER || !SMTP_PASS || !BOOKING_TO) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

function getMissingEmailConfig() {
  return [
    ["BOOKING_TO", BOOKING_TO],
    ["SMTP_USER", SMTP_USER],
    ["SMTP_PASS", SMTP_PASS],
  ]
    .filter(([, value]) => !value)
    .map(([key]) => key);
}

function sanitize(value) {
  return String(value || "").trim();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return sanitize(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderTemplate(filename, values) {
  const templatePath = path.join(publicDir, filename);
  let html = fs.readFileSync(templatePath, "utf8");

  html = html.replace(/src="\/robomax-email-visual\.jpeg"/g, 'src="cid:robomaxVisual"');

  Object.entries(values).forEach(([key, value]) => {
    html = html.replaceAll(`{{${key}}}`, escapeHtml(value));
  });

  return html;
}

function renderTextTemplate(filename, values) {
  const templatePath = path.join(publicDir, filename);
  let text = fs.readFileSync(templatePath, "utf8");

  Object.entries(values).forEach(([key, value]) => {
    text = text.replaceAll(`{{${key}}}`, sanitize(value));
  });

  return text;
}

function formatDisplayDate(dateValue) {
  const [year, month, day] = sanitize(dateValue).split("-");
  if (!year || !month || !day) {
    return sanitize(dateValue);
  }

  return `${day}.${month}.${year}`;
}

function createGoogleCalendarLink({ date, time, timezone, firstName, lastName }) {
  const cleanDate = sanitize(date).replaceAll("-", "");
  const cleanTime = sanitize(time).replace(":", "");
  const start = `${cleanDate}T${cleanTime}00`;

  const [hours, minutes] = sanitize(time).split(":").map(Number);
  const endDate = new Date(2000, 0, 1, hours || 0, minutes || 0);
  endDate.setMinutes(endDate.getMinutes() + 30);
  const endTime = `${String(endDate.getHours()).padStart(2, "0")}${String(endDate.getMinutes()).padStart(2, "0")}00`;
  const end = `${cleanDate}T${endTime}`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "RoboMax Outreach Demo",
    details: `Online demo booking for ${firstName} ${lastName}. RoboMax will confirm the meeting link.`,
    location: "Online call",
    dates: `${start}/${end}`,
    ctz: timezone || "UTC",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

app.post("/api/book-demo", async (req, res) => {
  const firstName = sanitize(req.body.firstName);
  const lastName = sanitize(req.body.lastName);
  const email = sanitize(req.body.email);
  const date = sanitize(req.body.date);
  const time = sanitize(req.body.time);
  const timezone = sanitize(req.body.timezone) || "Local timezone";
  const source = sanitize(req.body.source);

  if (!firstName || !lastName || !email || !date || !time) {
    return res.status(400).json({ error: "Please fill in all booking fields." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const transporter = getTransporter();

  if (!transporter) {
    const missing = getMissingEmailConfig();
    return res.status(500).json({
      error: `Email server is not configured. Missing: ${missing.join(", ")}.`,
    });
  }

  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const values = {
    first_name: firstName,
    last_name: lastName,
    email,
    preferred_date: formatDisplayDate(date),
    preferred_time: time,
    timezone,
    submitted_at: submittedAt,
    source,
    owner_email: BOOKING_TO,
    calendar_link: createGoogleCalendarLink({ date, time, timezone, firstName, lastName }),
  };

  const imagePath = path.join(publicDir, "robomax-email-visual.jpeg");
  const attachments = [
    {
      filename: "robomax-outreach-visual.jpeg",
      path: imagePath,
      cid: "robomaxVisual",
    },
  ];

  try {
    const ownerHtml = renderTemplate("email-booking-notification.html", values);
    const ownerText = renderTextTemplate("email-booking-notification.txt", {
      ...values,
      asset_base_url: source ? new URL(source).origin : "",
    });

    const customerHtml = renderTemplate("email-customer-booking-confirmation.html", values);
    const customerText = renderTextTemplate("email-customer-booking-confirmation.txt", values);

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${SMTP_USER}>`,
      to: BOOKING_TO,
      replyTo: email,
      subject: `New RoboMax demo booking - ${firstName} ${lastName}`,
      html: ownerHtml,
      text: ownerText,
      attachments,
    });

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${SMTP_USER}>`,
      to: email,
      bcc: BOOKING_TO,
      replyTo: BOOKING_TO,
      subject: "Your RoboMax Outreach demo booking is received",
      html: customerHtml,
      text: customerText,
      attachments,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("Booking email error:", error);
    return res.status(500).json({
      error: "The booking emails could not be sent. Check SMTP settings.",
    });
  }
});

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`RoboMax booking API running on http://localhost:${PORT}`);
});
