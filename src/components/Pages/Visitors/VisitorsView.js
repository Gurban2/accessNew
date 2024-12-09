import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetchComplaints } from "../../../hooks/useComplaints";
import { AppPaths } from "../../../constants/appPaths";
import Breadcrumb from "../Breadcrumb";
import Avatar from "../../../modules/Avatar";
import ReportModal from "./Complaints/VisitorsModal/ReportModal";
import ComplaintsList from "./Complaints/ComplaintsList";
import { ToggleButton, ButtonGroup } from "react-bootstrap";
import "./Style_visitor_view/view.scss";

const VisitorsView = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const {
    data: complaints,
    refetch: refetchComplaints,
    isLoading: complaintsLoading,
  } = useFetchComplaints();

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [radioValue, setRadioValue] = useState("blocked");

  const visitor = useSelector(
    (state) =>
      state.visitors.data.find(
        (visitor) => visitor.id.toString() === id.toString(),
      ),
    shallowEqual,
  );

  if (!visitor) {
    return <div>{t("loading")}</div>;
  }

  const complaintsData = complaints?.data || [];

  const toggleReportModal = () => setIsReportOpen((prev) => !prev);

  const handleBlockUser = () => {
    setIsBlocked(true);
  };

  return (
    <div className="visitor-view-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: t("breadcrumb.dashboard"), to: AppPaths.dashboard.home },
            { label: t("breadcrumb.visitors"), to: AppPaths.visitors.all },
            { label: t("visitorView.viewVisitor") },
          ]}
        />
      </div>
      <div className="visitor-view-card">
        <div className="visitor-view-card-header">
          {" "}
          <div className="visitor-photo">
            <Avatar size="128px" src={visitor.avatar} alt={visitor.name} />
          </div>
          <div className="visitor-info">
            <p>
              <strong>{t("name")}:</strong> {visitor.name}
            </p>
            <p>
              <strong>{t("phone")}:</strong> {visitor.phone}
            </p>
            <p>
              <strong>{t("fin")}:</strong> {visitor.fin}
            </p>
            <p>
              <strong>{t("email")}:</strong> {visitor.email}
            </p>
            <p>
              <strong>{t("address")}:</strong> {visitor.address}
            </p>
          </div>
          <div className="visitor-view-card-header-btns">
            <ButtonGroup aria-label="Basic example">
              <ToggleButton
                type="radio"
                variant={isBlocked ? "outline-danger" : "outline-success"}
                onClick={handleBlockUser}
                checked={radioValue === "blocked"}
              >
                {isBlocked ? t("visitorView.blocked") : t("visitorView.block")}
              </ToggleButton>
            </ButtonGroup>
            <ReportModal
              onClose={toggleReportModal}
              description={description}
              setDescription={setDescription}
              id={visitor.id}
              onUpdateComplaints={refetchComplaints}
            />
          </div>
        </div>

        <div className="visitor-view-card-footer">
          <ComplaintsList
            complaints={complaintsData}
            complaintsLoading={complaintsLoading}
          />

          <div className="modal-actions"></div>
        </div>
      </div>
    </div>
  );
};

export default VisitorsView;
