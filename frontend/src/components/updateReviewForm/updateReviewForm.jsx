import React, { useState, useEffect } from 'react';

// MUI Components
import CloseIcon from '@mui/icons-material/Close';

// API
import { updateReview } from '../../../api/reviewApi';

// Toast
import { ToastContainer, toast } from "react-toastify";

export default function UpdateReview({ setShowUpdateReview, selectedReview }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');

  // Ensure the effect only runs once when selectedReview is passed.
  useEffect(() => {
    if (selectedReview) {
      setRating(selectedReview.rating);
      setReviewText(selectedReview.reviewText);
      setBookTitle(selectedReview.bookTitle);
      setAuthor(selectedReview.author);
    }
  }, [selectedReview]); // Dependency array ensures it runs only when selectedReview changes

  //handle close click function
  const handleCloselick = () => {
    setShowUpdateReview(false);
  };

  //handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        bookTitle,
        author,
        rating,
        reviewText,
      }
      //call updateReview function in api handler
      await updateReview(body, selectedReview._id);
      toast.success("collector status updated successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "darck",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error updating collector status:", error.message);
      toast.error("Failed to update collector status.");
    }
  };

  {/* Update Review Form */}
  return (
    <>
    <div className="fixed top-0 left-0 bg-secondary/90 h-[100vh] w-full z-50 flex justify-center items-center text-white">
      <div className="bg-black border-2 border-primary rounded-lg py-5 px-9 w-[40%]">
        
        {/* close icon */}
        <CloseIcon className="float-right" onClick={handleCloselick} />
        <h1 className="text-white text-2xl text-center font-bold mt-8">Update your Review</h1>
        
        {/* update reviews form */}
        <form className="flex flex-col space-y-5 w-full px-6 mt-5" onSubmit={handleSubmit}>
          <label className="text-gray-500 text-base">Rating out of 5</label>
          <div className="flex justify-between text-gray-500">
           
            {/* radio buttons for rating */}
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value}>
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  checked={rating === value}
                  className="mr-2"
                  onChange={(e) => setRating(Number(e.target.value))}
                />
                <span>{value}</span>
              </div>
            ))}
          </div>

          {/* review text area */}
          <textarea
            placeholder="Review"
            value={reviewText}
            className="border-2 border-primary rounded-lg px-2 py-1 text-black"
            rows={5}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button type="submit" className="bg-primary text-white py-2 rounded-lg mt-6">
            Submit
          </button>
        </form>
      </div>
    </div>
      {/* <ToastContainer /> */}
    </>
  );
}
