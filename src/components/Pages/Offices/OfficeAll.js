import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteOffice } from "../../../store/reducers/officeReducer";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import DataTable from "../../../modules/DataTable";
import Breadcrumb from "../Breadcrumb";
import { AppPaths } from "../../../constants/appPaths";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./style.scss";

const OfficeAll = () => {
  const { t } = useTranslation();

  const offices = useSelector((state) => state.offices);
  const [searchQuery] = useState("");
  const dispatch = useDispatch();
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

  const handleDelete = (id) => {
    if (window.confirm(t("office.add.deleteConfirm"))) {
      dispatch(deleteOffice({ id }));
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

  // Format items for the DataTable
  const items = filteredOffices.map((office, index) => ({
    id: office.id,
    officeName: office.name,
    address: office.address,
    phoneNumber: office.phone,
    departments: office.departmentName,
    actions: (
      <>
        <Button
          variant="warning"
          className="w-100"
          onClick={() => handleEdit(office.id)}
        >
          <FaEdit />
        </Button>{" "}
        <Button
          variant="danger"
          className="w-100"
          onClick={() => handleDelete(office.id)}
        >
          <FaRegTrashAlt />
        </Button>
      </>
    ),
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
            <Link to="/offices/add">{t("office.add.add")}</Link>
          </Button>
        </div>
      </div>
      <hr className="navigation-underline" />

      <DataTable
        withAction
        headItems={headItems}
        tableProps={{ striped: true, bordered: true, hover: true }}
        items={items}
      />
    </div>
  );
};

export default OfficeAll;
