import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Breadcrumb from "../Breadcrumb";
import "./style.scss";
import { useFetchOffices } from "../../../hooks/useOffices";
import {
  useFetchDepartmentById,
  useUpdateDepartment,
} from "../../../hooks/useDepartments";
import { Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import FormField from "../FormField";
import { DepartmentValidationSchema } from "../InputValidation";
import { useTranslation } from "react-i18next";
import LoadingForm from "../../../modules/Loading/Form";
import { AppPaths } from "../../../constants/appPaths";

const DepartmentEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: officesData, isLoading: isOfficesLoading } = useFetchOffices();
  const { data, isLoading } = useFetchDepartmentById(id);
  const { mutateAsync, isPending } = useUpdateDepartment();
  const department = data?.data;
  const offices = officesData?.data;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await mutateAsync({ id, department: values });
      toast.success(t("department.add.success"));
      navigate(AppPaths.departments.all);
    } catch (error) {
      toast.error(t("department.add.error"));
    }
  };

  if (isOfficesLoading || isLoading) {
    return <LoadingForm />;
  }

  return (
    <div className="department-add-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: "Dashboard", to: AppPaths.dashboard },
            { label: "Departments", to: AppPaths.departments.all },
            { label: "Department - Edit" },
          ]}
        />
      </div>
      <hr className="navigation-underline" />
      <h1 className="department-add">Edit Department</h1>
      <Formik
        initialValues={{
          name: department?.name || "",
          address: department?.address || "",
          phone: department?.phone || "",
          office_id: department?.office_id || "",
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
              label={t("department.add.address")}
              name="address"
              className="form-control"
            />
            <FormField
              label={t("department.add.phone")}
              name="phone"
              type="tel"
            />
            <FormField
              label={t("department.add.office")}
              name="office_id"
              as="select"
              options={offices.map((office) => ({
                value: office.id,
                label: office.name,
              }))}
            />

            <Button type="submit" disabled={isSubmitting || isPending}>
              {isSubmitting
                ? t("department.add.submitting")
                : t("department.add.submit")}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DepartmentEdit;
