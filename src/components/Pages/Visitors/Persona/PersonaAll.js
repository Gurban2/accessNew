import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updatePersona } from "../../../../store/reducers/visitorReducer";
import Avatar from "../../../../modules/Avatar";
import { useFetchVisitors } from "../../../../hooks/useVisitors";
import DataTable from "../../../../modules/DataTable";
import { AppPaths } from "../../../../constants/appPaths";

const PersonaAll = () => {
  const { data, isLoading } = useFetchVisitors();
  const visitors = data?.data || [];
  const dispatch = useDispatch();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedVisitorId, setSelectedVisitorId] = useState(null);

  const personNonGrataVisitors = visitors.filter(
    (visitor) => visitor.is_blocked,
  );

  const handleEdit = (id, currentReason) => {
    setSelectedVisitorId(id);
    setReason(currentReason);
    setIsPopupOpen(true);
  };

  const handleConfirmEdit = () => {
    dispatch(updatePersona({ id: selectedVisitorId, reason }));
    setIsPopupOpen(false);
    setReason("");
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    setReason("");
  };

  const headItems = ["#", "Photo", "Fin", "Name", "Reason", "Actions"];

  const items = personNonGrataVisitors.map((visitor) => ({
    id: visitor.id,
    photo: <Avatar size="50px" src={visitor.avatar} alt={visitor.name} />,
    doc_id: visitor.doc_id,
    name: visitor.name,
    reason: visitor.reason,
    actions: visitor.is_blocked ? (
      <Button variant="warning" disabled>
        Blocked
      </Button>
    ) : (
      <Button
        variant="warning"
        onClick={() => handleEdit(visitor.id, visitor.reason)}
      >
        Add Reason
      </Button>
    ),
  }));

  return (
    <div className="persona-all-container">
      <h1 className="persona-all-title">
        Personas Marked as &quot;Non Grata&quot;
      </h1>
      <Button type="button">
        <Link to={AppPaths.persona.add}>Add Persona</Link>
      </Button>
      <DataTable headItems={headItems} items={items} isLoading={isLoading} />

      {isPopupOpen && (
        <div
          className="popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <h2>Provide Reason</h2>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for marking as 'Person Non Grata'"
            style={{
              width: "100%",
              height: "100px",
              marginTop: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              resize: "none",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
              gap: "10px",
            }}
          >
            <Button
              type="button"
              onClick={handleConfirmEdit}
              style={{ padding: "5px 10px" }}
            >
              Confirm
            </Button>
            <button
              onClick={handleCancel}
              className="btn btn-secondary"
              style={{ padding: "5px 10px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isPopupOpen && (
        <div
          className="popup-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 2,
          }}
        ></div>
      )}
    </div>
  );
};

export default PersonaAll;
