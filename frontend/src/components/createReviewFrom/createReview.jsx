import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { createReview } from "../../../api/reviewApi";
import { ToastContainer, toast } from "react-toastify";

export default function CreateReview({
  setShowCreateReview,
  bookTitle,
  author,
}) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  //handle close click function
  const handleCloselick = () => {
    setShowCreateReview(false);
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
      };
      //call createReview function in api handler
      await createReview(body);
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

  return (
    <div className=" fixed top-0 left-0 bg-secondary/90 h-[100vh] w-full z-50 flex justify-center items-center text-white">
      <div className=" bg-black border-2 border-primary rounded-lg py-5 px-9 w-[40%]">
        {/* Close icon */}
        <CloseIcon className=" float-right" onClick={() => handleCloselick()} />
        <h1 className=" text-white text-2xl text-center font-bold mt-8">
          Add your Review
        </h1>

        {/* create review form */}
        <form
          className=" flex flex-col space-y-5 w-full px-6 mt-5"
          onSubmit={handleSubmit}
        >
          <label className=" text-gray-500 text-base">Rating out of 5</label>

          {/* radio buttons for rating */}
          <div className=" flex justify-between text-gray-500">
            <div>
              <input
                type="radio"
                name="rating"
                value="1"
                className="mr-2"
                onChange={(e) => setRating(Number(e.target.value))}
              />
              <span>1</span>
            </div>
            <div>
              <input
                type="radio"
                name="rating"
                value="2"
                className="mr-2"
                onChange={(e) => setRating(Number(e.target.value))}
              />
              <span>2</span>
            </div>
            <div>
              <input
                type="radio"
                name="rating"
                value="3"
                className="mr-2"
                onChange={(e) => setRating(Number(e.target.value))}
              />
              <span>3</span>
            </div>
            <div>
              <input
                type="radio"
                name="rating"
                value="4"
                className="mr-2"
                onChange={(e) => setRating(Number(e.target.value))}
              />
              <span>4</span>
            </div>
            <div>
              <input
                type="radio"
                name="rating"
                value="5"
                className="mr-2"
                onChange={(e) => setRating(Number(e.target.value))}
              />
              <span>5</span>
            </div>
          </div>

          {/* textarea for review */}
          <textarea
            placeholder="Review"
            value={reviewText}
            className=" border-2 border-primary rounded-lg px-2 py-1 text-black"
            rows={5}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button className=" bg-primary text-white py-2 rounded-lg mt-6">
            Submit
          </button>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}
