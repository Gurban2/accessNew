import React from "react";
import { useTranslation } from "react-i18next";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AppPaths } from "../../../constants/appPaths";
import { useDeleteOffice, useFetchOffices } from "../../../hooks/useOffices";
import DataTable from "../../../modules/DataTable";
import Breadcrumb from "../Breadcrumb";
import "./style.scss";
import Search from "../../../modules/Search";
import Pager from "../../../modules/Pager";

const OfficeAll = () => {
  const { data, isLoading } = useFetchOffices();
  const { mutateAsync } = useDeleteOffice();
  const offices = data?.data;
  const meta = data?.meta;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDelete = async ({ id }) => {
    if (window.confirm(t("office.all.deleteConfirm"))) {
      try {
        await mutateAsync(id);
        toast.success("Office successfully deleted");
      } catch (error) {
        toast.error("An error occurred while deleting the office");
      }
    }
  };

  const handleEdit = ({ id }) => {
    navigate(`/offices/edit/${id}`);
  };

  const headItems = [
    "#",
    t("office.add.officeName"),
    t("office.add.address"),
    t("office.all.phoneNumber"),
    t("office.all.actions"),
  ];

  const items = offices?.map((office, index) => ({
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
            { label: t("breadcrumb.dashboard"), to: AppPaths.dashboard },
            { label: t("breadcrumb.offices"), to: AppPaths.offices.all },
          ]}
        />
        <Search path={AppPaths.offices.all} placeholder="Search Office" />
      </div>
      <hr className="navigation-underline" />

      <DataTable
        isLoading={isLoading}
        withAction
        headItems={headItems}
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

      <Pager
        currentPage={meta?.current_page}
        hasNext={meta?.has_next}
        totalPage={meta?.total_page}
      />
    </div>
  );
};

export default OfficeAll;
