import React, { useRef } from "react";
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
      <button
        type="button"
        onClick={handleCapture}
        className="capture-button"
      >
        Capture Photo
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="cancel-webcam"
      >
        Cancel
      </button>
    </div>
  );
};

export default WebcamCapture;
