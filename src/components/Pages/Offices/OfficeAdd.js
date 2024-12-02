import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { OfficeValidationSchema } from "../InputValidation";


const OfficeAdd = () => {
  return (
    <div className="offices-add-container">
      <Formik
        initialValues={{ name: "", address: "", phone: "" }}
        validationSchema={OfficeValidationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => {
          return (
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
                value={values.phone}
                placeholder="Enter Phone Number"
                className="form-control"
                onChange={(e) => setFieldValue("phone", e.target.value)}
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
        )}}
      </Formik>
    </div>
  );
};

export default OfficeAdd;
