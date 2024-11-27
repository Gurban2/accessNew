import React, { useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editDepartment } from "../../../store/reducers/departmentReducer";
import { toast } from "react-toastify";
import "./style.scss";

const DepartmentEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const offices = useSelector((state) => state.offices);

  const department = useSelector((state) =>
    state.departments.departmentsData.find((department) => department.id === id)
  );

  const [formData, setFormData] = React.useState({
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name,
        office: department.office,
        phone: department.phone,
      });
    }
  }, [department]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editDepartment({ id: department.id, data: formData })); // Обновляем данные офиса
    toast.success("Department successfully edited");
    navigate("/departments/all");
  };

  if (!department) {
    return <p>department not found</p>; // Если офиса с таким id нет
  }

  return (
    <div className="department-add-container">
      <h1 className="department-add">Edit Department</h1>
      <form className="department-add-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Department Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>        
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Office</label>
          <select
            type="select"
            id="office"
            name="office"
            value={formData.office}
            onChange={handleChange}
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
        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
};

export default DepartmentEdit;
