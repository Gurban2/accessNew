import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDepartment } from "../../../store/reducers/departmentReducer";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import { DepartmentValidationSchema } from "../InputValidation";
import Breadcrumb from "../Breadcrumb";
import FormField from "../FormField";

import "./style.scss";

const DepartmentsAdd = () => {
  const { data: offices } = useSelector((state) => state.offices);
  const dispatch = useDispatch();

  const parentOptions = [
    { value: "1", label: "Parent Department 1" },
    { value: "2", label: "Parent Department 2" },
    { value: "3", label: "Parent Department 3" },
  ];

  const handleSubmit = (values, { setSubmitting }) => {
    const uniqueId = Date.now().toString();
    const newFormData = { ...values, id: uniqueId };

    dispatch(addDepartment(newFormData));
    toast.success("Department successfully added");
    setSubmitting(false);
  };

  return (
    <div className="department-add-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: "Dashboard", to: "/" },
            { label: "Departments", to: "/departments/list" },

            { label: "Departments Add" },
          ]}
        />
      </div>
      <hr className="navigation-underline" />

      <Formik
        initialValues={{
          name: "",
          phone: "",
          parent: "",
          office: "",
        }}
        validationSchema={DepartmentValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="department-add-form">
            <FormField label="Name" name="name" />
            <FormField label="Phone" name="phone" type="tel" />
            <FormField
              label="Parent"
              name="parent"
              as="select"
              options={parentOptions}
            />
            <FormField
              label="Office"
              name="office"
              as="select"
              options={offices}
            />

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

export default DepartmentsAdd;
