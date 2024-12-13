import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Modal from "../../../../modules/Modal";
import { FaRegWindowClose } from "react-icons/fa";

const VisitorBlockButton = ({ visitor, blockVisitor, isLoading }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState(""); // State for description

  if (!visitor) {
    return null;
  }

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDescription("");
  };

  const handleConfirmBlock = async () => {
    if (!description.trim()) {
      toast.error(t("visitorBlockModal.emptyDescriptionError"));
      return;
    }

    try {
      console.log("Attempting to block visitor...");
      await blockVisitor(visitor.id, description);
      console.log("Visitor blocked successfully.");
      toast.success(t("visitorBlockModal.success"));
    } catch (error) {
      console.log("Error blocking visitor:", error.message);
      toast.error(t("visitorBlockModal.error"));
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      <Modal
        btnText={<FaRegWindowClose />}
        title={t("visitorBlockModal.title")}
        onConfirm={handleConfirmBlock}
        onCancel={handleCloseModal}
        defaultShow={showModal}
        btnProps={{
          variant: "danger",
          disabled: isLoading,
        }}
      >
        <h4 className="warning-text">{t("visitorBlockModal.description")}</h4>
      </Modal>
    </>
  );
};

export default VisitorBlockButton;
