import React from "react";
import { Link } from "react-router-dom";

//importing logo
import Logo from "../../assets/header/logo.png";

//MUI icons
import LanguageIcon from "@mui/icons-material/Language";

export default function Header() {
  return (
    // Header component
    <div className=" bg-secondary h-10 w-full fixed top-0 left-0 px-9 py-10 flex flex-row justify-between  items-center text-white z-50">
      {/* bookSphere logo  */}
      <img src={Logo} className=" h-[50px] w-auto" />

      {/* navigation bar */}
      <nav className="flex justify-end">
        <ul className="flex space-x-10 text-lg font-semibold">
          <li className=" cursor-pointer ">
            <Link to="/">Home</Link>
          </li>
          <li className=" cursor-pointer ">
            <Link to="/browse-book">Browse Books</Link>
          </li>
          <li className=" cursor-pointer ">Contact Us</li>
        </ul>
      </nav>
    </div>
  );
}
