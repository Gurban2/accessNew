import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editDepartment } from "../../../store/reducers/departmentReducer";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Breadcrumb from "../Breadcrumb";

import * as Yup from "yup";
import "./style.scss";

// Validation schema with Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Department name is required"),
  phone: Yup.string().required("Phone number is required"),
  office: Yup.string().required("Office selection is required"),
});

const DepartmentEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const offices = useSelector((state) => state.offices);

  const department = useSelector((state) =>
    state.departments.departmentsData.find((department) => department.id === id)
  );

  useEffect(() => {
    if (!department) {
      navigate("/departments/all");
    }
  }, [department, navigate]);

  const handleSubmit = (values) => {
    dispatch(editDepartment({ id: department.id, data: values }));
    toast.success("Department successfully edited");
    navigate("/departments/all");
  };

  if (!department) {
    return <p>Department not found</p>;
  }

  return (
    <div className="department-add-container">
       <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: "Dashboard", to: "/" },
            { label: "Departments", to: "/departments/list" },

            { label: "Department - Edit" },
          ]}
        />
      </div>
      <hr className="navigation-underline" />
      <h1 className="department-add">Edit Department</h1>
      <Formik
        initialValues={{
          name: department.name,
          phone: department.phone,
          office: department.office,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="department-add-form">
            <div className="form-group">
              <label htmlFor="name">Department Name</label>
              <Field
                type="text"
                name="name"
                value={department.name}
                className="form-control"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <Field
                type="tel"
                name="phone"
                value={department.phone}
                className="form-control"
              />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>

            <div className="form-group">
              <label>Office</label>
              <Field as="select" name="office" className="form-control">
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
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DepartmentEdit;
