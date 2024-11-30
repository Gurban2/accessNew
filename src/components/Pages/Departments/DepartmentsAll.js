import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteDepartment } from "../../../store/reducers/departmentReducer";
import Table from "react-bootstrap/Table";

const DepartmentsAll = () => {
  const departments = useSelector(
    (state) => state.departments.departmentsData || []
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        <nav className="breadcrumbs">
          <Link to="/">Dashboard</Link> &gt; <span>Departments</span>
        </nav>

        <Link to="/departments/add" className="btn btn-primary p-2">
          Add Department
        </Link>
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
          {departments.map((department, index) => (
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
