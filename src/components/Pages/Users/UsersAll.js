import React from "react";
import { Breadcrumb, Button } from "react-bootstrap";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import DataTable from "../../../modules/DataTable";
import "./style.scss";
import { useDeleteUser, useFetchUsers } from "../../../hooks/useUser";
import Search from "../../../modules/Search";
import { AppPaths } from "../../../constants/appPaths";
import Pager from "../../../modules/Pager";
import { toast } from "react-toastify";

const UsersAll = () => {
  const { data, isLoading } = useFetchUsers();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const users = data?.data || [];
  const meta = data?.meta || {};

  const navigate = useNavigate();

  const handleDelete = async ({ id }) => {
    if (window.confirm("Are you sure you want to delete this User?")) {
      try {
        await deleteUser(id);
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error("Failed to delete User");
      }
    }
  };

  const handleEdit = ({ id }) => {
    navigate(`/users/edit/${id}`);
  };

  const headItems = [
    "#",
    "Name",
    "Office",
    "Department",
    "Phone",
    "Email",
    "Role",
    "Actions",
  ];

  const items = users.map((user) => ({
    id: user.id,
    name: user.username,
    office: user.office,
    department: user.department,
    phone: user.phone,
    email: user.email,
    role: user.role,
  }));

  return (
    <div className="user-all-container">
      <div className="user-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: "Dashboard", to: AppPaths.dashboard },
            { label: "Users", to: AppPaths.users.all },
          ]}
        />

        <div>
          <Button type="button">
            <Link to={AppPaths.users.add}>Add Users</Link>
          </Button>

          <Search path={AppPaths.users.all} placeholder={"Search user"} />
        </div>
      </div>
      <hr className="navigation-underline" />
      <DataTable
        headItems={headItems}
        items={items}
        isLoading={isLoading}
        withAction
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

export default UsersAll;
