import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import Webcam from 'react-webcam';
import './style.scss';

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  };

  return (
    <div className="webcam">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam-preview"
      />

      <div className="webcam-actions">
        <Button
          type="button"
          onClick={handleCapture}
          className="capture-button"
        >
          Capture Photo
        </Button>
      </div>
    </div>
  );
};

export default WebcamCapture;
