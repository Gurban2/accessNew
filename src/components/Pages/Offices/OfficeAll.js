import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteOffice } from "../../../store/reducers/officeReducer";
import Breadcrumb from "../Breadcrumb";
import Table from "react-bootstrap/Table";
import Search from "../../Searchbar";

import "./style.scss";
import { AppPaths } from "../../../constants/appPaths";
import { Button } from "react-bootstrap";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

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

  const breadCrumbs = [
    { label: "Dashboard", to: AppPaths.dashboard.home },
    { label: "Offices", to: AppPaths.offices.all },
  ];

  return (
    <div className="offices-all-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb paths={breadCrumbs} />
        <div className="searchAddBtn">
          <Search
            data={offices}
            onFilter={setFilteredOffices}
            placeholder="Search offices..."
          />
          <Button type="button">
            <Link to="/offices/add">Add Office</Link>
          </Button>
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
              <td className="d-flex justify-between gap-2">
                <Button
                  variant="warning"
                  className="w-100"
                  onClick={() => handleEdit(office.id)}
                >
                  <FaEdit />
                </Button>{" "}
                <Button
                  type="button"
                  className="w-100"
                  variant="danger"
                  onClick={() => handleDelete(office.id)}
                >
                  <FaRegTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OfficeAll;
