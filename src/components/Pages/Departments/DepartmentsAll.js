import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteDepartment } from "../../../store/reducers/departmentReducer";
import Breadcrumb from "../Breadcrumb";
import Table from "react-bootstrap/Table";
import Search from "../../Searchbar";
import "./style.scss";

const DepartmentsAll = () => {
  const departments = useSelector(
    (state) => state.departments.departmentsData || []
  );
  console.log(departments)
  const [filteredDepartments, setFilteredDepartments] = useState(departments);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredDepartments(departments);
  }, [departments]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      dispatch(deleteDepartment({ id }));
    }
  };

  const handleEdit = (id) => {
    navigate(`/departments/edit/${id}`);
  };

  return (
    <div className="departments-all-container">
      <div className="departments-wrapper d-row">
        <Breadcrumb
          paths={[{ label: "Dashboard", to: "/" }, { label: "Departments" }]}
        />
        <div className="searchAddBtn">
          <Search
            data={departments}
            onFilter={setFilteredDepartments}
            placeholder="Search departments..."
          />
          <Link to="/departments/add" className="btn btn-primary">
            Add Department
          </Link>
        </div>
      </div>
      <hr className="navigation-underline" />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Office</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.map((department, index) => (
            <tr key={department.id}>
              <td>{index + 1}</td>
              <td>{department.name}</td>
              <td>{department.phone}</td>
              <td>{department.office}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(department.id)}
                >
                  Edit
                </button>{" "}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(department.id)}
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

export default DepartmentsAll;
