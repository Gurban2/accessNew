import React from "react";
import Modal from "../../../../../modules/Modal";
import { useTranslation } from "react-i18next";
import { useAddComplaint } from "../../../../../hooks/useComplaints";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";

import "./ReportModal.scss";

const ReportModal = ({
  description,
  setDescription,
  id,
  onUpdateComplaints,
}) => {
  const { t } = useTranslation();
  const { mutateAsync } = useAddComplaint();

  const submitReport = async () => {
    if (!description.trim()) {
      toast.error(t("visitors.view.emptyDescriptionError"));
      return;
    }

    try {
      const newReportData = {
        description,
        visitor_id: id,
      };
      await mutateAsync(newReportData);
      onUpdateComplaints();
      toast.success(t("visitors.view.success"));
    } catch (error) {
      console.error(error);
      toast.error(t("visitors.view.reportError"));
    }
  };

  return (
    <Modal
      btnText={t("visitors.view.report")}
      onConfirm={submitReport}
      title={t("visitors.view.report")}
    >
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label></Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </Form.Group>
      </Form>
      <div className="modal-buttons"></div>
    </Modal>
  );
};

export default ReportModal;
