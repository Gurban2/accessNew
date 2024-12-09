import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ComplaintsList = ({ complaints, complaintsLoading, onToggle }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="visitor-complaints">
      <h4 onClick={toggleExpand}>{t("visitorView.complaints")}</h4>
      {isExpanded && (
        <div>
          {complaintsLoading ? (
            <p>{t("loading")}</p>
          ) : complaints.length > 0 ? (
            complaints.map((complaint) => (
              <div key={complaint.id} className="complaint">
                <p>{complaint.description}</p>
              </div>
            ))
          ) : (
            <p>{t("visitorView.noComplaints")}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;
