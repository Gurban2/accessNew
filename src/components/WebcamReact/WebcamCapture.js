import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import Webcam from "react-webcam";

const WebcamCapture = ({ onCapture, onCancel }) => {
  const webcamRef = useRef(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  };

  return (
    <div className="webcam-capture-container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam-preview"
      />
      <Button type="button" onClick={handleCapture} className="capture-button">
        Capture Photo
      </Button>
      <Button type="button" onClick={onCancel} className="cancel-webcam">
        Cancel
      </Button>
    </div>
  );
};

export default WebcamCapture;
