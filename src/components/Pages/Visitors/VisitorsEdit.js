import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import WebcamCapture from "../../WebcamReact/WebcamCapture";
import { editVisitor } from "../../../store/reducers/visitorReducer";
import { toast } from "react-toastify";
import "./style.scss";

const VisitorsEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(null);
  const [useWebcam, setUseWebcam] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    phone: "",
    fin: "",
    email: "",
    address: "",
    description: "",
  });

  const visitor = useSelector((state) =>
    state.visitors.find((visitor) => visitor.id === id)
  );

  useEffect(() => {
    if (visitor) {
      setFormData({
        name: visitor.name,
        photo: visitor.photo,
        phone: visitor.phone,
        fin: visitor.fin,
        email: visitor.email,
        address: visitor.address,
        description: visitor.description,
      });
      setPhotoPreview(visitor.photo);
    }
  }, [visitor]);

  const handleCapture = (imageSrc) => {
    setPhotoPreview(imageSrc);
    setFormData((prev) => ({
      ...prev,
      photo: imageSrc,
    }));
    setUseWebcam(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo" && files && files[0]) {
      const selectedFile = files[0];
      setFormData((prev) => ({
        ...prev,
        photo: selectedFile,
      }));
      setPhotoPreview(URL.createObjectURL(selectedFile));
    } else {
      setFormData((prev) => ({
        ...prev,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill all the fields");
      return;
    }
    dispatch(editVisitor({ id: visitor.id, data: formData }));
    toast.success("Visitor successfully edited");
    navigate("/visitors/all");
  };

  const handleCancel = () => {
    navigate("/visitors/all");
  };

  if (!visitor) {
    return <p>visitor not found</p>;
  }

  return (
    <div className="visitor-add-container">
      <h1 className="visitor-add">Edit Visitor</h1>
      <form className="visitor-add-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="photo">Photo</label>
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
              {visitor.photo ? (
                typeof visitor.photo === "string" ? (
                  <img
                    src={visitor.photo}
                    alt={`${visitor.name}`}
                    className="visitor-photo"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(visitor.photo)}
                    alt={`${visitor.name}`}
                    className="visitor-photo"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                )
              ) : (
                "No photo"
              )}
            </div>
          )}
        </div>
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
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Save Changes
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="cancel-button"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default VisitorsEdit;
