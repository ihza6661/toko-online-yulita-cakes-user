import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-3 items-center pr-4">
      <p className="text-pink-500 text-lg sm:text-3xl font-light">
        {text1} <span className="text-brown-700 font-semibold">{text2}</span>
      </p>
      <p className="w-10 sm:w-14 h-[2px] bg-gradient-to-r from-pink-400 to-yellow-300 rounded-full"></p>
    </div>
  );
};

export default Title;
