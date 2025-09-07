import ShippingAddress from "../models/ShippingAddress.js";
import User from "../models/User.js";

// Create a new shipping address
export const createShippingAddress = async (data) => {
  const address = await ShippingAddress.create(data);
  return address;
};

// Get all addresses
export const getAllShippingAddresses = async () => {
  return await ShippingAddress.findAll({
    include: ["user"]
  });
};

// Get address by ID
export const getShippingAddressById = async (id) => {
  return await ShippingAddress.findByPk(id, {
    include: ["user"]
  });
};

// Update an address
export const updateShippingAddress = async (id, data) => {
  const address = await ShippingAddress.findByPk(id);
  if (!address) throw { status: 404, message: "Shipping address not found" };
  return await address.update(data);
};

// Delete an address
export const deleteShippingAddress = async (id) => {
  const address = await ShippingAddress.findByPk(id);
  if (!address) throw { status: 404, message: "Shipping address not found" };
  return await address.destroy();
};

// Get all addresses for a user
export const getAddressesByUser = async (userId) => {
  return await ShippingAddress.findAll({
    where: { userId }
  });
};
