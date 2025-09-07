// import DeliveryZone from "../models/DeliveryZone.js";
// import DeliveryStaff from "../models/DeliveryStaff.js";

// export const getAllDeliveryZones = async (req, res, next) => {
//   try {
//     const zones = await DeliveryZone.findAll({
//       include: { model: DeliveryStaff, as: "staff" },
//     });
//     res.json(zones);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getDeliveryZoneById = async (req, res, next) => {
//   try {
//     const zone = await DeliveryZone.findByPk(req.params.id, {
//       include: { model: DeliveryStaff, as: "staff" },
//     });
//     if (!zone) return res.status(404).json({ message: "Zone not found" });
//     res.json(zone);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createDeliveryZone = async (req, res, next) => {
//   try {
//     const zone = await DeliveryZone.create(req.body);
//     res.status(201).json(zone);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateDeliveryZone = async (req, res, next) => {
//   try {
//     const zone = await DeliveryZone.findByPk(req.params.id);
//     if (!zone) return res.status(404).json({ message: "Zone not found" });
//     await zone.update(req.body);
//     res.json({ message: "Zone updated", zone });
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteDeliveryZone = async (req, res, next) => {
//   try {
//     const zone = await DeliveryZone.findByPk(req.params.id);
//     if (!zone) return res.status(404).json({ message: "Zone not found" });
//     await zone.destroy();
//     res.json({ message: "Zone deleted" });
//   } catch (error) {
//     next(error);
//   }
// };
// src/controllers/DeliveryZoneController.js
import DeliveryZone from "../models/DeliveryZone.js";
import DeliveryStaff from "../models/DeliveryStaff.js";

// Get all delivery zones
export const getAllDeliveryZones = async (req, res, next) => {
  try {
    const zones = await DeliveryZone.findAll({
      include: { model: DeliveryStaff, as: "staff" },
    });
    res.json(zones);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

// Get delivery zone by ID
export const getDeliveryZoneById = async (req, res, next) => {
  try {
    const zone = await DeliveryZone.findByPk(req.params.id, {
      include: { model: DeliveryStaff, as: "staff" },
    });
    if (!zone) return res.status(404).json({ message: "Zone not found" });
    res.json(zone);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

// Create delivery zone
export const createDeliveryZone = async (req, res, next) => {
  try {
    const { name, areas } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const zone = await DeliveryZone.create({ name, areas });
    res.status(201).json(zone);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

// Update delivery zone
export const updateDeliveryZone = async (req, res, next) => {
  try {
    const zone = await DeliveryZone.findByPk(req.params.id);
    if (!zone) return res.status(404).json({ message: "Zone not found" });

    const { name, areas } = req.body;
    await zone.update({ name: name || zone.name, areas: areas || zone.areas });

    res.json({ message: "Zone updated", zone });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

// Delete delivery zone
export const deleteDeliveryZone = async (req, res, next) => {
  try {
    const zone = await DeliveryZone.findByPk(req.params.id);
    if (!zone) return res.status(404).json({ message: "Zone not found" });

    await zone.destroy();
    res.json({ message: "Zone deleted" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
