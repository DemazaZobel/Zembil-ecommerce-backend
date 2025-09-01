import DeliveryZone from "../models/DeliveryZone.js";
import DeliveryStaff from "../models/DeliveryStaff.js";

export const getAllDeliveryZones = async (req, res, next) => {
  try {
    const zones = await DeliveryZone.findAll({
      include: { model: DeliveryStaff, as: "staff" },
    });
    res.json(zones);
  } catch (error) {
    next(error);
  }
};

export const getDeliveryZoneById = async (req, res, next) => {
  try {
    const zone = await DeliveryZone.findByPk(req.params.id, {
      include: { model: DeliveryStaff, as: "staff" },
    });
    if (!zone) return res.status(404).json({ message: "Zone not found" });
    res.json(zone);
  } catch (error) {
    next(error);
  }
};

export const createDeliveryZone = async (req, res, next) => {
  try {
    const zone = await DeliveryZone.create(req.body);
    res.status(201).json(zone);
  } catch (error) {
    next(error);
  }
};

export const updateDeliveryZone = async (req, res, next) => {
  try {
    const zone = await DeliveryZone.findByPk(req.params.id);
    if (!zone) return res.status(404).json({ message: "Zone not found" });
    await zone.update(req.body);
    res.json({ message: "Zone updated", zone });
  } catch (error) {
    next(error);
  }
};

export const deleteDeliveryZone = async (req, res, next) => {
  try {
    const zone = await DeliveryZone.findByPk(req.params.id);
    if (!zone) return res.status(404).json({ message: "Zone not found" });
    await zone.destroy();
    res.json({ message: "Zone deleted" });
  } catch (error) {
    next(error);
  }
};
