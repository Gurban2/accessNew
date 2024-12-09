import React from "react";
import { useTranslation } from "react-i18next";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AppPaths } from "../../../constants/appPaths";
import {
  useDeleteDepartment,
  useFetchDepartments,
} from "../../../hooks/useDepartments";
import DataTable from "../../../modules/DataTable";
import Breadcrumb from "../Breadcrumb";
import "./style.scss";
import Pager from "../../../modules/Pager";
import Search from "../../../modules/Search";

const DepartmentsAll = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, isLoading } = useFetchDepartments();
  const departments = data?.data;
  const meta = data?.meta;

  const { mutateAsync: deleteDepartment } = useDeleteDepartment();

  const handleDelete = async (id) => {
    if (window.confirm(t("department.all.deleteConfirm"))) {
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

  const headItems = [
    "#",
    t("department.all.name"),
    t("department.all.phone"),
    t("department.all.address"),
    t("department.all.office"),
    t("department.all.actions"),
  ];

  const items = departments?.map((department, index) => ({
    id: department.id,
    departmentName: department.name,
    phone: department.phone,
    address: department.address,
    office: department.office,
  }));

  return (
    <div className="departments-all-container">
      <div className="departments-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: t("breadcrumb.dashboard"), to: AppPaths.dashboard },
            {
              label: t("breadcrumb.departments"),
              to: AppPaths.departments.all,
            },
          ]}
        />
        <div className="search-add-departments">
          <Search
            path={AppPaths.departments.all}
            placeholder={t("department.all.searchPlaceholder")}
          />
        </div>
      </div>
      <hr className="navigation-underline" />

      <DataTable
        isLoading={isLoading}
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

      <Pager
        currentPage={meta?.current_page}
        hasNext={meta?.has_next}
        totalPage={meta?.total_page}
      />
    </div>
  );
};

export default DepartmentsAll;
