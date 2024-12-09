import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import AddModal from "./AddModal";
import DataTable from "../../../../modules/DataTable";
import { updateVisitor } from "../../../../store/reducers/visitorReducer";

import "./style.scss";
import { useFetchVisitors } from "../../../../hooks/useVisitors";
import { Avatar } from "@mui/material";
import Search from "../../../../modules/Search";
import { AppPaths } from "../../../../constants/appPaths";

const PersonaAdd = () => {
  const { data, isLoading } = useFetchVisitors();
  const visitors = data?.data || [];

  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleConfirmAdd = (id) => {
    if (!reason.trim()) {
      setError("Please provide a reason.");
      return;
    }

    try {
      dispatch(
        updateVisitor({
          id,
          personNonGrata: true,
          reason: reason.trim(),
        }),
      );

      setReason("");
      setError("");
    } catch (error) {
      setError("Failed to update. Please try again.");
      console.log(error);
    }
  };

  const headItems = [
    "ID",
    "Photo",
    "Fin",
    "Name",
    "Email",
    "Address",
    "Phone",
    "Actions",
  ];

  const items = visitors.map((visitor) => ({
    id: visitor.id,
    photo: <Avatar size="50px" src={visitor.avatar} alt={visitor.name} />,
    fin: visitor.fin,
    name: visitor.name,
    email: visitor.email,
    address: visitor.address,
    phone: visitor.phone,
    action: (
      <AddModal
        onChange={(e) => setReason(e.target.value)}
        reason={reason}
        onConfirm={() => handleConfirmAdd(visitor.id)}
      />
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
    </div>
  );
};

export default PersonaAdd;
