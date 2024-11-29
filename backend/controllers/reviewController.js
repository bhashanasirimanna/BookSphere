import Review from "../models/reviewModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

/**
 * @route   POST /review/
 * @desc    Create a new review
 * @access  Private
 * @param   {String} bookTitle - The title of the book (required)
 * @param   {String} author - The author of the book (required)
 * @param   {Number} rating - 1 to 5 rating for the book (required)
 * @param   {String} reviewText - the review text for the book (required)
 * @returns {Object} - A JSON object containing the newly created review
 */
const createReview = asyncHandler(async (req, res) => {
  const { bookTitle, author, rating, reviewText } = req.body;

  if (!bookTitle || !author || !rating || !reviewText || rating < 1 || rating > 5) {
    res.status(400);
    throw new Error("Please fill all required fields.");
  }

  const review = new Review({
    bookTitle,
    author,
    rating,
    reviewText,
  });

  const createdReview = await review.save();
  res.status(201).json(createdReview);
});

/**
 * @route   GET /review/book-review/:title
 * @desc    Get all schedules assingd to the truck
 * @access  Private (Authenticated Truck)
 * @returns {Array} - A list of schedules assingd to the truck
 */
const getReviewsByBook = asyncHandler(async (req, res) => {
    try {
      const reviews = await Review.find({ bookTitle: req.params.title });
      if (!reviews || reviews.length === 0) {
        return res.status(404).json({ message: "No reviews found for this book." });
      }
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  });

/**
 * @route   GET /review/:id
 * @desc    Get a single review by ID
 * @access  Private
 * @returns {Object} - A single review object
 */
const getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (review) {
    res.json(review);
  } else {
    res.status(404);
    throw new Error("Review not found");
  }
});

/**
 * @route   PUT /review/:id
 * @desc    Update a review status
 * @access  Private/Admin
 * @param   {String} bookTitle - The title of the book (required)
 * @param   {String} author - The author of the book (required)
 * @param   {Number} rating - 1 to 5 rating for the book (required)
 * @param   {String} reviewText - the review text for the book (required)
 * @returns {Object} - The updated review object
 */
const updateReview = asyncHandler(async (req, res) => {
  const {
    bookTitle,
    author,
    rating,
    reviewText,
  } = req.body;

  const review = await Review.findById(req.params.id);

  if (review) {
    review.bookTitle = bookTitle || review.bookTitle;
    review.author = author || review.author;
    review.rating = rating || review.rating;
    review.reviewText = reviewText || review.reviewText;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } else {
    res.status(404);
    throw new Error("Review not found");
  }
});

/**
 * @route   DELETE /reviews/:id
 * @desc    Delete a review
 * @access  Private/Admin
 * @returns {Object} - A JSON object confirming deletion
 */
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (review) {
    res.status(200);
    res.json({ message: "Review removed successfully!" });
  } else {
    res.status(404);
    throw new Error("Review not found!");
  }
});

/**
 * @route   GET /reviews/books/:id
 * @desc    Get all reviews grouped by book
 * @access  Private/Admin
 * @returns {Object} - A JSON object containing grouped reviews
 */
const getGroupedReviews = async (req, res) => {
  try {
    const reviewsGrouped = await Review.aggregate([
      {
        $group: {
          _id: "$bookTitle", // Grouping by bookTitle
          author: { $first: "$author" }, // Get the author of the first review in each group
          reviews: { $push: { rating: "$rating", reviewText: "$reviewText" } }, // Push all reviews for the book
          averageRating: { $avg: "$rating" }, // Calculate the average rating for the book
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field
          bookTitle: "$_id", // Rename _id to bookTitle
          author: 1, // Include author
          reviews: 1, // Include the reviews array
          averageRating: { $round: ["$averageRating", 1] }, // Round the average rating to 1 decimal place
        },
      },
    ]);

    res.json(reviewsGrouped);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving grouped reviews", error });
  }
};

export {
    createReview,
    getReviewsByBook,
    getReviewById,
    updateReview,
    deleteReview,
    getGroupedReviews
};
