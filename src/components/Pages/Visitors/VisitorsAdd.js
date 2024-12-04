import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addVisitor } from "../../../store/reducers/visitorReducer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import { VisitorValidationSchema } from "../InputValidation"; // Импорт схемы
import Breadcrumb from "../Breadcrumb";
import "./style.scss";
import { AppPaths } from "../../../constants/appPaths";
import Capture from "../../../modules/Capture";

const VisitorsAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCapture = (imageSrc, setFieldValue) => {
    setFieldValue("photo", imageSrc);
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
        {({ setFieldValue, isSubmitting, values }) => (
          <FormikForm className="form-container">
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md={3} controlId="photo">
                <Form.Label className="form-label-head">Photo</Form.Label>

                <Capture
                  photo={values.photo}
                  onConfirm={(imageSrc) =>
                    handleCapture(imageSrc, setFieldValue)
                  }
                  btnText={"Add Photo"}
                />
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
            <Row className="mb-1 d-flex justify-content-end  visitor-add-container-footer">
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
              <Button
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
