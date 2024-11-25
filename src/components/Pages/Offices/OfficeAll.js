import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // For navigation
import Table from "react-bootstrap/Table";


const OfficeAll = () => {  
  const offices = useSelector((state)=> state.offices)
  const navigate = useNavigate();

  
 

  return (
    <div className="offices-all-container">
      <h1 className="offices-all-list">Offices - All</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Office Name</th>
            <th>Address</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {offices.map((office, index) => (
            <tr key={office.id}>
              <td>{index + 1}</td>
              <td>{office.name}</td>
              <td>{office.address}</td>
              <td>{office.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/offices/add" className="add-button">
        Add Office
      </Link>
    </div>
  );
};

export default OfficeAll;
