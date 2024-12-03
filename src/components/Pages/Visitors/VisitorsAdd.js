import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import WebcamCapture from "../../WebcamReact/WebcamCapture";
import { addVisitor } from "../../../store/reducers/visitorReducer";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import { VisitorValidationSchema } from "../InputValidation"; // Импорт схемы
import Breadcrumb from "../Breadcrumb";
import "./style.scss";
import { AppPaths } from "../../../constants/appPaths";
import { FaPlus } from "react-icons/fa";

const VisitorsAdd = () => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [useWebcam, setUseWebcam] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCapture = (imageSrc, setFieldValue) => {
    setPhotoPreview(imageSrc);
    setFieldValue("photo", imageSrc);
    setUseWebcam(false);
    setShowModal(false);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const currentTime = new Date().toISOString();
    const uniqueId = Date.now().toString();
    const newFormData = {
      ...values,
      id: uniqueId,
      createdAt: currentTime,
    };
    dispatch(addVisitor(newFormData));
    setSubmitting(false);
    toast.success("Visitor successfully added");
    navigate("/visitors/all");
  };

  return (
    <div className="visitor-add-container">
      <Breadcrumb
        paths={[
          { label: "Dashboard", to: AppPaths.dashboard.home },
          { label: "Visitors", to: AppPaths.visitors.all },
          { label: "Add Visitor", to: AppPaths.visitors.add },
        ]}
      />

      <hr className="navigation-underline" />

      <Formik
        initialValues={{
          name: "",
          phone: "",
          fin: "",
          email: "",
          address: "",
          description: "",
          photo: "",
        }}
        validationSchema={VisitorValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, errors, touched }) => (
          <FormikForm className="form-container">
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md={3} controlId="photo">
                <Form.Label className="form-label-head">Photo</Form.Label>
                <div
                  className="photo-input"
                  onClick={() => setShowModal(true)} // Open the modal when clicked
                >
                  {photoPreview ? (
                    <div className="photo-preview">
                      <img src={photoPreview} alt="Preview" />
                    </div>
                  ) : (
                    <div className="photo-placeholder">
                      <FaPlus />
                    </div>
                  )}
                </div>
                <ErrorMessage name="photo" component="div" className="error" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md={6} controlId="name">
                <Form.Label className="form-label-head">Name</Form.Label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  className="form-control"
                />
                <ErrorMessage name="name" component="div" className="error" />
              </Form.Group>
              <Form.Group as={Col} xs={12} md={6} controlId="phone">
                <Form.Label className="form-label-head">Phone</Form.Label>
                <Field
                  type="tel"
                  name="phone"
                  placeholder="Enter Phone"
                  className="form-control"
                />
                <ErrorMessage name="phone" component="div" className="error" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md={6} controlId="fin">
                <Form.Label className="form-label-head">Fin</Form.Label>
                <Field
                  type="text"
                  name="fin"
                  placeholder="Enter Fin"
                  className="form-control"
                />
                <ErrorMessage name="fin" component="div" className="error" />
              </Form.Group>
              <Form.Group as={Col} xs={12} md={6} controlId="email">
                <Form.Label className="form-label-head">Email</Form.Label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="form-control"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md={6} controlId="address">
                <Form.Label className="form-label-head">Address</Form.Label>
                <Field
                  type="text"
                  name="address"
                  placeholder="Enter Address"
                  className="form-control"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="error"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md={12} controlId="ControlTextarea">
                <Form.Label className="form-label-head">Description</Form.Label>
                <Field
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Enter Description"
                  className="form-control"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error"
                />
              </Form.Group>
            </Row>
            <Row className="mb-1 d-flex justify-content-end">
              <Button
                as={Col}
                xs={12}
                md={2}
                sm={1}
                variant="success"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
              <Button
                as={Col}
                xs={12}
                md={2}
                variant="danger"
                type="button"
                onClick={() => navigate("/visitors/all")}
              >
                Cancel
              </Button>
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Capture/Upload Photo</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="d-flex justify-content-between">
                  <div style={{ flex: 1, marginRight: "10px" }}>
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFieldValue("photo", file);
                        setPhotoPreview(URL.createObjectURL(file));
                        setShowModal(false); // Close the modal after selecting
                      }}
                      className="form-control"
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <button
                      type="button"
                      onClick={() => setUseWebcam(true)}
                      className="webcam-button form-control"
                    >
                      Use Webcam
                    </button>
                  </div>
                </div>
                {useWebcam && (
                  <WebcamCapture
                    onCapture={(imageSrc) =>
                      handleCapture(imageSrc, setFieldValue)
                    }
                    onCancel={() => {
                      setUseWebcam(false);
                      setPhotoPreview(null);
                    }}
                  />
                )}
              </Modal.Body>
            </Modal>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default VisitorsAdd;
