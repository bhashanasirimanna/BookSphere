import express from "express";
import {
  createReview,
  getReviewsByBook,
  getReviewById,
  updateReview,
  deleteReview,
  getGroupedReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

// Route to create a new review
router.route("/").post(createReview);

// Route to get all reviews for a book
router.route("/book_review/:title").get(getReviewsByBook);

// Route to get all reviews grouped by book
router.route("/books").get(getGroupedReviews);

// Route to get, update, or delete a review by ID
router.route("/:id").get(getReviewById).put(updateReview).delete(deleteReview);

export default router;
