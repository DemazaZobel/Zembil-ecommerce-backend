// src/controllers/DeliveryStaffController.js
import DeliveryStaff from "../models/DeliveryStaff.js";
import DeliveryZone from "../models/DeliveryZone.js";
import bcrypt from "bcrypt";

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

// Create new delivery staff
export const createDeliveryStaff = async (req, res) => {
  try {
    const { name, email, password, role, zoneId } = req.body;
    if (!name || !email || !password || !zoneId)
      return res.status(400).json({ message: "Name, email, password, and zoneId are required" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const staff = await DeliveryStaff.create({
      name,
      email,
      passwordHash: hashedPassword,
      role: role || "delivery",
      zoneId,
    });

    res.status(201).json(staff);
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
    if (password) staff.passwordHash = await bcrypt.hash(password, 10);

    await staff.update({
      name: name || staff.name,
      email: email || staff.email,
      role: role || staff.role,
      zoneId: zoneId || staff.zoneId,
    });

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
    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error deleting staff" });
  }
};
