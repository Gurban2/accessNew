import React, { useEffect } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editOffice } from "../../../store/reducers/officeReducer";
import { toast } from "react-toastify";

const OfficeEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const office = useSelector((state) =>
    state.offices.find((office) => office.id === Number(id)) // Ensure type match
  );

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editOffice({ id: office.id, data: formData })); // Обновляем данные офиса
    toast.success("Office successfully edited");
  };

  if (!office) {
    return <p>Office not found</p>; // Если офиса с таким id нет
  }

  return (
    <div className="offices-add-container">
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
        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
};

export default OfficeEdit;
