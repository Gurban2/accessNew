import React from "react";
import { useTranslation } from "react-i18next";
import { FaEdit, FaEye, FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { AppPaths } from "../../../constants/appPaths";
import Avatar from "../../../modules/Avatar";
import DataTable from "../../../modules/DataTable";
import Breadcrumb from "../Breadcrumb";
import { useDeleteVisitor, useFetchVisitors } from "../../../hooks/useVisitors";
import Search from "../../../modules/Search";
import Pager from "../../../modules/Pager";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const VisitorsAll = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, isLoading, error } = useFetchVisitors();
  const { mutateAsync } = useDeleteVisitor();

  if (error) {
    console.error(t("errorFetchingVisitors"), error);
    return <div>{t("errorFetchingVisitorsMessage")}</div>;
  }

  const visitors = data?.data || [];
  const meta = data?.meta;

  const handleDelete = async ({ id }) => {
    if (window.confirm(t("visitors.all.deleteConfirm"))) {
      try {
        await mutateAsync(id);
        toast.success(t("visitors.all.deleteSuccess"));
      } catch (error) {
        console.error(t("errorDeletingVisitor"), error);
        toast.error(t("visitors.all.deleteError"));
      }
    }
  };

  const handleEdit = ({ id }) => {
    navigate(`/visitors/edit/${id}`);
  };

  const handleView = ({ id }) => {
    navigate(`/visitors/view/${id}`);
  };

  const headItems = [
    "#",
    t("visitors.all.photo"),
    t("visitors.all.name"),
    t("visitors.all.email"),
    t("visitors.all.phone"),
    t("visitors.all.actions"),
  ];

  const items = visitors.map((visitor, index) => ({
    id: visitor.id,
    avatar: visitor.avatar ? (
      <Avatar size="64px" src={visitor.avatar} alt={visitor.name} />
    ) : (
      <div className="avatar-placeholder">N/A</div>
    ),
    name: visitor.name,
    email: visitor.email || "N/A",
    phone: visitor.phone || "N/A",
  }));

  return (
    <div className="user-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
          { label: t("breadcrumbs.visitors") },
        ]}
      />

      <div className="head-wrapper">
        <Search
          path={AppPaths.visitors.all}
          placeholder={t("visitors.all.searchPlaceholder")}
        />

        <Button type="button" variant="primary" className="add-btn">
          <Link to={AppPaths.visitors.add}>{t("visitors.all.add")}</Link>
        </Button>
      </div>
      <hr className="navigation-underline" />

      <DataTable
        isLoading={isLoading}
        withAction
        headItems={headItems}
        items={items}
        actionItems={[
          {
            text: <FaEye />,
            variant: "info",
            tooltip: t("visitors.all.view"),
            onClick: handleView,
          },
          {
            text: <FaEdit />,
            variant: "warning",
            tooltip: t("visitors.all.edit"),
            onClick: handleEdit,
          },
          {
            text: <FaRegTrashAlt />,
            variant: "danger",
            tooltip: t("visitors.all.delete"),
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
