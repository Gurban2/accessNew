import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useFetchVisitorComplaints,
  useBlockVisitor,
} from "../../../hooks/useVisitors";
import { AppPaths } from "../../../constants/appPaths";
import Breadcrumb from "../Breadcrumb";
import Avatar from "../../../modules/Avatar";
import ReportModal from "./Complaints/VisitorsModal/ReportModal";
import ComplaintsList from "./Complaints/ComplaintsList";
import VisitorBlockButton from "./Persona/VisitorBlockButton";
import "./Style_visitor_view/view.scss";

const VisitorsView = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const {
    data: complaints,
    refetch: refetchComplaints,
    isLoading: complaintsLoading,
  } = useFetchVisitorComplaints(id);

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [description, setDescription] = useState("");
  const { mutate: blockVisitor, isLoading: blockingLoading } =
    useBlockVisitor();

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

  return (
    <div className="visitor-view-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: t("breadcrumb.dashboard"), to: AppPaths.dashboard },
            { label: t("breadcrumb.visitors"), to: AppPaths.visitors.all },
            { label: t("visitorView.viewVisitor") },
          ]}
        />
      </div>
      <div className="visitor-view-card">
        <div className="visitor-view-card-header">
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
              <strong>{t("fin")}:</strong> {visitor.doc_id}
            </p>
            <p>
              <strong>{t("email")}:</strong> {visitor.email}
            </p>
            <p>
              <strong>{t("address")}:</strong> {visitor.address}
            </p>
          </div>
          <div className="visitor-view-card-header-btns">
            <VisitorBlockButton
              visitor={visitor}
              blockVisitor={blockVisitor}
              isLoading={blockingLoading}
            />
            <ReportModal
              onClose={toggleReportModal}
              description={description}
              setDescription={setDescription}
              id={visitor.id}
              onUpdateComplaints={refetchComplaints}
              blockVisitor={blockVisitor}
              isLoading={blockingLoading}
            />
          </div>
        </div>

        <div className="visitor-view-card-footer">
          <ComplaintsList
            complaints={complaintsData}
            complaintsLoading={complaintsLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default VisitorsView;
