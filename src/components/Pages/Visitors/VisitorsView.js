import React from "react";
import { useParams } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import { AppPaths } from "../../../constants/appPaths";

const VisitorsView = () => {
  const { id } = useParams();
  const visitor = useSelector(
    (state) =>
      state.visitors.find((visitor) => visitor.id.toString() === id.toString()),
    shallowEqual
  );

  if (!visitor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="visitor-view-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: "Dashboard", to: AppPaths.dashboard.home },
            { label: "Visitors", to: AppPaths.visitors.all },

            { label: "Visitor - Edit" },
          ]}
        />
      </div>
      <h1 className="visitor-view-title">Visitor Details</h1>
      <div className="visitor-view-card">
        <div className="visitor-photo">
          {visitor.photo ? (
            typeof visitor.photo === "string" ? (
              <img
                src={visitor.photo}
                alt={`${visitor.name}`}
                className="visitor-photo-img"
              />
            ) : (
              <img
                src={URL.createObjectURL(visitor.photo)}
                alt={`${visitor.name}`}
                className="visitor-photo-img"
              />
            )
          ) : (
            <div className="visitor-photo-frame">
              <span>No Photo</span>
            </div>
          )}
        </div>
        <div className="visitor-info">
          <p>
            <strong>Name:</strong> {visitor.name}
          </p>
          <p>
            <strong>Phone:</strong> {visitor.phone}
          </p>
          <p>
            <strong>FIN:</strong> {visitor.fin}
          </p>
          <p>
            <strong>Email:</strong> {visitor.email}
          </p>
          <p>
            <strong>Address:</strong> {visitor.address}
          </p>
          <p>
            <strong>Description:</strong> {visitor.description}
          </p>
        </div>
        <Link
          to="/visitors/all"
          className="btn-view-visitor btn-view-visitor-secondary"
        >
          Back to all Visitors
        </Link>
      </div>
    </div>
  );
};

export default VisitorsView;
