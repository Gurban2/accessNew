import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
// Массив начальных данных для Departments
const initialDepartments = [
  { id: 1, name: "HR", phone: "123-456-7890", office: "Office A" },
  { id: 2, name: "IT", phone: "987-654-3210", office: "Office B" },
  { id: 3, name: "Finance", phone: "456-789-1230", office: "Office C" },
];

const All = () => {
  const [departments, setDepartments] = useState(initialDepartments);

  // Функция для удаления департамента
  const handleDelete = (id) => {
    setDepartments((prevDepartments) =>
      prevDepartments.filter((department) => department.id !== id)
    );
  };

  return (
    <div className="departments-all-container">
      <h1 className="departments-all-list">Departments - All</h1>
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
                  className="delete-button"
                  onClick={() => handleDelete(department.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/departments/add" className="add-button">
        Add Department
      </Link>
    </div>
  );
};

export default All;
