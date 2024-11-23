import React from "react";
import "./style.scss";

const Add = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Department form submitted");
  };

  return (
    <div className="department-add-container">
      <h1 className="department-add">Department - Add</h1>
      <form className="department-add-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter department name"
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="parent">Parent</label>
          <select id="parent" name="parent" required>
            <option value="" disabled selected>
              Select parent department
            </option>
            <option value="1">Parent Department 1</option>
            <option value="2">Parent Department 2</option>
            <option value="3">Parent Department 3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="office">Office</label>
          <select id="office" name="office" required>
            <option value="" disabled selected>
              Select office
            </option>
            <option value="A">Office A</option>
            <option value="B">Office B</option>
            <option value="C">Office C</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;
