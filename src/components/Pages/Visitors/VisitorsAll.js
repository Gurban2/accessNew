import React from "react";
import { useTranslation } from "react-i18next";
import { FaEdit, FaEye, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { AppPaths } from "../../../constants/appPaths";
import Avatar from "../../../modules/Avatar";
import DataTable from "../../../modules/DataTable";
import Breadcrumb from "../Breadcrumb";
import { useDeleteVisitor, useFetchVisitors } from "../../../hooks/useVisitors";
import Search from "../../../modules/Search";
import Pager from "../../../modules/Pager";

const VisitorsAll = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, isLoading, error } = useFetchVisitors();
  const { mutateAsync } = useDeleteVisitor();

  // Handle any errors while fetching visitors
  if (error) {
    console.error(t("errorFetchingVisitors"), error);
    return <div>{t("errorFetchingVisitorsMessage")}</div>;
  }

  const visitors = data?.data || [];
  const meta = data?.meta;

  // Filter out blocked visitors
  const filteredVisitors = visitors.filter((visitor) => !visitor.is_blocked);

  console.log(filteredVisitors, visitors);

  const handleDelete = async (id) => {
    if (window.confirm(t("visitorDeleteConfirm"))) {
      try {
        await mutateAsync(id);
      } catch (error) {
        console.error(t("errorDeletingVisitor"), error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/visitors/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/visitors/view/${id}`);
  };

  const headItems = [
    "#",
    t("photo"),
    t("doc_type"),
    t("fin"),
    t("name"),
    t("email"),
    t("phone"),
    t("visit_time"),
    t("visitStartDate"),
    t("visitEndDate"),
  ];

  // Transform visitors data for display in the table
  const items = visitors.map((visitor, index) => ({
    id: visitor.id,
    avatar: visitor.avatar ? (
      <Avatar size="64px" src={visitor.avatar} alt={visitor.name} />
    ) : (
      <div className="avatar-placeholder">N/A</div>
    ),
    docType: visitor.doc_type || "N/A",
    doc_id: visitor.doc_id || "N/A",
    name: visitor.name,
    email: visitor.email || "N/A",
    phone: visitor.phone || "N/A",
    visitTime: visitor.visit_time
      ? format(new Date(visitor.visit_time * 1000), "dd MMM yy HH:mm")
      : "N/A",
    visitStartDate: visitor.visit_start_date
      ? format(new Date(visitor.visit_start_date * 1000), "dd MMM yy HH:mm")
      : "N/A",
    visit_end_date: visitor.visit_end_date
      ? format(new Date(visitor.visit_end_date * 1000), "dd MMM yy HH:mm")
      : "N/A",
    className: visitor.is_blocked ? "blocked" : "",
  }));

  return (
    <div className="visitors-all-container">
      <div className="visitors-wrapper d-row d-flex justify-content-between">
        <Breadcrumb
          paths={[
            { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
            { label: t("breadcrumbs.visitors") },
          ]}
        />
        <div className="search-bar">
          <Search
            path={AppPaths.visitors.all}
            placeholder={t("visitorAll.searchPlaceholder")}
          />
        </div>
      </div>
      <DataTable
        isLoading={isLoading}
        withAction
        headItems={headItems}
        items={items}
        actionItems={[
          {
            text: (
              <>
                <FaEye /> {t("view")}
              </>
            ),
            variant: "info",
            onClick: handleView,
          },
          {
            text: <FaEdit />,
            variant: "warning",
            onClick: handleEdit,
          },
          {
            text: <FaRegTrashAlt />,
            variant: "danger",
            onClick: handleDelete,
          },
        ]}
      />

      <Pager
        currentPage={meta?.current_page}
        hasNext={meta?.has_next}
        totalPage={meta?.total_page}
      />
    </div>
  );
};

export default VisitorsAll;
