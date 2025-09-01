import Size from "../models/Size.js";

export const getAllSizes = async (req, res, next) => {
  try {
    const sizes = await Size.findAll();
    res.json(sizes);
  } catch (error) {
    next(error);
  }
};

export const getSizeById = async (req, res, next) => {
  try {
    const size = await Size.findByPk(req.params.id);
    if (!size) return res.status(404).json({ message: "Size not found" });
    res.json(size);
  } catch (error) {
    next(error);
  }
};

export const createSize = async (req, res, next) => {
  try {
    const size = await Size.create(req.body);
    res.status(201).json(size);
  } catch (error) {
    next(error);
  }
};

export const updateSize = async (req, res, next) => {
  try {
    const size = await Size.findByPk(req.params.id);
    if (!size) return res.status(404).json({ message: "Size not found" });
    await size.update(req.body);
    res.json({ message: "Size updated", size });
  } catch (error) {
    next(error);
  }
};

export const deleteSize = async (req, res, next) => {
  try {
    const size = await Size.findByPk(req.params.id);
    if (!size) return res.status(404).json({ message: "Size not found" });
    await size.destroy();
    res.json({ message: "Size deleted" });
  } catch (error) {
    next(error);
  }
};
