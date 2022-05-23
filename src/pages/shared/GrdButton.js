import React from "react";

const GrdButton = (props) => {
  return (
    <button className="btn bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-l duration-500 uppercase text-white border-none">
      {props.children}
    </button>
  );
};

export default GrdButton;
