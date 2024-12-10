import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ToggleButton, ButtonGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import VisitorConfirmationModal from "../Complaints/VisitorsModal/VisitorConfirmationModal";

const VisitorBlockButton = ({ visitor, blockVisitor, isLoading }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(false); // Для отслеживания успешного выполнения действия

  if (!visitor) {
    return null;
  }

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmBlock = async () => {
    try {
      await blockVisitor(visitor.id);
      toast.success(t("visitorView.success"));
      setActionSuccess(true); // Установим состояние успеха
    } catch (error) {
      toast.error(t("visitorView.reportError"));
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      {!actionSuccess ? (
        <ButtonGroup aria-label={t("visitorBlockActions")}>
          <ToggleButton
            type="button"
            name="block-visitor"
            variant={visitor.isBlocked ? "outline-danger" : "outline-success"}
            onClick={handleOpenModal}
            aria-pressed={visitor.isBlocked}
            checked={visitor.isBlocked}
            disabled={isLoading}
          >
            {visitor.isBlocked ? t("blocked") : t("block")}
          </ToggleButton>
        </ButtonGroup>
      ) : (
        <ButtonGroup aria-label={t("visitorBlockActions")}>
          <ToggleButton
            type="button"
            variant="success"
            disabled
            aria-pressed={true}
          >
            {t("blocked")}
          </ToggleButton>
        </ButtonGroup>
      )}

      <VisitorConfirmationModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmBlock}
        isBlocked={visitor.isBlocked}
        isLoading={isLoading}
      />
    </>
  );
};

export default VisitorBlockButton;
