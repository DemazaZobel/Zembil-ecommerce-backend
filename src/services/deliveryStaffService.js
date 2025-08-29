import DeliveryStaff from "../models/DeliveryStaff.js";
import DeliveryZone from "../models/DeliveryZone.js";
import Order from "../models/Order.js";

// Create a new delivery staff
export const createDeliveryStaff = async (data) => {
  const staff = await DeliveryStaff.create(data);
  return staff;
};

// Get all delivery staff
export const getAllDeliveryStaff = async () => {
  return await DeliveryStaff.findAll({
    include: ["zone", "assignedOrders"]
  });
};

// Get delivery staff by ID
export const getDeliveryStaffById = async (id) => {
  return await DeliveryStaff.findByPk(id, {
    include: ["zone", "assignedOrders"]
  });
};

// Update delivery staff info
export const updateDeliveryStaff = async (id, data) => {
  const staff = await DeliveryStaff.findByPk(id);
  if (!staff) throw { status: 404, message: "Delivery staff not found" };
  return await staff.update(data);
};

// Delete delivery staff
export const deleteDeliveryStaff = async (id) => {
  const staff = await DeliveryStaff.findByPk(id);
  if (!staff) throw { status: 404, message: "Delivery staff not found" };
  return await staff.destroy();
};

// Get all orders assigned to a staff
export const getAssignedOrders = async (staffId) => {
  const staff = await DeliveryStaff.findByPk(staffId);
  if (!staff) throw { status: 404, message: "Delivery staff not found" };
  return await Order.findAll({ where: { assignedTo: staffId } });
};
