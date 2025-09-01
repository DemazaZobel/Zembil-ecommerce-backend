import Review from "../models/Review.js";

// Create a review (protected route)
export const createReview = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!req.user || !req.user.id)
      return res.status(401).json({ message: "Unauthorized" });

    const existingReview = await Review.findOne({
      where: { userId: req.user.id, productId },
    });
    if (existingReview)
      return res.status(400).json({ message: "You already reviewed this product" });

    const review = await Review.create({
      userId: req.user.id,
      productId,
      rating,
      comment,
    });

    res.status(201).json({ message: "Review added", review });
  } catch (error) {
    next(error);
  }
};

// Get reviews by product (public route)
export const getReviewsByProduct = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: { productId: req.params.productId },
    });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

// Update review (protected)
export const updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.userId !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await review.update(req.body);
    res.json({ message: "Review updated", review });
  } catch (error) {
    next(error);
  }
};

// Delete review (protected)
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.userId !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await review.destroy();
    res.json({ message: "Review deleted" });
  } catch (error) {
    next(error);
  }
};
