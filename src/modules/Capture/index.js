import React, { useState } from "react";
import Modal from "../Modal";
import WebcamCapture from "../../components/WebcamReact";
import { FaPlus } from "react-icons/fa";

const Capture = ({ btnText, onConfirm, btnClassName, photo }) => {
  const [showModal, setShowModal] = useState(false);
  const [useWebcam, setUseWebcam] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleWebcamCapture = (imageSrc) => {
    setPhotoPreview(imageSrc);
    setUseWebcam(false);
  };

  const handleConfirm = () => {
    onConfirm(photoPreview);
    reset();
  };
  const reset = () => {
    setPhotoPreview(null);
    setUseWebcam(true); 
  };

  return (
    <>
      <div
        className="photo-input"
        onClick={() => {
          setShowModal(true);
          setUseWebcam(true);
        }}
      >
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
        onCancel={() => setShowModal(false)}
        onConfirm={handleConfirm}
        btnText={btnText}
        btnClassName={btnClassName}
        centered
      >
        {useWebcam && (
          <WebcamCapture
            onCapture={handleWebcamCapture}
          />
        )}

        {photoPreview && (
         <div>
         <img src={photoPreview} alt="Preview" style={{ width: "100%" }} />
         <div className="mt-3">
           <button type="button" onClick={reset} className="btn btn-secondary">
             Reset
           </button>
         </div>
       </div>
        )}
      </Modal>
    </>
  );
};

export default Capture;
