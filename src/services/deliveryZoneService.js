import DeliveryZone from "../models/DeliveryZone.js";
import DeliveryStaff from "../models/DeliveryStaff.js";

// Create a new delivery zone
export const createDeliveryZone = async (data) => {
  const zone = await DeliveryZone.create(data);
  return zone;
};

// Get all delivery zones
export const getAllDeliveryZones = async () => {
  return await DeliveryZone.findAll({
    include: ["staff"] // include all staff assigned to areas in this zone
  });
};

// Get delivery zone by ID
export const getDeliveryZoneById = async (id) => {
  return await DeliveryZone.findByPk(id, {
    include: ["staff"]
  });
};

// Update delivery zone info
export const updateDeliveryZone = async (id, data) => {
  const zone = await DeliveryZone.findByPk(id);
  if (!zone) throw { status: 404, message: "Delivery zone not found" };
  return await zone.update(data);
};

// Delete delivery zone
export const deleteDeliveryZone = async (id) => {
  const zone = await DeliveryZone.findByPk(id);
  if (!zone) throw { status: 404, message: "Delivery zone not found" };
  return await zone.destroy();
};

// Get staff by specific area in a zone
export const getStaffByArea = async (zoneId, area) => {
  const staff = await DeliveryStaff.findOne({
    where: { zoneId, area }
  });
  if (!staff) throw { status: 404, message: "No staff assigned to this area" };
  return staff;
};
