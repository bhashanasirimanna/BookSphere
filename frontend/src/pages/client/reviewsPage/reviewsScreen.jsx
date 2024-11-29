import React, { useState, useEffect } from "react";

// MUI Icons
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

// API
import { useLocation, useNavigate } from "react-router-dom";
import { deleteReview, getAllBookReviews } from "../../../../api/reviewApi";

//components
import CreateReview from "../../../components/createReviewFrom/createReview";
import UpdateReview from "../../../components/updateReviewForm/updateReviewForm";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";
import RatingStarComponent from "../../../components/ratingStarComponent/ratingStarComponent";

// Toast
import { ToastContainer, toast } from "react-toastify";

//images
import Legend from "../../../assets/browseBooks/legend.jpeg";
import LittleWomen from "../../../assets/browseBooks/littleWomen.jpeg";
import TheHungerGames from "../../../assets/browseBooks/theHungerGames.jpeg";
import Divergent from "../../../assets/browseBooks/divergent.jpeg";
import TheBookThife from "../../../assets/browseBooks/theBookThief.jpg";

export default function reviewsScreen() {
  const location = useLocation();

  //states
  const [bookTitle, setBookTitle] = useState(location.state.book.bookTitle);
  const [author, setAuthor] = useState(location.state.book.author);
  const [averageRating, setAverageRating] = useState(location.state.book.averageRating);
  const [reviews, setReviews] = useState([]);

  //states for dialog
  const [showCreateReview, setShowCreateReview] = useState(false);
  const [showUpdateReview, setShowUpdateReview] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [open, setOpen] = useState(false);

  //states for filter
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sortFilter, setSortFilter] = useState("all");
  const [filteredReviews, setFilteredReviews] = useState([]);

  //fetchReviewsOfBook function to fetch reviews of a book
  const fetchReviewsOfBook = async () => {
    try {
      // call getAllBookReviews function from reviewApi
      const res = await getAllBookReviews(bookTitle);
      console.log(res);
      setReviews(res);
      setFilteredReviews(res);
    } catch (error) {
      alert(error.message);
      console.error("Error fetching collectors: ", error.message);
    }
  };

  // useEffect hook to fetch reviews of a book
  useEffect(() => {
    fetchReviewsOfBook();
  }, [bookTitle]);

  //handleCreateClick function to show create review form
  const handleCreateClick = () => {
    setShowCreateReview(true);
  };

  //handleUpdateClick function to show update review form
  const handleUpdateClick = (review) => {
    setSelectedReview(review);
    setShowUpdateReview(true);
  };

  //handleClickOpen function to show dialog
  const handleClickOpen = (id) => {
    setSelectedReviewId(id);
    setOpen(true);
  };

  //handleClose function to close dialog
  const handleClose = () => {
    setOpen(false);
  };

  //handleDeleteReview function to delete review  of a book
  const handleDeleteReview = async () => {
    if (selectedReviewId) {
      try {
        // call deleteReview function from reviewApi
        await deleteReview(selectedReviewId);
        setReviews((currentReview) =>
          currentReview.filter((review) => review._id !== selectedReviewId)
        );
        handleClose();
        toast.success("Review Deleted Successfully!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  // getBookImage function to get book image based on book name
  function getBookImage(name) {
    switch (name) {
      case "Legend":
        return Legend;
      case "Little Women":
        return LittleWomen;
      case "Divergent":
        return Divergent;
      case "The Hunger Games":
        return TheHungerGames;
      default:
        return TheBookThife;
    }
  }

  //filterReviews function to filter reviews based on rating and sort
  const filterReviews = () => {
    let filterReviews = reviews;
    if (ratingFilter !== "all") {
      filterReviews = filterReviews.filter(
        (review) => review.rating === parseInt(ratingFilter)
      );
    }
    if (sortFilter === "newest") {
      filterReviews.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else if (sortFilter === "oldest") {
      filterReviews.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    }
    setFilteredReviews(filterReviews);
  };

// useEffect hook to filter reviews
  useEffect(() => {
    filterReviews();
  }, [ratingFilter, sortFilter]);

  return (
    <>
    // Header component
      <Header />

      <div className="  bg-secondary pt-[8rem]">
        <div className=" w-[80%] mx-auto mt-10 flex justify-between">
          <img
            src={getBookImage(bookTitle)}
            className="object-cover rounded-lg w-[300px]"
            alt={bookTitle}
          />

          <div className=" w-[70%] relative">
            <div className=" absolute top-0 right-0">
              <div className=" pt-3">
                {/* rating star component */}
                <RatingStarComponent rating={averageRating} size='large'/>
              </div>
              <p className=" text-gray-500 text-base text-right">
                {reviews.length} Reviews
              </p>
              <p
                className=" text-primary font-semibold border-2 border-primary rounded-lg mt-3 py-2 text-center cursor-pointer"
                onClick={() => handleCreateClick()}
              >
                Add New Review
              </p>
            </div>
            <h1 className=" text-5xl text-primary font-bold ">{bookTitle}</h1>
            <h1 className=" text-gray-500 text-xl font-semibold ">
              Author: {author}
            </h1>
            <h1 className=" text-white text-lg font-semibold mt-14">About:</h1>
            <p className=" text-gray-500 text-sm font-semibold ">
              Divergent is a series of young adult science fiction adventure
              novels by American novelist Veronica Roth set in a
              post-apocalyptic dystopian Chicago.The trilogy consists of
              Divergent (2011), Insurgent (2012), and Allegiant (2013). A
              related book, Four (2014), presents a series of short stories told
              from the perspective of one of the trilogy's characters, the male
              love interest Tobias. A later short story, We Can Be Mended
              (2018), serves as an epilogue five years after the events of the
              trilogy, again from Tobias/Four's perspective.
              <br />
              <br />
              The trilogy is set in the future in a dystopian society that is
              divided into five factions. The trilogy's society defines its
              members by their social and personality affiliations, with the
              five different factions removing the threat of anyone exercising
              independent will and threatening the population's safety. Beatrice
              Prior, who later changes her name to Tris, is born into Abnegation
              but transfers into Dauntless; she must figure out her life as a
              Divergent, conceal her true nature, and live with the danger of
              being killed if her true nature is discovered by the Erudite and
              Dauntless leaders.
            </p>
          </div>
        </div>

        <div className=" w-[80%] mx-auto relative">
          <h1 className=" text-white text-2xl font-bold mt-10 mx-auto">
            {reviews.length} Reviews
          </h1>
          <div className=" absolute top-0 right-0">
            {/* filter reviews according to rating and sort */}
            <h1 className=" text-gray-500 font-semibold inline-block pr-4">
              Filter retaings
            </h1>
            <select
              onChange={(e) => setRatingFilter(e.target.value)}
              className=" border-2 border-primary rounded-lg bg-transparent text-primary py-2 px-4 font-semibold mr-4"
            >
              <option value="all">All Ratings</option>
              <option value={5}>5 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={2}>2 Stars</option>
              <option value={1}>1 Stars</option>
            </select>
            <select
              onChange={(e) => setSortFilter(e.target.value)}
              className=" border-2 border-primary rounded-lg bg-transparent text-primary py-2 px-4 font-semibold"
            >
              <option value="all">All Reviews</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        <div className=" w-[80%] mx-auto mt-5 grid grid-cols-1 md:grid-cols-4 gap-7 pb-6">
          
          {/* map reviews array */}
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => {
      
              return (
                <div
                  key={review._id}
                  className="group text-white p-4 bg-gray-800 rounded-xl relative"
                >
                  <div className="group-hover:opacity-100 opacity-0 absolute bottom-2 right-2 transition-all duration-1000">
                    {/* edit and delete icons */}
                    <EditIcon
                      className="mr-2 cursor-pointer"
                      style={{ fontSize: "20px" }}
                      onClick={() => handleUpdateClick(review)}
                    />
                    <DeleteIcon
                      className="cursor-pointer"
                      style={{ fontSize: "20px" }}
                      onClick={() => handleClickOpen(review._id)}
                    />
                  </div>
                  <h4 className="text-base font-semibold">
                    Induwara Sirimanna
                  </h4>
                  <p className="text-sm text-gray-500 mt-3n pb-6 pt-2">
                    {review.reviewText}
                  </p>
                  <div className="absolute bottom-2 left-2 flex"><RatingStarComponent rating={review.rating} size='medium'/></div>
                  
                </div>
              );
            })
          ) : (
            <p className=" text-gray-500 font-semibold">No reviews available</p>
          )}
        </div>

        {/* dialog component */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The selected schedule will be deleted and cannot beretrieved.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDeleteReview} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* create review component */}
        {showCreateReview && (
          <CreateReview
            setShowCreateReview={setShowCreateReview}
            bookTitle={bookTitle}
            author={author}
          />
        )}

        {/* update review component */}
        {showUpdateReview && (
          <UpdateReview
            setShowUpdateReview={setShowUpdateReview}
            selectedReview={selectedReview}
          />
        )}
      </div>

      {/* footer component */}
      <Footer />
    </>
  );
}
