import ShippingAddress from "../models/ShippingAddress.js";

// Create new address
export const createAddress = async (req, res) => {
  try {
    const address = await ShippingAddress.create(req.body);
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all addresses
export const getAddresses = async (req, res) => {
  try {
    const addresses = await ShippingAddress.findAll();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single address by ID
export const getAddressById = async (req, res) => {
  try {
    const address = await ShippingAddress.findByPk(req.params.id);
    if (!address) return res.status(404).json({ message: "Address not found" });
    res.json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update address
export const updateAddress = async (req, res) => {
  try {
    const address = await ShippingAddress.findByPk(req.params.id);
    if (!address) return res.status(404).json({ message: "Address not found" });

    await address.update(req.body);
    res.json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete address
export const deleteAddress = async (req, res) => {
  try {
    const address = await ShippingAddress.findByPk(req.params.id);
    if (!address) return res.status(404).json({ message: "Address not found" });

    await address.destroy();
    res.json({ message: "Address deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
