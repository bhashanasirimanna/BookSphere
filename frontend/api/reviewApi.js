import ApiHelper from "../helpers/apiHelper";

const createReview = async (review) => {
  try {
    const createdReview = await new ApiHelper().post("review", review);
    return createdReview;
  } catch (error) {
    console.error("Error creating review:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const getAllBooks = async () => {
  try {
    const books = await new ApiHelper().get("review/books", {});
    return books;
  } catch (error) {
    console.error("Error fetching books:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const getAllBookReviews = async (title) => {
  try {
    const reviews = await new ApiHelper().get(`review/book_review/${title}`, {});
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const getReviewById = async (id) => {
  try {
    const review = await new ApiHelper().get(`review/${id}`, {});
    return review;
  } catch (error) {
    console.error("Error fetching review:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const updateReview = async (review, id) => {
  try {
    const updatedReview = await new ApiHelper().put(`review/${id}`, review);
    return updatedReview;
  } catch (error) {
    console.error("Error updating review:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const deleteReview = async (id) => {
  try {
    const deletedReview = await new ApiHelper().delete(`review/${id}`);
    return deletedReview;
  } catch (error) {
    console.error("Error deleting review:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

export { createReview, getAllBooks, getReviewById, updateReview, deleteReview, getAllBookReviews };    
