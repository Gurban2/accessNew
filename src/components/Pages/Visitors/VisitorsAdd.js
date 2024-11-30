import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import WebcamCapture from "../../WebcamReact/WebcamCapture";
import { addVisitor } from "../../../store/reducers/visitorReducer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "./style.scss";
import { Forum } from "@mui/icons-material";

const VisitorsAdd = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [useWebcam, setUseWebcam] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    photo: "",
    name: "",
    phone: "",
    fin: "",
    email: "",
    address: "",
    description: "",
  });

  const handleCapture = (imageSrc) => {
    setPhotoPreview(imageSrc);
    setFormData((prev) => ({
      ...prev,
      photo: imageSrc,
    }));
    setUseWebcam(false);
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "photo" && files && files[0]) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        photo: file,
      }));
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handlePhoneChange = (event) => {
    const { name, value } = event.target;
    const numericValue = value.replace(/[^0-9+-]/g, "").slice(0, 24);
    setFormData((prevData) => ({
      ...prevData,
      [name]: numericValue,
    }));
  };

  const validateForm = () => {
    setError(null);
    if (
      !formData.name ||
      !formData.phone ||
      !formData.fin ||
      !formData.email ||
      !formData.address ||
      !formData.photo ||
      !formData.description
    ) {
      setError("All fields are required!");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    const currentTime = new Date().toISOString();
    const uniqueId = Date.now().toString();
    const newFormData = {
      ...formData,
      id: uniqueId,
      createdAt: currentTime
    };
    setLoading(true);
    dispatch(addVisitor(newFormData));

    setFormData({
      id: "",
      photo: "",
      name: "",
      phone: "",
      fin: "",
      email: "",
      address: "",
      description: "",
    });
    setPhotoPreview(null);
    setLoading(false);
    toast.success("Visitor successfully added");
  };

  const handleCancel = () => {
    navigate("/visitors/all");
  };

  return (
    <div className="visitor-add-container">
      <nav className="breadcrumb">
        <Link to="/">Dashboard</Link> &gt;{" "}
        <Link to="/visitors/all">Visitors</Link> &gt; <span>Add Visitor</span>
      </nav>
      <Form className="form-container" onSubmit={handleSubmit}>
        <Form.Label className="form-label-head">Visitor add</Form.Label>
        {error && <div className="error">{error}</div>}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label className="form-label-head">Name</Form.Label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="phone">
            <Form.Label className="form-label-head">Phone</Form.Label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter Phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              inputMode="tel"
              pattern="^\+?\d{1,4}-?\d{1,24}$"
              title="Phone number format: +[country code]-[number], up to 24 digits"
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="fin">
            <Form.Label className="form-label-head">Fin</Form.Label>
            <input
              type="text"
              id="fin"
              name="fin"
              placeholder="Enter Fin"
              value={formData.fin}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="photo">
            <Form.Label className="form-label-head" htmlFor="photo">Photo</Form.Label>
            <div className="photo-input">
              {useWebcam ? (
                <WebcamCapture
                  onCapture={handleCapture}
                  onCancel={() => setUseWebcam(false)}
                />
              ) : (
                <>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setUseWebcam(true)}
                    className="webcam-button"
                  >
                    Use Webcam
                  </button>
                </>
              )}
            </div>
            {photoPreview && (
              <div className="photo-preview">
                <img src={photoPreview} alt="Preview" />
              </div>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="email">
            <Form.Label className="form-label-head" htmlFor="email">Email</Form.Label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              title="@mail.com"
            // required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="address">
            <Form.Label className="form-label-head" htmlFor="address">Address</Form.Label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col}  className="mb-3" controlId="ControlTextarea">
            <Form.Label className="form-label-head">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Description"
              required
            />

          </Form.Group>
        </Row>
        <Row className="mb-3 d-flex justify-content-end">
        <Button variant="success" type="submit"  disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
        <Button variant="danger" type="cancel" onClick={handleCancel} >
          Cancel
        </Button>
          </Row>        
        
      </Form>
    </div>
  );
};

export default VisitorsAdd;
