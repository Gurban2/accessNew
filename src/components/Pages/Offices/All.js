import React, { useState } from "react";
import { Link } from "react-router-dom";
import TableAllOffice from "./TableAllOffice";
import { useNavigate } from "react-router-dom"; // For navigation

// Array of initial office data
const initialOffices = [
  { id: 1, firstName: "Mark", lastName: "Otto", username: "@mdo" },
  { id: 2, firstName: "Jacob", lastName: "Thornton", username: "@fat" },
  { id: 3, firstName: "Larry", lastName: "the Bird", username: "@twitter" },
];

const All = () => {
  const [offices, setOffices] = useState(initialOffices);
  const navigate = useNavigate();

  // Function to handle adding a new office
  const handleAddOffice = (newOffice) => {
    setOffices((prevOffices) => [
      ...prevOffices,
      { ...newOffice, id: prevOffices.length + 1 },
    ]);
    navigate("/offices/all"); // Redirect after submission
  };

  return (
    <div className="offices-all-container">
      <h1 className="offices-all-list">Offices - All</h1>
      {/* Pass data to TableAllOffice */}
      <TableAllOffice offices={offices} />
      {/* Add button */}
      <Link to="/offices/add" className="add-button">
        Add Office
      </Link>
    </div>
  );
};

export default All;
