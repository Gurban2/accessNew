import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import WebcamCapture from "../../WebcamReact/WebcamCapture";
import { addVisitor } from "../../../store/reducers/visitorReducer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import Breadcrumb from "../Breadcrumb"; // Import the Breadcrumb component
import "./style.scss";

const VisitorsAdd = () => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [useWebcam, setUseWebcam] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    fin: Yup.string().required("Fin is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    address: Yup.string().required("Address is required"),
    description: Yup.string().required("Description is required"),
    photo: Yup.mixed()
      .required("Photo is required")
      .test("fileType", "Unsupported file format", (value) => {
        if (value) {
          const fileType = value.type;
          return fileType === "image/jpeg" || fileType === "image/png";
        }
        return true;
      }),
  });

  const handleCapture = (imageSrc, setFieldValue) => {
    setPhotoPreview(imageSrc);
    setFieldValue("photo", imageSrc);
    setUseWebcam(false);
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
          { label: "Dashboard", to: "/" },
          { label: "Visitors", to: "/visitors/all" },
          { label: "Add Visitor", to: "/visitors/add" },
        ]}
      />

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
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, errors, touched }) => (
          <FormikForm className="form-container">
            <Form.Label className="form-label-head">Visitor add</Form.Label>
            <Row className="mb-3">
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
                variant="primary"
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
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default VisitorsAdd;
