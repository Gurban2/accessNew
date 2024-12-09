import React from "react";
import Modal from "../../../../../modules/Modal";
import { useTranslation } from "react-i18next";
import { useAddComplaint } from "../../../../../hooks/useComplaints";
import { toast } from "react-toastify";

import "./ReportModal.scss";

const ReportModal = ({
  onClose,
  description,
  setDescription,
  id,
  onUpdateComplaints,
}) => {
  const { t } = useTranslation();
  const { mutateAsync } = useAddComplaint();

  const submitReport = async () => {
    try {
      const newReportData = {
        description,
        visitor_id: id,
      };
      await mutateAsync(newReportData);
      onUpdateComplaints(); // Обновляем жалобы
      toast.success(t("visitorView.success"));
      onClose();
    } catch (error) {
      toast.error(t("visitorView.reportError"));
    }
  };

  return (
    <Modal
      btnText={t("visitorView.report")}
      onClose={onClose}
      onConfirm={submitReport}
    >
      <h3>{t("visitorView.report")}</h3>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={t("visitorView.report")}
      ></textarea>
    </Modal>
  );
};

export default ReportModal;
