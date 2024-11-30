import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { deleteOffice } from "../../../store/reducers/officeReducer";

const OfficeAll = () => {
  const offices = useSelector((state) => state.offices);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this office?")) {
      dispatch(deleteOffice({ id }));
    }
  };

  const handleEdit = (id) => {
    navigate(`/offices/edit/${id}`);
  };

  return (
    <div className="offices-all-container">
      <div className="offices-wrapper d-row">
        <nav className="breadcrumbs">
          <Link to="/">Dashboard</Link> &gt; <span>Offices - All</span>
        </nav>

        <Link to="/offices/add" className="btn btn-primary p-2">
          Add Office
        </Link>
      </div>
      <hr className="navigation-underline" />
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
                  onClick={() => handleEdit(office.id)}
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
