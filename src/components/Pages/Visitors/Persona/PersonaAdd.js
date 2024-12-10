import React, { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { Avatar } from "@mui/material";
import DataTable from "../../../../modules/DataTable";
import Search from "../../../../modules/Search";
import VisitorBlockButton from "./VisitorBlockButton";
import {
  useBlockVisitor,
  useFetchVisitors,
} from "../../../../hooks/useVisitors";
import { AppPaths } from "../../../../constants/appPaths";
import { toast } from "react-toastify"; // Импортируем toast из react-toastify
import "./style.scss";

const PersonaAdd = () => {
  const { data, isLoading } = useFetchVisitors();
  const visitors = data?.data || [];
  const { mutate: blockVisitor, isLoading: blockingLoading } =
    useBlockVisitor();

  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [reason, setReason] = useState("");

  const handleOpenModal = (visitor) => {
    setSelectedVisitor(visitor);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setReason("");
  };
  const handleConfirmBlock = () => {
    if (!reason.trim()) {
      setError("Reason cannot be empty.");
      return;
    }
    blockVisitor(
      { id: selectedVisitor.id, reason },
      {
        onSuccess: () => {
          setModalOpen(false);
          setReason("");
        },
        onError: (err) => setError(err.message),
      },
    );
  };

  const headItems = [
    "ID",
    "Photo",
    "Doc_ID",
    "Name",
    "Email",
    "Address",
    "Phone",
    "isBlocked",
    "Actions",
  ];

  const items = visitors.map((visitor) => ({
    id: visitor.id,
    photo: <Avatar size="50px" src={visitor.avatar} alt={visitor.name} />,
    doc_id: visitor.doc_id,
    name: visitor.name,
    email: visitor.email,
    address: visitor.address,
    phone: visitor.phone,
    is_blocked: visitor.is_blocked ? "Yes" : "No",
    action: (
      <VisitorBlockButton visitor={visitor} openReasonModal={handleOpenModal} />
    ),
  }));

  return (
    <div className="persona-add-container">
      {error && <Alert variant="danger">{error}</Alert>}
      <Search
        path={AppPaths.persona.add}
        placeholder="Search visitor"
        text="Search Visitor"
      />
      <DataTable
        withAction
        headItems={headItems}
        items={items}
        isLoading={isLoading}
      />
      <Modal show={modalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Provide a Reason</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for blocking"
            className="form-control"
            rows="4"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmBlock}
            disabled={blockingLoading}
          >
            {blockingLoading ? "Blocking..." : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PersonaAdd;
