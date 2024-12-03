import React, { useState } from "react";
import Modal from "../Modal";
import WebcamCapture from "../../components/WebcamReact";
import { Button, Form } from "react-bootstrap";

const Capture = ({ onClose, handleCapture, btnText, onConfirm }) => {
  const [useWebcam, setUseWebcam] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const fileInputRef = React.createRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result);
      handleCapture(reader.result);
    };
  };

  const handleWebcamCapture = (imageSrc) => {
    setPhotoPreview(imageSrc);
    handleCapture(imageSrc);
    setUseWebcam(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <Modal onConfirm={onConfirm} btnText={btnText} centered>
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
        <WebcamCapture onCapture={handleWebcamCapture} onCancel={onClose} />
      )}

      {photoPreview && (
        <img src={photoPreview} alt="Preview" style={{ width: "100%" }} />
      )}
    </Modal>
  );
};

export default Capture;
