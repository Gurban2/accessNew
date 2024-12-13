import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  useFetchVisitorComplaints,
  useBlockVisitor,
  useFetchVisitorById,
  useStartVisit,
  useEndVisit,
} from "../../../hooks/useVisitors";
import { AppPaths } from "../../../constants/appPaths";
import Breadcrumb from "../Breadcrumb";
import Avatar from "../../../modules/Avatar";
import ReportModal from "./Complaints/VisitorsModal/ReportModal";
import ComplaintsList from "./Complaints/ComplaintsList";
import VisitorBlockButton from "./Persona/VisitorBlockButton";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import LoadingForm from "../../../modules/Loading/Form";
import ItemsTable from "./ItemsTable";
import "./style.scss";

const VisitorsView = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const { data: visitorData } = useFetchVisitorById(id);
  const { mutateAsync: startVisit } = useStartVisit();
  const { mutateAsync: endVisit } = useEndVisit();

  const visitor = visitorData?.data;
  const {
    data: complaints,
    refetch: refetchComplaints,
    isLoading: complaintsLoading,
  } = useFetchVisitorComplaints(id);

  const [description, setDescription] = useState("");
  const { mutate: blockVisitor, isLoading: blockingLoading } =
    useBlockVisitor();

  if (!visitor) {
    return <LoadingForm />;
  }

  const handleStartVisit = async () => {
    try {
      await startVisit(visitor.id);
      toast.success(t("visitors.view.startVisitSuccess"));
    } catch (error) {
      console.log("Error starting visit:", error);
      toast.error(t("visitors.view.startVisitError"));
    }
  };

  const handleEndVisit = async () => {
    try {
      await endVisit(visitor.id);
      toast.success(t("visitors.view.endVisitSuccess"));
    } catch (error) {
      console.log("Error ending visit:", error);
      toast.error(t("visitors.view.endVisitError"));
    }
  };

  const complaintsData = complaints?.data || [];

  return (
    <div className="user-container">
      <div className="head-wrapper">
        <Breadcrumb
          paths={[
            { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
            { label: t("breadcrumbs.visitors"), to: AppPaths.visitors.all },
            { label: t("breadcrumbs.showVisitor") },
          ]}
        />

        {!visitor.visit_start_date && (
          <Button onClick={handleStartVisit}>
            {t("visitors.view.startVisit")}
          </Button>
        )}
        {visitor.visit_start_date && !visitor.visit_end_date && (
          <Button variant="danger" onClick={handleEndVisit}>
            {t("visitors.view.endVisit")}
          </Button>
        )}
      </div>
      <div className="visitor-view">
        <div className="visitor-view-header">
          <div className="visitor-view-photo">
            <Avatar size="128px" src={visitor.avatar} alt={visitor.name} />
          </div>
          <div className="visitor-view-info">
            <p>
              <strong>{t("visitors.view.name")}:</strong> {visitor.name}
            </p>
            <p>
              <strong>{t("visitors.view.fin")}:</strong> {visitor.doc_id}
            </p>
            <p>
              <strong>{t("visitors.view.phone")}:</strong> {visitor.phone}
            </p>
            <p>
              <strong>{t("visitors.view.email")}:</strong> {visitor.email}
            </p>
            <p>
              <strong>{t("visitors.view.address")}:</strong> {visitor.address}
            </p>
          </div>
          <div className="visitor-view-btns">
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
          </div>
        </div>

        <div className="visitor-view-footer">
          <div>
            <h4>{t("visitors.view.items")}</h4>
            <ItemsTable canAdd={false} initialItems={visitor.items} />
          </div>

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
