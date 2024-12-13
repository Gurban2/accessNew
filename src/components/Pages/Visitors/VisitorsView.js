import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  useFetchVisitorComplaints,
  useBlockVisitor,
  useFetchVisitorById,
  useStartVisit,
} from "../../../hooks/useVisitors";
import { AppPaths } from "../../../constants/appPaths";
import Breadcrumb from "../Breadcrumb";
import Avatar from "../../../modules/Avatar";
import ReportModal from "./Complaints/VisitorsModal/ReportModal";
import ComplaintsList from "./Complaints/ComplaintsList";
import VisitorBlockButton from "./Persona/VisitorBlockButton";
import "./Style_visitor_view/view.scss";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const VisitorsView = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const { data: visitorData } = useFetchVisitorById(id);
  const { data: visitData, error, refetch } = useStartVisit(false, id);
  const visitInfo = visitData;

  const visitor = visitorData?.data;
  const {
    data: complaints,
    refetch: refetchComplaints,
    isLoading: complaintsLoading,
  } = useFetchVisitorComplaints(id);

  const [description, setDescription] = useState("");
  const { mutate: blockVisitor, isLoading: blockingLoading } =
    useBlockVisitor();

  useEffect(() => {
    console.log({ visitInfo, error });
    if (error) {
      // startVisit(false);
      toast.error("Failed to start visit");
    }
  }, [visitInfo, error]);

  if (!visitor) {
    return <div>{t("loading")}</div>;
  }

  const complaintsData = complaints?.data || [];

  return (
    <div className="visitor-view-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
            { label: t("breadcrumbs.visitors"), to: AppPaths.visitors.all },
            { label: t("breadcrumbs.showVisitor") },
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
              <strong>{t("visitors.view.name")}:</strong> {visitor.name}
            </p>
            <p>
              <strong>{t("visitors.view.phone")}:</strong> {visitor.phone}
            </p>
            <p>
              <strong>{t("visitors.view.fin")}:</strong> {visitor.doc_id}
            </p>
            <p>
              <strong>{t("visitors.view.email")}:</strong> {visitor.email}
            </p>
            <p>
              <strong>{t("visitors.view.address")}:</strong> {visitor.address}
            </p>
          </div>
          <div className="visitor-view-card-header-btns">
            <VisitorBlockButton
              visitor={visitor}
              blockVisitor={blockVisitor}
              isLoading={blockingLoading}
            />
            <ReportModal
              description={description}
              setDescription={setDescription}
              id={visitor.id}
              onUpdateComplaints={refetchComplaints}
            />
            {/* <Button onClick={handleStartVisit}>Start Visit</Button> */}
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
