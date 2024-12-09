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

  const { data, isLoading } = useFetchVisitors();
  const { mutateAsync } = useDeleteVisitor();

  const visitors = data?.data;
  const meta = data?.meta;

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
    t("actions"),
  ];

  const items = visitors?.map((visitor, index) => ({
    id: visitor.id,
    avatar: <Avatar size="64px" src={visitor.avatar} alt={visitor.name} />,
    docType: visitor.doc_type,
    fin: visitor.fin,
    name: visitor.name,
    email: visitor.email,
    phone: visitor.phone,
    visitTime: format(new Date(visitor.visit_time * 1000), "dd MMM yy HH:mm"),
    visitStartDate: format(
      new Date(visitor.visit_start_date * 1000),
      "dd MMM yy HH:mm",
    ),
    visit_end_date: format(
      new Date(visitor.visit_end_date * 1000),
      "dd MMM yy HH:mm",
    ),
  }));

  return (
    <div className="visitors-all-container">
      <div className="visitors-wrapper d-row d-flex justify-content-between">
        <Breadcrumb
          paths={[
            { label: t("breadcrumb.dashboard"), to: AppPaths.dashboard },
            { label: t("breadcrumb.visitors") },
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
            onClick: (id) => handleView(id),
          },
          {
            text: <FaEdit />,
            variant: "warning",
            onClick: (id) => handleEdit(id),
          },
          {
            text: <FaRegTrashAlt />,
            variant: "danger",
            onClick: (id) => handleDelete(id),
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
