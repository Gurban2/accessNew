import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import Breadcrumb from "../Breadcrumb";
import { AppPaths } from "../../../constants/appPaths";
import { useDeleteOffice, useFetchOffices } from "../../../hooks/useOffices";
import DataTable from "../../../modules/DataTable";
import "./style.scss";

const OfficeAll = () => {
  const { isLoading } = useFetchOffices();
  const { mutateAsync } = useDeleteOffice();
  const { data: offices } = useSelector((state) => state.offices);

  const { t } = useTranslation();

  const [searchQuery] = useState("");
  const navigate = useNavigate();

  // Filter offices based on the search query
  const filteredOffices = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return offices?.filter(
      (office) =>
        office.name.toLowerCase().includes(query) ||
        office.phone.toLowerCase().includes(query) ||
        office.address.toLowerCase().includes(query)
    );
  }, [searchQuery, offices]);

  const handleDelete = async (id) => {
    if (window.confirm(t("office.add.deleteConfirm"))) {
      try {
        await mutateAsync(id);
        toast.success("Office successfully deleted");
      } catch (error) {
        toast.error("An error occurred while deleting the office");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/offices/edit/${id}`);
  };

  // Head items for the DataTable
  const headItems = [
    "#",
    t("office.add.officeName"),
    t("office.add.address"),
    t("office.all.phoneNumber"),
    t("office.all.departments"),
    t("office.all.actions"),
  ];

  const items = filteredOffices?.map((office, index) => ({
    id: office.id,
    name: office.name,
    address: office.address,
    phone: office.phone,
    departments: office.departmentName,
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
        <div className="searchAddBtn">
          <Button type="button">
            <Link to={AppPaths.offices.add}>{t("office.add.add")}</Link>
          </Button>
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
            onClick: handleEdit,
          },
          {
            text: <FaRegTrashAlt />,
            variant: "danger",
            onClick: handleDelete,
          },
        ]}
      />
    </div>
  );
};

export default OfficeAll;
