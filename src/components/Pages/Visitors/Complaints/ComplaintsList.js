import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import "./style.scss";
import { format } from "date-fns";
import ActionButton from "modules/ActionButton";
import { useDeleteComplaint } from "@hooks/useComplaints";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";

const ComplaintsList = ({ complaints, complaintsLoading }) => {
  const { t } = useTranslation();
  const [isExpanded] = useState(true); // Лист всегда открыт

  const { mutateAsync: deleteComplaint } = useDeleteComplaint();

  const handleDelete = async (complaint) => {
    try {
      await deleteComplaint(complaint.id);
      toast.success(t("visitors.view.complaintDeleted"));
    } catch (error) {
      console.error("Error deleting complaint:", error);
      toast.error(t("visitors.view.complaintDeleteError"));
    }
  };

  return (
    <div className="visitor-complaints">
      <h5 className={`complaints-list-title ${isExpanded ? "expanded" : ""}`}>
        {t("visitors.view.complaints")}
      </h5>

      {isExpanded && (
        <div>
          {complaintsLoading ? (
            <div className="spinner-container">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">{t("loading")}</span>
              </Spinner>
            </div>
          ) : complaints.length > 0 ? (
            complaints.map((complaint) => (
              <Card key={complaint.id} className="mb-3">
                <Card.Body>
                  <blockquote className="blockquote mb-0 d-flex justify-content-between align-items-center">
                    <p>{complaint.description}</p>
                    <ActionButton
                      tooltip={t("visitors.view.deleteComplaint")}
                      variant="danger"
                      text={<FaRegTrashAlt />}
                      onClick={() => handleDelete(complaint)}
                    />
                  </blockquote>
                </Card.Body>
                <Card.Footer>
                  {t("visitors.view.reporter")}:{" "}
                  {complaint.reported_by || t("visitors.view.unknown")} |{" "}
                  {t("visitors.view.complainedAt")}:{" "}
                  {complaint.created_at
                    ? format(new Date(complaint.created_at), "dd/MM/yyyy HH:mm")
                    : t("visitors.view.unknown")}
                </Card.Footer>
              </Card>
            ))
          ) : (
            <p>{t("visitors.view.noComplaints")}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;
