import Review from "../models/Review.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

// Create a review
export const createReview = async (data) => {
  const review = await Review.create(data);
  return review;
};

// Get all reviews
export const getAllReviews = async () => {
  return await Review.findAll({
    include: ["user", "product"]
  });
};

// Get review by ID
export const getReviewById = async (id) => {
  return await Review.findByPk(id, {
    include: ["user", "product"]
  });
};

// Update a review
export const updateReview = async (id, data) => {
  const review = await Review.findByPk(id);
  if (!review) throw { status: 404, message: "Review not found" };
  return await review.update(data);
};

// Delete a review
export const deleteReview = async (id) => {
  const review = await Review.findByPk(id);
  if (!review) throw { status: 404, message: "Review not found" };
  return await review.destroy();
};

// Get all reviews for a specific product
export const getReviewsByProduct = async (productId) => {
  return await Review.findAll({
    where: { productId },
    include: ["user"]
  });
};
