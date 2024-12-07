import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { AppPaths } from "../../../constants/appPaths";
import { useDeleteOffice, useFetchOffices } from "../../../hooks/useOffices";
import DataTable from "../../../modules/DataTable";
import Breadcrumb from "../Breadcrumb";
import "./style.scss";

const OfficeAll = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  // Загружаем офисы с фильтрацией
  const { data: offices, isLoading } = useFetchOffices(query);

  const { mutateAsync: deleteOffice } = useDeleteOffice();

  const handleDelete = async (id) => {
    if (window.confirm(t("office.add.deleteConfirm"))) {
      try {
        await deleteOffice(id);
        toast.success("Office successfully deleted");
      } catch (error) {
        toast.error("An error occurred while deleting the office");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/offices/edit/${id}`);
  };

  const headItems = [
    "#",
    t("office.add.officeName"),
    t("office.add.address"),
    t("office.all.phoneNumber"),
    t("office.all.actions"),
  ];

  const items = offices?.map((office) => ({
    id: office.id,
    name: office.name,
    address: office.address,
    phone: office.phone,
  }));

  return (
    <div className="offices-all-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: t("breadcrumb.dashboard"), to: AppPaths.dashboard.home },
            { label: t("breadcrumb.offices"), to: AppPaths.offices.all },
          ]}
        />
        <div className="search-add-offices">
          <input
            type="text"
            placeholder={t("office.all.search")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search"
          />
          <div>
            <Button type="button" className="searchAddBtn">
              <Link to="/offices/add">{t("office.add.add")}</Link>
            </Button>
          </div>
        </div>
      </div>
      <hr className="navigation-underline" />

      {isLoading ? (
        <div>{t("office.all.loading")}</div>
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
  );
};

export default OfficeAll;
