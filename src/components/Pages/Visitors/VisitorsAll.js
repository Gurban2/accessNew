import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FaEdit, FaEye, FaRegTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppPaths } from "../../../constants/appPaths";
import Avatar from "../../../modules/Avatar";
import DataTable from "../../../modules/DataTable";
import { deleteVisitor } from "../../../store/reducers/visitorReducer";
import Breadcrumb from "../Breadcrumb";

const VisitorsAll = () => {
  const { t } = useTranslation();

  const visitors = useSelector((state) => state.visitors.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVisitors = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return visitors?.filter(
      (visitor) =>
        visitor.name.toLowerCase().includes(query) ||
        visitor.phone.toLowerCase().includes(query) ||
        visitor.fin.toLowerCase().includes(query),
    );
  }, [searchQuery, visitors]);

  const handleDelete = async (id) => {
    if (window.confirm(t("visitorDeleteConfirm"))) {
      setIsLoading(true);
      try {
        dispatch(deleteVisitor({ id }));
      } catch (error) {
        console.error(t("errorDeletingVisitor"), error);
      }
      setIsLoading(false);
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
    t("name"),
    t("phone"),
    t("fin"),
    t("actions"),
  ];

  const items = filteredVisitors.map((visitor, index) => ({
    id: visitor.id,
    photo: <Avatar size="64px" src={visitor.photo} alt={visitor.name} />,
    name: visitor.name,
    phone: visitor.phone,
    fin: visitor.fin,
  }));

  if (isLoading) {
    return <p>{t("loading")}</p>;
  }

  if (!visitors || visitors.length === 0) {
    return <p>{t("noVisitorsFound")}</p>; // Display a message when no visitors are found
  }

  return (
    <div className="visitors-all-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumb.dashboard"), to: AppPaths.dashboard.home },
          { label: t("breadcrumb.visitors") },
        ]}
      />
      <div className="search-bar">
        <input
          type="text"
          placeholder={t("searchVisitors")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <DataTable
        withAction
        headItems={headItems}
        tableProps={{ striped: true, bordered: true, hover: true }}
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
    </div>
  );
};

export default VisitorsAll;
