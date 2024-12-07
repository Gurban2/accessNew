import React from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { AppPaths } from "../../../constants/appPaths";
import Breadcrumb from "../Breadcrumb";
import "./style.scss";
import Avatar from "../../../modules/Avatar";

const VisitorsView = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const visitor = useSelector(
    (state) =>
      state.visitors.data.find(
        (visitor) => visitor.id.toString() === id.toString(),
      ),
    shallowEqual,
  );

  if (!visitor) {
    return <div>{t("loading")}</div>; // Use translation for loading
  }

  return (
    <div className="visitor-view-container">
      <div className="offices-wrapper d-row">
        {/* TODO: report and persona buttons */}
        <Breadcrumb
          paths={[
            { label: t("breadcrumb.dashboard"), to: AppPaths.dashboard.home },
            { label: t("breadcrumb.visitors"), to: AppPaths.visitors.all },
            { label: t("visitorView.viewVisitor") },
          ]}
        />
      </div>
      <div className="visitor-view-card">
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

          {/* TODO: show items (qurban) */}
        </div>
      </div>
    </div>
  );
};

export default VisitorsView;
