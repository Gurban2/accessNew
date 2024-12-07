import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { AppPaths } from "../../../constants/appPaths";
import {
  useDeleteDepartment,
  useFetchDepartments,
} from "../../../hooks/useDepartments";
import DataTable from "../../../modules/DataTable";
import Breadcrumb from "../Breadcrumb";
import "./style.scss";

const DepartmentsAll = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Состояние для поиска
  const [query, setQuery] = useState("");

  // Загружаем департаменты с фильтрацией по запросу
  const {
    data: departments,
    isLoading,
    isError,
    refetch,
  } = useFetchDepartments(query);

  const { mutateAsync: deleteDepartment } = useDeleteDepartment();

  const handleDelete = async (id) => {
    if (window.confirm(t("department.deleteConfirm"))) {
      try {
        await deleteDepartment(id);
        toast.success("Department successfully deleted");
      } catch (error) {
        toast.error("An error occurred while deleting the department");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/departments/edit/${id}`);
  };

  // Head items для DataTable
  const headItems = [
    "#",
    t("department.all.name"),
    t("department.all.phone"),
    t("department.all.office"),
    t("department.all.actions"),
  ];

  const items = Array.isArray(departments)
    ? departments.map((department, index) => ({
        id: department.id,
        departmentName: department.name,
        phone: department.phone,
        office: department.office,
      }))
    : [];

  return (
    <div className="departments-all-container">
      <div className="departments-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: t("breadcrumb.dashboard"), to: AppPaths.dashboard.home },
            {
              label: t("breadcrumb.departments"),
              to: AppPaths.departments.all,
            },
          ]}
        />
        <div className="search-add-departments">
          <input
            type="text"
            placeholder={t("department.all.search")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search"
          />
          <div className="searchAddBtn">
            {/* <Button type="button">
              <Link to="/departments/add">{t("department.all.add")}</Link>
              <div>
                <Button type="button" className="searchAddBtn">
                  <Link to="/departments/add">{t('department.all.add')}</Link>
                </Button>
              </div> */}
            <Link to="/departments/add">
              <Button type="button">{t("department.all.add")}</Button>
            </Link>
          </div>
        </div>
        <hr className="navigation-underline" />

        {/* Show loading indicator or DataTable */}
        {isLoading ? (
          // <div>{t("department.all.loading")}</div> // Loading message
          <div>
            <Spinner animation="border" /> {t("department.all.loading")}
          </div>
        ) : isError ? (
          <div>{t("department.all.error")}</div> // Error message
        ) : (
          <DataTable
            withAction
            headItems={headItems}
            tableProps={{ striped: true, bordered: true, hover: true }}
            items={items}
            actionItems={[
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
        )}
      </div>
    </div>
  );
};

export default DepartmentsAll;
