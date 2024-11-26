import React, { useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { addOffice } from "../../../store/reducers/officeReducer";
import { toast } from 'react-toastify';


const OfficeAdd = ({ entity }) => {
  const [formData, setFormData] = useState({
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
    setLoading(true);
    dispatch(addOffice(formData));
    setFormData({ name: "", address: "", phone: "" }); // Очистка формы
    setLoading(false);
    toast.success("Office Successfully Added")
  };

  return (
    <div className="offices-add-container">
      <h1 className="offices-add">{entity} - Add</h1>
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
