import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteOffice } from "../../../store/reducers/officeReducer";
import Breadcrumb from "../Breadcrumb";
import Table from "react-bootstrap/Table";
import Search from "../../Searchbar";

import "./style.scss";

const OfficeAll = () => {
  const offices = useSelector((state) => state.offices);
  const [filteredOffices, setFilteredOffices] = useState(offices);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredOffices(offices);
  }, [offices]);

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
        <Breadcrumb
          paths={[{ label: "Dashboard", to: "/" }, { label: "Offices - All" }]}
        />
        <div className="searchAddBtn">
          <Search
            data={offices}
            onFilter={setFilteredOffices}
            placeholder="Search offices..."
          />
          <Link to="/offices/add" className="btn btn-primary p-1">
            Add Office
          </Link>
        </div>
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
          {filteredOffices.map((office, index) => (
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
