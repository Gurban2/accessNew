import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AppPaths } from "../../../constants/appPaths";
import { useAddDepartment } from "../../../hooks/useDepartments";

import Breadcrumb from "../Breadcrumb";
import FormField from "../FormField";
import { DepartmentValidationSchema } from "../InputValidation";
import "./style.scss";

const DepartmentsAdd = () => {
  const { data: departments } = useSelector((state) => state.offices);
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useAddDepartment();

  const offices = useSelector((state) => state.offices.data);

  const parentOptions = departments.map((department) => ({
    value: department.id,
    label: department.name,
  }));

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const uniqueId = Date.now().toString();
    const newDepartment = { ...values, id: uniqueId };

    const existingDepartment = departments.find(
      (department) => department.name === newDepartment.name,
    );

    if (existingDepartment) {
      setSubmitting(false);
      return toast.error(t("department.add.departmentExists"));
    }

    try {
      await mutateAsync(newDepartment);
      toast.success(t("department.add.success"));
      resetForm();
    } catch (error) {
      toast.error(t("department.add.error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="department-add-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: t("breadcrumb.dashboard"), to: AppPaths.dashboard.home },
            {
              label: t("breadcrumb.departments"),
              to: AppPaths.departments.all,
            },
            { label: t("breadcrumb.addDepartment") },
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
            <FormField
              label={t("department.add.name")}
              name="name"
              className="form-control"
            />
            <FormField
              label={t("department.add.phone")}
              name="phone"
              type="tel"
            />
            <FormField
              label={t("department.add.parent")}
              name="parent"
              as="select"
              options={parentOptions}
            />
            <FormField
              label={t("department.add.office")}
              name="office"
              as="select"
              options={offices.map((office) => ({
                value: office.id,
                label: office.name,
              }))}
            />

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting || isPending}
            >
              {isSubmitting
                ? t("department.add.submitting")
                : t("department.add.submit")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DepartmentsAdd;
