<Form.Group as={Col} xs={12} md={3} controlId="photo">
<Form.Label className="form-label-head" htmlFor="photo">
  Photo
</Form.Label>
<div className="photo-input">
  {useWebcam ? (
    <div className="webcam-container">
      <WebcamCapture
        onCapture={(imageSrc) =>
          handleCapture(imageSrc, setFieldValue)
        }
        onCancel={() => {
          setUseWebcam(false);
          setPhotoPreview(null); // Clear photo preview when canceled
        }}
      />
    </div>
  ) : (
    <>
      <input
        type="file"
        name="photo"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          setFieldValue("photo", file);
          setPhotoPreview(URL.createObjectURL(file));
        }}
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
<ErrorMessage name="photo" component="div" className="error" />
</Form.Group>