import React from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch
import { addOffice } from "../../../store/reducers/officeReducer"; // Import addOffice action
import { OfficeValidationSchema } from "../InputValidation";
import { toast } from "react-toastify";

import Breadcrumb from "../Breadcrumb";
import FormField from "../FormField";
import { AppPaths } from "../../../constants/appPaths";
import { Button } from "react-bootstrap";

const OfficeAdd = () => {
  const offices = useSelector((state) => state.offices); // Get the state from the store
  const dispatch = useDispatch(); // Initialize dispatch

  const handleSubmit = (values, { setSubmitting }) => {
    const uniqueId = Date.now().toString();
    const newOffice = { ...values, id: uniqueId };

    const existingOffice = offices.find(
      (office) => office.name === newOffice.name
    );

    if (existingOffice) {
      setSubmitting(false);
      return toast.error("Office already exists");
    }

    dispatch(addOffice(newOffice));
    toast.success("Office successfully added");

    setSubmitting(false);
  };

  const breadCrumbs = [
    { label: "Dashboard", to: AppPaths.dashboard.home },
    { label: "Offices", to: AppPaths.offices.all },
    { label: "Add Office", to: AppPaths.offices.add },
  ];

  return (
    <Formik
      initialValues={{ name: "", address: "", phone: "" }}
      validationSchema={OfficeValidationSchema}
      onSubmit={handleSubmit} // Use the handleSubmit function to dispatch the action
    >
      {({ isSubmitting }) => (
        <div className="offices-add-container">
          <div className="offices-wrapper d-row">
            <Breadcrumb paths={breadCrumbs} />
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
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              className="btn-primary"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default OfficeAdd;
