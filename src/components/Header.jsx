import React from "react";
import { HiArrowCircleRight } from "react-icons/hi";

const Header = ({ title, showForm = false }) => {
  return (
    <div className="bg-neutral-focus py-8 px-2">
      <h1 className="text-2xl text-white text-center font-bold">{title}</h1>
      {showForm && (
        <form className="container mx-auto flex justify-center items-center mt-4 bg-white max-w-md rounded">
          <input
            type="text"
            placeholder="search term..."
            className="appearance-none outline-none mr-2 px-4 w-full"
          />
          <button className="bt bg-accent px-4 py-2 rounded-r">
            <HiArrowCircleRight className="text-2xl text-neutral-focus" />
          </button>
        </form>
      )}
    </div>
  );
};

export default Header;
