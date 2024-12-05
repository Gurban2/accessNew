import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Breadcrumb from "../Breadcrumb";
import Search from "../../Searchbar";

import "./style.scss";
import { AppPaths } from "../../../constants/appPaths";
import { Button } from "react-bootstrap";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useDeleteOffice, useFetchOffices } from "../../../hooks/useOffices";
import DataTable from "../../../modules/DataTable";
import { toast } from "react-toastify";

const OfficeAll = () => {
  const { isLoading } = useFetchOffices();
  const { mutateAsync } = useDeleteOffice();
  const { data: offices } = useSelector((state) => state.offices);
  const [filteredOffices, setFilteredOffices] = useState(offices);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredOffices(offices);
  }, [offices]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this office?")) {
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

  const breadCrumbs = [
    { label: "Dashboard", to: AppPaths.dashboard.home },
    { label: "Offices", to: AppPaths.offices.all },
  ];

  const headItems = ["#", "Office Name", "Address", "Phone Number", "Actions"];
  const items = filteredOffices?.map((office, index) => ({
    id: office.id,
    name: office.name,
    address: office.address,
    phone: office.phone,
  }));

  return (
    <div className="offices-all-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb paths={breadCrumbs} />
        <div className="searchAddBtn">
          <Search
            data={offices}
            onFilter={setFilteredOffices}
            placeholder="Search offices..."
          />
          <Button type="button">
            <Link to={AppPaths.offices.add}>Add Office</Link>
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
