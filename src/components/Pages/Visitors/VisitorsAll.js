import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteVisitor } from "../../../store/reducers/visitorReducer";
import { FaEdit, FaEye, FaRegTrashAlt } from "react-icons/fa";
import DataTable from "../../../modules/DataTable";
import Avatar from "../../../modules/Avatar";
import Breadcrumb from "../Breadcrumb";
import { AppPaths } from "../../../constants/appPaths";

const VisitorsAll = () => {
  const visitors = useSelector((state) => state.visitors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery] = useState("");

  const filteredVisitors = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return visitors?.filter(
      (visitor) =>
        visitor.name.toLowerCase().includes(query) ||
        visitor.phone.toLowerCase().includes(query) ||
        visitor.fin.toLowerCase().includes(query)
    );
  }, [searchQuery, visitors]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Visitor?")) {
      setIsLoading(true);
      try {
        dispatch(deleteVisitor({ id }));
      } catch (error) {
        console.error("Error deleting visitor", error);
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

  const headItems = ["#", "Photo", "Name", "Phone", "Fin", "Actions"];

  const items = filteredVisitors.map((visitor, index) => ({
    id: visitor.id,
    photo: <Avatar size="64px" src={visitor.photo} alt={visitor.name} />,
    name: visitor.name,
    phone: visitor.phone,
    fin: visitor.fin,
  }));

  if (!visitors || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="visitors-all-container">
      <Breadcrumb
        paths={[
          { label: "Dashboard", to: AppPaths.dashboard.home },
          { label: "Visitors" },
        ]}
      />
      <DataTable
        withAction
        headItems={headItems}
        tableProps={{ striped: true, bordered: true, hover: true }}
        items={items}
        actionItems={[
          {
            text: (
              <>
                <FaEye /> View
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
