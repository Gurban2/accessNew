import React, { useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { addOffice } from "../../../store/reducers/officeReducer";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; // Импортируем Link для навигации

const OfficeAdd = ({ entity }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    phone: "",
  });
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    setError(null);
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    const uniqueId = Date.now().toString();
    const newFormData = { ...formData, id: uniqueId };
    setLoading(true);
    dispatch(addOffice(newFormData));

    setFormData({ id: "", name: "", address: "", phone: "" });
    setLoading(false);
    toast.success("Office Successfully Added");
  };

  return (
    <div className="offices-add-container">
      {/* Breadcrumbs section */}
      <nav className="breadcrumbs">
        <Link to="/">Dashboard</Link> &gt; <span>{entity} Add</span>
      </nav>

      <form className="offices-add-form" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label htmlFor="name">Office Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Office Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default OfficeAdd;
