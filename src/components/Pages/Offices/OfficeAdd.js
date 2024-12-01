import React from "react";
import { useDispatch } from "react-redux";
import { addOffice } from "../../../store/reducers/officeReducer";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; // Для навигации
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./style.scss";

// Валидация формы с помощью Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Office name must be at least 3 characters.")
    .required("Office name is required."),
  address: Yup.string()
    .min(5, "Address must be at least 5 characters.")
    .required("Address is required."),
  phone: Yup.string()
    .matches(/^\d{3} \d{3} \d{3}$/, "Phone must be in format: '555 555 555'.")
    .required("Phone number is required."),
});

const OfficeAdd = ({ entity }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const uniqueId = Date.now().toString();
    const newFormData = { ...values, id: uniqueId };

    dispatch(addOffice(newFormData));
    setSubmitting(false);
    resetForm();
    toast.success("Office Successfully Added");
  };

  return (
    <div className="offices-add-container">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <Link to="/">Dashboard</Link> &gt; <span>{entity} Add</span>
      </nav>

      <Formik
        initialValues={{ name: "", address: "", phone: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="offices-add-form">
            <div className="form-group">
              <label htmlFor="name">Office Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter Office Name"
                className="form-control"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <Field
                type="text"
                id="address"
                name="address"
                placeholder="Enter Address"
                className="form-control"
              />
              <ErrorMessage name="address" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <Field
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter Phone Number"
                className="form-control"
              />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OfficeAdd;
