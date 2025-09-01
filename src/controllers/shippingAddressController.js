import ShippingAddress from "../models/ShippingAddress.js";
import User from "../models/User.js";

export const getAllShippingAddresses = async (req, res, next) => {
  try {
    const addresses = await ShippingAddress.findAll({
      include: { model: User, as: "user", attributes: ["id", "name", "email"] },
    });
    res.json(addresses);
  } catch (error) {
    next(error);
  }
};

export const getShippingAddressById = async (req, res, next) => {
  try {
    const address = await ShippingAddress.findByPk(req.params.id, {
      include: { model: User, as: "user", attributes: ["id", "name", "email"] },
    });
    if (!address) return res.status(404).json({ message: "Address not found" });
    res.json(address);
  } catch (error) {
    next(error);
  }
};

export const createShippingAddress = async (req, res, next) => {
  try {
    const address = await ShippingAddress.create(req.body);
    res.status(201).json(address);
  } catch (error) {
    next(error);
  }
};

export const updateShippingAddress = async (req, res, next) => {
  try {
    const address = await ShippingAddress.findByPk(req.params.id);
    if (!address) return res.status(404).json({ message: "Address not found" });
    await address.update(req.body);
    res.json({ message: "Address updated", address });
  } catch (error) {
    next(error);
  }
};

export const deleteShippingAddress = async (req, res, next) => {
  try {
    const address = await ShippingAddress.findByPk(req.params.id);
    if (!address) return res.status(404).json({ message: "Address not found" });
    await address.destroy();
    res.json({ message: "Address deleted" });
  } catch (error) {
    next(error);
  }
};
