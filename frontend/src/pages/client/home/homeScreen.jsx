import React from "react";

//images
import Background from "../../../assets/home/wallpaper.jpg";

// MUI Icons
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// MUI Icons
import { useNavigate } from "react-router-dom";

//components
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";

export default function homeScreen() {
  const navigate = useNavigate();

  // handleBrowseClick function to navigate to browse book page
  const handleBrowseClick = () => {
    navigate("/browse-book");
  };

  return (
    <>
      {/* headercomponent */}
      <Header />
      <div
        className="bg-cover pb-9 h-[100vh] w-full"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className=" absolute top-0 text-left left-0 bg-gradient-to-r from-black via-black/50 to-black/0 h-[100vh] w-full flex flex-col justify-center pl-24 text-white">
          <h1 className=" text-primary text-lg font-bold">booksphere</h1>
          <h1 className=" text-[80px] font-bold">
            Where <span className=" text-primary">Stories</span>,<br />
            Come to Life
          </h1>
          <p
            onClick={() => handleBrowseClick()}
            className=" cursor-pointer py-3 px-2 border-primary border-2 rounded-full w-[200px] text-lg text-center mt-4 text-primary font-semibold"
          >
            <PlayArrowIcon
              className=" text-primary pr-1"
              style={{ fontSize: "35px" }}
            />
            Browse more
          </p>
        </div>
      </div>

      {/* footer component */}
      <Footer />
    </>
  );
}
