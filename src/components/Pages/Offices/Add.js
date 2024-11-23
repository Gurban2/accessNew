import React, { useState } from "react";
import "./style.scss";

const Add = ({ entity, onAdd }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });

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
    if (typeof onAdd === "function") {
      onAdd(formData); // Передача данных
      setFormData({ firstName: "", lastName: "", username: "" }); // Очистка формы
    } else {
      console.error("onAdd is not a function or not provided.");
    }
    setLoading(false);
  };

  return (
    <div className="offices-add-container">
      <h1 className="offices-add">{entity} - Add</h1>
      <form className="offices-add-form" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            value={formData.username}
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

export default Add;
