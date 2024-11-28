import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVisitor } from "../../../../store/reducers/visitorReducer";
import { Table, Button } from "react-bootstrap";
import AddModal from "./ConfirmModal";
const PersonaAdd = () => {
  const [inputValue, setInputValue] = useState("");
  const [matchedVisitors, setMatchedVisitors] = useState([]);
  const [reason, setReason] = useState("");
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const dispatch = useDispatch();
  const visitors = useSelector((state) => state.visitors || []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      setMatchedVisitors([]);
    } else {
      const matches = visitors.filter((visitor) =>
        visitor.name.toLowerCase().includes(value.toLowerCase())
      );
      setMatchedVisitors(matches);
    }
  };
  const handleAdd = (visitor) => {
    setSelectedVisitor(visitor);
    if (!visitor) {
      alert("No matching visitor found!");
      return;
    }

    if (visitor.personNonGrata === "true") {
      if (
        window.confirm(
          `This visitor is already marked as 'Person Non Grata'. Do you want to remove this status?`
        )
      ) {
        dispatch(
          updateVisitor({
            id: visitor.id,
            personNonGrata: "false",
            reason: "",
          })
        );
        alert(`${visitor.name} is no longer marked as 'Person Non Grata'.`);
      }
    }
  };

  const handleConfirmAdd = () => {
    if (!reason.trim()) {
      alert("Please provide a reason.");
      return;
    }

    dispatch(
      updateVisitor({
        id: selectedVisitor.id,
        personNonGrata: "true",
        reason: reason.trim(),
      })
    );

    setInputValue("");
    setMatchedVisitors([]);
    setReason("");
  };

  const handleCancel = () => {
    setReason("");
  };

  return (
    <div className="persona-add-container">
      <h1 className="persona-add-title">Add or Remove 'Person Non Grata'</h1>
      <div className="search-bar">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search for a visitor"
          className="search-input"
        />
      </div>
      {matchedVisitors.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>FIN</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {matchedVisitors.map((visitor) => (
              <tr key={visitor.id}>
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
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginRight: "10px",
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
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                    )
                  ) : (
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: "#ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "10px",
                        fontSize: "12px",
                      }}
                    >
                      No photo
                    </div>
                  )}
                </td>
                <td>{visitor.name}</td>
                <td>{visitor.fin}</td>
                <td
                  style={{
                    color: visitor.personNonGrata === "true" ? "red" : "green",
                  }}
                >
                  {visitor.personNonGrata === "true"
                    ? "Person Non Grata"
                    : "Not Person Non Grata"}
                </td>
                <td>{visitor.reason || "N/A"}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAdd(visitor)}
                  >
                    {visitor.personNonGrata === "true"
                      ? "Remove from Non Grata"
                      : <AddModal onChange={(e) => setReason(e.target.value)} onConfirm={handleConfirmAdd} onCancel={handleCancel} />
                    }
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default PersonaAdd;
