import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addVisitor } from "../../../store/reducers/visitorReducer"; // Путь к вашему редьюсеру
import { toast } from "react-toastify";
import "./style.scss";

const VisitorsAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    fin: "",
    email: "",
    address: "",
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
    if (
      !formData.name ||
      !formData.phone ||
      !formData.fin ||
      !formData.email ||
      !formData.address
    ) {
      setError("All fields are required!");
      return false;
    }
    return true;
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // Set loading to true when submitting
    dispatch(addVisitor(formData)); // Dispatch addVisitor action
    setFormData({
      name: "",
      phone: "",
      fin: "",
      email: "",
      address: "",
    }); // Clear form after submission
    setLoading(false); // Reset loading state
    toast.success("Visitor successfully added");
  };
  
  return (
    <div className="visitor-add-container">
      <h1 className="visitor-add">Visitors - Add</h1>
      <form className="visitor-add-form" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
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
            placeholder="Enter Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fin">Fin</label>
          <input
            type="text"
            id="fin"
            name="fin"
            placeholder="Enter Fin"
            value={formData.fin}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
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
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default VisitorsAdd;

