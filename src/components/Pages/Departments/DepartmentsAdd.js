import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDepartment } from "../../../store/reducers/departmentReducer";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Breadcrumb from "../Breadcrumb"; // Импортируем Breadcrumb
import "./style.scss";

// Validation schema with Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Department name is required"),
  phone: Yup.string().required("Phone number is required"),
  parent: Yup.string().required("Parent department is required"),
  office: Yup.string().required("Office selection is required"),
});

const DepartmentsAdd = () => {
  const offices = useSelector((state) => state.offices);
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    const uniqueId = Date.now().toString();
    const newFormData = { ...values, id: uniqueId };

    dispatch(addDepartment(newFormData));
    toast.success("Department successfully added");
    setSubmitting(false);
  };

  return (
    <div className="department-add-container">
      {/* Breadcrumbs section */}
      <Breadcrumb
        paths={[
          { label: "Dashboard", to: "/" },
          { label: "Departments Add" },
        ]}
      />

      {/* Form for adding departments */}
      <Formik
        initialValues={{
          name: "",
          phone: "",
          parent: "",
          office: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="department-add-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter department name"
                className="form-control"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <Field
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter department phone"
                className="form-control"
              />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="parent">Parent</label>
              <Field as="select" id="parent" name="parent" className="form-control">
                <option value="" disabled>
                  Select parent department
                </option>
                <option value="1">Parent Department 1</option>
                <option value="2">Parent Department 2</option>
                <option value="3">Parent Department 3</option>
              </Field>
              <ErrorMessage name="parent" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="office">Office</label>
              <Field as="select" id="office" name="office" className="form-control">
                <option value="" disabled>
                  Select office
                </option>
                {offices.map((office) => (
                  <option key={office.id} value={office.name}>
                    {office.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="office" component="div" className="error" />
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DepartmentsAdd;
