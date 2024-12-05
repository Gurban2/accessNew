import React from "react";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux"; // Import useDispatch
import { OfficeValidationSchema } from "../InputValidation";
import { toast } from "react-toastify";

import Breadcrumb from "../Breadcrumb";
import FormField from "../FormField";
import { AppPaths } from "../../../constants/appPaths";
import { Button } from "react-bootstrap";
import { useAddOffice } from "../../../hooks/useOffices";

const OfficeAdd = () => {
  const { data: offices } = useSelector((state) => state.offices); // Get the state from the store
  const { mutateAsync, isPending } = useAddOffice();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const uniqueId = Date.now().toString();
    const newOffice = { ...values, id: uniqueId };

    const existingOffice = offices.find(
      (office) => office.name === newOffice.name
    );

    if (existingOffice) {
      setSubmitting(false);
      return toast.error("Office already exists");
    }

    try {
      await mutateAsync(newOffice);
      resetForm();
      toast.success("Office successfully added");
    } catch (error) {
      toast.error("An error occurred while adding the office");
    }

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
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default OfficeAdd;
