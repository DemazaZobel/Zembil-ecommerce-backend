// src/controllers/DeliveryStaffController.js
import DeliveryStaff from "../models/DeliveryStaff.js";
import DeliveryZone from "../models/DeliveryZone.js";
import bcrypt from "bcrypt";
// Create new delivery staff
import nodemailer from "nodemailer";

// Get all delivery staff
export const getAllDeliveryStaff = async (req, res) => {
  try {
    const staff = await DeliveryStaff.findAll({
      include: { model: DeliveryZone, as: "zone", attributes: ["id", "name", "areas"] },
    });
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching delivery staff" });
  }
};

// Get staff by ID
export const getDeliveryStaffById = async (req, res) => {
  try {
    const staff = await DeliveryStaff.findByPk(req.params.id, {
      include: { model: DeliveryZone, as: "zone", attributes: ["id", "name", "areas"] },
    });
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching staff" });
  }
};



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // use App Password for Gmail
  },
});

export const createDeliveryStaff = async (req, res) => {
  try {
    const { name, email, zoneId } = req.body;

    if (!name || !email || !zoneId)
      return res.status(400).json({ message: "Name, email, and zoneId are required" });

    // Generate random password
    const password = Math.random().toString(36).slice(-8); // 8-char password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create staff
    const staff = await DeliveryStaff.create({
      name,
      email,
      passwordHash: hashedPassword,
      role: "delivery",
      zoneId,
    });

    // Send email with credentials
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Delivery Dashboard Credentials",
      text: `Hi ${name},\n\nYour account has been created.\nEmail: ${email}\nPassword: ${password}\n\nPlease login and change your password.\n\nBest regards,\nZembile Team`,
    });

    res.status(201).json({ message: "Staff created and credentials sent via email", staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error creating staff" });
  }
};


// Update delivery staff
export const updateDeliveryStaff = async (req, res) => {
  try {
    const staff = await DeliveryStaff.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    const { name, email, password, role, zoneId } = req.body;
    let updateData = {
      name: name || staff.name,
      email: email || staff.email,
      role: role || staff.role,
      zoneId: zoneId || staff.zoneId,
    };

    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }

    await staff.update(updateData);

    res.json({ message: "Staff updated successfully", staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error updating staff" });
  }
};

// Delete delivery staff
export const deleteDeliveryStaff = async (req, res) => {
  try {
    const staff = await DeliveryStaff.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    await staff.destroy();
    res.json({ message: "Staff deleted successfully", id: staff.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error deleting staff" });
  }
};

import jwt from "jsonwebtoken";

// Staff login
export const loginDeliveryStaff = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    // Find staff by email
    const staff = await DeliveryStaff.findOne({ where: { email } });
    if (!staff) return res.status(404).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, staff.passwordHash);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { id: staff.id, role: staff.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      staff: {
        id: staff.id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        zoneId: staff.zoneId,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error logging in staff" });
  }
};

