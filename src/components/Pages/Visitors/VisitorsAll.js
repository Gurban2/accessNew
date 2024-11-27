import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteVisitor } from "../../../store/reducers/visitorReducer";
import Table from "react-bootstrap/Table";

const ActionButton = ({ onClick, label, className }) => (
  <button className={`btn btn-sm ${className}`} onClick={onClick}>
    {label}
  </button>
);

const VisitorsAll = () => {
  const visitors = useSelector((state) => state.visitors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Visitor?")) {
      setIsLoading(true); // Set loading state
      dispatch(deleteVisitor({ id }));
      setIsLoading(false); // Reset loading state
    }
  };

  const handleEdit = (id) => {
    navigate(`/visitors/edit/${id}`);
  };

  return (
    <div className="visitors-all-container">
      <h1 className="visitors-all-list">Visitors - All</h1>
      <Link to="/visitors/add" className="btn btn-primary">
        Add Visitor
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Fin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor, index) => (
            <tr key={visitor.id}>
              <td>{index + 1}</td>
              <td>{visitor.name}</td>
              <td>{visitor.phone}</td>
              <td>{visitor.fin}</td>
              <td>
                {/* <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(visitor.id)}
                >
                  Edit
                </button>{" "}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(visitor.id)}
                >
                  Delete
                </button> */}
                <ActionButton
                  onClick={() => handleEdit(visitor.id)}
                  label={isLoading ? "Editing..." : "Edit"}
                  className="btn-warning"
                />
                <ActionButton
                  onClick={() => handleDelete(visitor.id)}
                  label={isLoading ? "Deleting..." : "Delete"}
                  className="btn-danger"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <Link to="/visitors/add" className="btn btn-primary">
        Add Visitor
      </Link> */}
    </div>
  );
};

export default VisitorsAll;