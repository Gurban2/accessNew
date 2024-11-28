import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDepartment } from "../../../store/reducers/departmentReducer";
import { toast } from "react-toastify";
import "./style.scss";

const DepartmentsAdd = () => {
  const offices = useSelector((state) => state.offices);
  // console.log("Offices массив:", offices);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    parent: "",
    office: "",
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
      !formData.parent ||
      !formData.office
    ) {
      setError("all fields are required!");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;    
    const uniqueId = Date.now().toString();
    const newFormData = { ...formData, id: uniqueId };
    setLoading(true);
    dispatch(addDepartment(newFormData));
    setFormData({ id: "",name: "", phone: "", parent: "", office: "" });
    setLoading(false);
    toast.success("Department successfully added");
  };

  return (
    <div className="department-add-container">
      <h1 className="department-add">Department - add</h1>
      <form className="department-add-form" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter department name"
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
            placeholder="Enter department phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="parent">Parent</label>
          <select
            id="parent"
            name="parent"
            value={formData.parent}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select parent department
            </option>
            <option value="1">Parent Department 1</option>
            <option value="2">Parent Department 2</option>
            <option value="3">Parent Department 3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="office">Office</label>
          <select
            id="office"
            name="office"
            value={formData.office}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select office
            </option>
            {offices.map((office) => (
              <option key={office.id} value={office.name}>
                {office.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default DepartmentsAdd;
