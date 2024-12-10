import React from "react";
import { useTranslation } from "react-i18next";
import { ToggleButton, ButtonGroup } from "react-bootstrap";

const VisitorBlockButton = ({ visitor, openReasonModal }) => {
  const { t } = useTranslation();

  return (
    <ButtonGroup aria-label="Visitor Block Actions">
      <ToggleButton
        type="radio"
        variant={visitor.isBlocked ? "outline-danger" : "outline-success"}
        onClick={() => openReasonModal(visitor)}
      >
        {visitor.isBlocked ? "Blocked" : "Block"}
      </ToggleButton>
    </ButtonGroup>
  );
};

export default VisitorBlockButton;
