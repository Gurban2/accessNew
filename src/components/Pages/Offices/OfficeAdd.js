import React from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux"; // Import useDispatch
import { addOffice } from "../../../store/reducers/officeReducer"; // Import addOffice action
import { OfficeValidationSchema } from "../InputValidation";
import { toast } from "react-toastify";

import Breadcrumb from "../Breadcrumb";
import FormField from "../FormField";

const OfficeAdd = () => {
  const dispatch = useDispatch(); // Initialize dispatch

  const handleSubmit = (values, { setSubmitting }) => {
    const uniqueId = Date.now().toString();
    const newOffice = { ...values, id: uniqueId };

    dispatch(addOffice(newOffice));
    toast.success("Office successfully added");

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ name: "", address: "", phone: "" }}
      validationSchema={OfficeValidationSchema}
      onSubmit={handleSubmit} // Use the handleSubmit function to dispatch the action
    >
      {({ isSubmitting }) => (
        <div className="offices-add-container">
          <div className="offices-wrapper d-row">
            <Breadcrumb
              paths={[
                { label: "Dashboard", to: "/" },
                { label: "Offices", to: "/Offices/all" },
                { label: "Offices - Add" },
              ]}
            />
          </div>
          <hr className="navigation-underline" />

          <Form className="offices-add-form">
            <FormField
              label="Office Name"
              name="name"
              placeholder="Enter Office Name"
            />
            <FormField
              label="Address"
              name="address"
              placeholder="Enter Address"
            />
            <FormField
              label="Phone"
              name="phone"
              type="tel"
              placeholder="Enter Phone Number"
            />
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default OfficeAdd;
