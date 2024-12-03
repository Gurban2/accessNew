import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteVisitor } from "../../../store/reducers/visitorReducer";
import Table from "react-bootstrap/Table";
import Search from "../../Searchbar";
import { FaEye } from "react-icons/fa";
import Breadcrumb from "../Breadcrumb";

const VisitorsAll = () => {
  const visitors = useSelector((state) => state.visitors || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVisitors, setFilteredVisitors] = useState(visitors);

  // Обновление фильтрованных посетителей при изменении поиска или данных
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    setFilteredVisitors(
      visitors.filter(
        (visitor) =>
          visitor.name.toLowerCase().includes(query) ||
          visitor.phone.toLowerCase().includes(query) ||
          visitor.fin.toLowerCase().includes(query)
      )
    );
  }, [searchQuery, visitors]);

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
      <div className="visitors-wrapper d-row">
        <Breadcrumb
            paths={[{ label: "Dashboard", to: "/" }, { label: "Visitors - All" },]}
        />
        <div className="searchAddBtn">
          <div className="search-bar">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, phone, or FIN"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link to="/visitors/add" className="btn btn-primary p-1">
            Add Visitors
          </Link>
        </div>
      </div>
      <hr className="navigation-underline" />

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
              <td className="">
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
