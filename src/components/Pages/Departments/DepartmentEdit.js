import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editDepartment } from "../../../store/reducers/departmentReducer";

const DepartmentEdit = () => {
  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch();
  const department = useSelector((state) =>
    state.departments.find((department) => department.id === id)
  );

  const [formData, setFormData] = React.useState({
    name: department?.name || "",
    address: department?.address || "",
    phone: department?.phone || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editDepartment({ id, data: formData })); // Обновляем данные офиса
  };

  if (!department) {
    return <p>department not found</p>; // Если офиса с таким id нет
  }

  return (
    <div>
      <h1>Edit Department</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Department Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Office</label>
          <input
            type="select"
            name="Office"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default DepartmentEdit;
