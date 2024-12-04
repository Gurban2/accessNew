import React, { useState } from "react";
import Modal from "../Modal";
import WebcamCapture from "../../components/WebcamReact";
import { Button, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

const Capture = ({ btnText, onConfirm, btnClassName, photo }) => {
  const [showModal, setShowModal] = useState(false);
  const [useWebcam, setUseWebcam] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const fileInputRef = React.createRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Convert file to data URL
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPhotoPreview(reader.result);
    };
  };

  const handleWebcamCapture = (imageSrc) => {
    setPhotoPreview(imageSrc);
    setUseWebcam(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleConfirm = () => {
    onConfirm(photoPreview);
    reset();
  };

  const reset = () => {
    setPhotoPreview(null);
    setUseWebcam(false);
    setShowModal(false);
  };

  return (
    <>
      <div className="photo-input" onClick={() => setShowModal(true)}>
        {photo && (
          <div className="photo-preview">
            <img src={photo} alt="Preview" />
          </div>
        )}

        {!photo && <FaPlus className="photo-input-icon" size={30} />}
      </div>
      <Modal
        hideBtn
        defaultShow={showModal}
        onCancel={reset}
        onConfirm={handleConfirm}
        btnText={btnText}
        btnClassName={btnClassName}
        centered
      >
        <div className="d-flex justify-content-between">
          <div style={{ flex: 1, marginRight: "10px" }}>
            <Form.Control
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <Button variant="primary" onClick={handleButtonClick}>
              Choose File
            </Button>
          </div>
          <div style={{ flex: 1 }}>
            <Button
              type="button"
              onClick={() => setUseWebcam(true)}
              className="webcam-button form-control"
            >
              Use Webcam
            </Button>
          </div>
        </div>
        {useWebcam && (
          <WebcamCapture
            onCapture={handleWebcamCapture}
            onCancel={() => setUseWebcam(false)}
          />
        )}

        {photoPreview && !useWebcam && (
          <img src={photoPreview} alt="Preview" style={{ width: "100%" }} />
        )}
      </Modal>
    </>
  );
};

export default Capture;
