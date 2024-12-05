import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchOfficeById, useUpdateOffice } from "../../../hooks/useOffices";
import { toast } from "react-toastify";
import Breadcrumb from "../Breadcrumb";

import "./style.scss";
import LoadingForm from "../../../modules/Loading/Form";

const OfficeEdit = () => {
  const { id } = useParams();
  const { mutateAsync: updateOffice } = useUpdateOffice();
  const { data, isLoading } = useFetchOfficeById(id);
  const navigate = useNavigate();

  const office = data?.data;

  const [formData, setFormData] = React.useState({
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (office) {
      setFormData({
        name: office.name,
        address: office.address,
        phone: office.phone,
      });
    }
  }, [office]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateOffice({ id, office: formData });
      toast.success("Office successfully edited");
      navigate("/offices/all");
    } catch (error) {
      toast.error("Error editing office");
    }
  };

  if (isLoading) {
    return <LoadingForm />;
  }

  if (!office) {
    return <p>Office not found</p>;
  }

  return (
    <div className="offices-add-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: "Dashboard", to: "/" },
            { label: "Offices", to: "/Offices/all" },

            { label: "Office - Edit" },
          ]}
        />
      </div>
      <hr className="navigation-underline" />
      <h1 className="offices-add">Edit Office</h1>
      <form className="offices-add-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Office Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default OfficeEdit;
