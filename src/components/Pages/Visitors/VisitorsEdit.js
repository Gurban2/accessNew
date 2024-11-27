import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editVisitor } from "../../../store/reducers/visitorReducer";
import { toast } from "react-toastify";
import "./style.scss";

const VisitorsEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const visitor = useSelector((state) => {
    console.log("Redux visitors:", state.visitors); // Log the entire visitors list
    state.visitors.find((visitor) => visitor.id === id)
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    fin: "",
    email: "",
    address: "",
    description: "",
  });

  useEffect(() => {
    if (visitor) {
      setFormData({
        name: visitor.name,
        phone: visitor.phone,
        fin: visitor.fin,
        email: visitor.email,
        address: visitor.address,
        description: visitor.description
      });
    }
  }, [visitor]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill all the fields");
      return;
    }
    dispatch(editVisitor({ id: visitor.id, data: formData }));
    toast.success("Visitor successfully edited");
    navigate("/visitors/all"); // After saving, navigate back to visitors list
  };

  if (!visitor) {
    return <p>visitor not found</p>; // Если офиса с таким id нет
  }

  return (
    <div className="visitor-add-container">
      <h1 className="visitor-add">Edit Visitor</h1>
      <form className="visitor-add-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Visitor Name</label>
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
          <label htmlFor="fin">Fin</label>
          <input
            type="text"
            name="fin"
            value={formData.fin}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
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
        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
};

export default VisitorsEdit;
