import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // For navigation
import Table from "react-bootstrap/Table";
import { deleteOffice } from "../../../store/reducers/officeReducer";

const OfficeAll = () => {
  const offices = useSelector((state) => state.offices);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("Offices массив: officeAll", offices);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this office?")) {
      dispatch(deleteOffice({ id }));
    }
  };

  const handleEdit = (id) => {
    // console.log("ID перед навигацией:", id);

    navigate(`/offices/edit/${id}`); // Передаем office.id в URL
  };

  return (
    <div className="offices-all-container">
      <h1 className="offices-all-list">Offices - All</h1>
      <Link to="/offices/add" className="btn btn-primary">
        Add Office
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Office Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {offices.map((office, index) => (
            <tr key={office.id}>
              <td>{index + 1}</td>
              <td>{office.name}</td>
              <td>{office.address}</td>
              <td>{office.phone}</td>
              <td>
                <button
                  onClick={() => handleEdit(office.id)} // Pass `office.id` here
                  className="btn btn-warning btn-sm"
                >
                  Edit
                </button>{" "}
                <button
                  onClick={() => handleDelete(office.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </div>
  );
};

export default OfficeAll;
