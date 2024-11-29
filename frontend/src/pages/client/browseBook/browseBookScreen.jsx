import React, { useEffect, useState } from "react";

// MUI Icons
import StarIcon from "@mui/icons-material/Star";

// API
import { getAllBooks } from "../../../../api/reviewApi";
import { useNavigate } from "react-router-dom";

//images
import Legend from "../../../assets/browseBooks/legend.jpeg";
import LittleWomen from "../../../assets/browseBooks/littleWomen.jpeg";
import TheHungerGames from "../../../assets/browseBooks/theHungerGames.jpeg";
import Divergent from "../../../assets/browseBooks/divergent.jpeg";
import TheBookThife from "../../../assets/browseBooks/theBookThief.jpg";

//components
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";

export default function browseBookScreen() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // fetchAllBooks function to fetch all books
  const fetchAllBooks = async () => {
    try {
      // call getAllBooks function from reviewApi
      const res = await getAllBooks();
      console.log(res);
      setBooks(res);
    } catch (error) {
      alert(error.message);
      console.error("Error fetching collectors: ", error.message);
    }
  };

  // useEffect hook to fetch all books
  useEffect(() => {
    fetchAllBooks();
  }, []);

  // handleEditClick function to navigate to book reviews page
  const handleEditClick = (book) => {
    navigate("/book-reviews", { state: { book } });
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

  return (
    <>
      {/* header component */}
      <Header />
      <div className=" bg-secondary pt-[8rem]">
        <h1 className=" text-primary text-sm text-center font-semibold">
          Browse Books
        </h1>
        <h1 className=" text-white text-5xl text-center font-bold">
          Top Rated Books
        </h1>
        <div className=" w-[80%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-7 mt-10 rounded-lg pb-10">
          {/* map books array */}
          {books.length > 0 ? (
            books.map((book) => (
              <div className="rounded-md relative" key={book.id}>
                <div className=" absolute top-0 left-0 rounded-lg bg-black/90 h-[90%] w-full hover:opacity-100 opacity-0 transition-all duration-1000 flex justify-center items-center">
                  {/* edit review button  */}
                  <button
                    className=" bg-transparent text-primary px-8 py-2 rounded-lg font-semibold border-2 border-primary "
                    onClick={() => handleEditClick(book)}
                  >
                    Reviews
                  </button>
                </div>
                <img
                  src={getBookImage(book.bookTitle)}
                  className="object-cover rounded-lg h-[90%] w-full"
                  alt={book.bookTitle}
                />
                <h1 className="text-primary text-lg font-semibold flex items-center justify-between">
                  {book.bookTitle}
                  <span className="text-gray-500 text-sm">
                    {book.reviews.length} reviews
                  </span>
                </h1>
                <p className="text-gray-500 text-sm font-semibold">
                  {book.author}{" "}
                  <span className="text-gray-500 text-sm float-right flex items-center">
                    <StarIcon className="text-primary pr-2" />
                    {book.averageRating}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p className=" text-gray-500 font-semibold">No books available</p>
          )}
        </div>
      </div>

      {/* footer component */}
      <Footer />
    </>
  );
}
