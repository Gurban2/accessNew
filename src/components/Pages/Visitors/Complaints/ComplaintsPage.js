import React from "react";
import { useParams } from "react-router-dom";
import { useFetchVisitorComplaints } from "../../../../hooks/useVisitors";
// import Avatar from "../../../../modules/Avatar";
import ComplaintsList from "./ComplaintsList";
import { AppPaths } from "../../../../constants/appPaths";
import { useTranslation } from "react-i18next";

import "./style.scss";

const ComplaintsPage = (handleToggleComplaints) => {
  const { t } = useTranslation();
  const { id } = useParams();
  console.log("test");
  const {
    data: complaints,
    refetch: refetchComplaints,
    isLoading: complaintsLoading,
  } = useFetchVisitorComplaints(id);

  const complaintsData = complaints?.data || [];
  console.log(complaints);

  return (
    <div className="complaints-container">
      paths=
      {[
        { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
        { label: t("breadcrumbs.visitors"), to: AppPaths.visitors.all },
        { label: t("breadcrumbs.viewComplaints") },
      ]}
      <ComplaintsList
        complaints={complaintsData}
        complaintsLoading={complaintsLoading}
        onToggle={handleToggleComplaints}
      />
    </div>
  );
};

export default ComplaintsPage;
