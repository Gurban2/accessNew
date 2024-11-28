import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteVisitor } from "../../../store/reducers/visitorReducer";
import Table from "react-bootstrap/Table";
import { FaEye } from "react-icons/fa";

const VisitorsAll = () => {
  const visitors = useSelector((state) => state.visitors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Visitor?")) {
      setIsLoading(true);
      dispatch(deleteVisitor({ id }));
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/visitors/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/visitors/view/${id}`);
  };
  
  return (
    <div className="visitors-all-container">
      <h1 className="visitors-all-list">Visitors - all</h1>
      <Link to="/visitors/add" className="btn btn-primary">
        add Visitor
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
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
              <td>
                {visitor.photo ? (
                  typeof visitor.photo === "string" ? (
                    <img
                      src={visitor.photo}
                      alt={`${visitor.name}`}
                      className="visitor-photo"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(visitor.photo)}
                      alt={`${visitor.name}`}
                      className="visitor-photo"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  )
                ) : (
                  "No photo"
                )}
              </td>
              <td>{visitor.name}</td>
              <td>{visitor.phone}</td>
              <td>{visitor.fin}</td>
              <td>
              <button
                  className="btn btn-info btn-sm"
                  onClick={() => handleView(visitor.id)}
                >
                  <FaEye /> View
                </button>{" "}
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(visitor.id)}
                >
                  Edit
                </button>{" "}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(visitor.id)}
                  disabled={isLoading}
                >
                  {isLoading ? "Deleting..." : "Delete"} {/* Show loading text */}
                </button>                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>      
    </div>
  );
};

export default VisitorsAll;
