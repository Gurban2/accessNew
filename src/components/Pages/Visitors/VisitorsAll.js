import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteVisitor } from "../../../store/reducers/visitorReducer";
import { FaEye } from "react-icons/fa";
import Table from "react-bootstrap/Table";

const VisitorsAll = () => {
  const visitors = useSelector((state) => state.visitors.visitorsData || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mемоизированный список фильтрованных посетителей
  const filteredVisitors = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return visitors.filter(
      (visitor) =>
        visitor.name.toLowerCase().includes(query) ||
        visitor.phone.toLowerCase().includes(query) ||
        visitor.fin.toLowerCase().includes(query)
    );
  }, [searchQuery, visitors]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Visitor?")) {
      setIsLoading(true);
      try {
        await dispatch(deleteVisitor({ id }));
      } catch (error) {
        console.error("Error deleting visitor", error);
      }
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
          {filteredVisitors.map((visitor, index) => (
            <tr key={visitor.id}>
              <td>{index + 1}</td>
              <td>
                {visitor.photo ? (
                  <img
                    src={visitor.photo}
                    alt={visitor.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
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
                  {isLoading ? "Deleting..." : "Delete"}
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
