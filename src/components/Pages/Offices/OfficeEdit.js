import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editOffice } from "../../../store/reducers/officeReducer";

const OfficeEdit = () => {
  const { id } = useParams(); // Получаем id из параметров маршрута
  console.log(id);
  //   console.log(params);
  const dispatch = useDispatch();
  const office = useSelector((state) =>
    state.offices.find((office) => office.id === id)
  );

  const [formData, setFormData] = React.useState({
    name: office?.name || "",
    address: office?.address || "",
    phone: office?.phone || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editOffice({ id, data: formData })); // Обновляем данные офиса
  };

  if (!office) {
    return <p>Office not found</p>; // Если офиса с таким id нет
  }

  return (
    <div>
      <h1>Edit Office</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Office Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
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

export default OfficeEdit;
