import React from "react";
import './style.scss';  
import TableAllOffice from "./TableAllOffice.js";

const All = () => {
  return (
    <div className="offices-all-container">
      <h1 className="offices-all-list">Offices - All</h1>
      <TableAllOffice /> 
    </div>
  );
};

export default All;
