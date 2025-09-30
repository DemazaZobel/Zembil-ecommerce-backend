import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or your SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // use app password for Gmail
  },
});

// POST /api/delivery/send-credentials
router.post("/send-credentials", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing staff info" });
  }

  try {
    // Send email to staff
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Delivery Staff Account",
      text: `Hi ${name},\n\nYour account has been created.\nEmail: ${email}\nPassword: ${password}\n\nPlease login and change your password immediately.\n\nThanks!`,
    });

    res.json({ message: `Credentials sent to ${email}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
