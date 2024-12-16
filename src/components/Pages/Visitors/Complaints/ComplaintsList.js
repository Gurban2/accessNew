import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import "./style.scss";
import { format } from "date-fns";

const ComplaintsList = ({ complaints, complaintsLoading, onToggle }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
    if (onToggle) onToggle(!isExpanded); // Вызов внешнего обработчика
  };

  return (
    <div className="visitor-complaints">
      <h5
        className={`complaints-list-title ${isExpanded ? "expanded" : ""}`}
        onClick={toggleExpand}
        style={{ cursor: "pointer" }}
      >
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
                  <blockquote className="blockquote mb-0">
                    <p>{complaint.description}</p>
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
