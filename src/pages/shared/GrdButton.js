import React from "react";

const GrdButton = ({ children, className }) => {
  return (
    <button
      className={`btn bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-l duration-500 uppercase text-white border-none ${className}`}
    >
      {children}
    </button>
  );
};

export default GrdButton;
