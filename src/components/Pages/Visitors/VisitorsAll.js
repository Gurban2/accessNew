import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteVisitor } from "../../../store/reducers/visitorReducer";
import Table from "react-bootstrap/Table";


const VisitorsAll = () => {
  const visitors = useSelector((state) => state.visitors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Visitor?")) {
      dispatch(deleteVisitor({ id }));
    }
  };

  const handleEdit = (id) => {
    navigate(`/visitors/edit/${id}`);
  };

  return (
    <div className="visitors-all-container">
      <h1 className="visitors-all-list">Visitors - All</h1>
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
                <button
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
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/visitors/add" className="btn btn-primary">
        Add Visitor
      </Link>
    </div>
  );
};

export default VisitorsAll;