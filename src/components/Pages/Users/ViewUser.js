import { Formik, Field, Form as FormikForm } from "formik";
import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppPaths } from "../../../constants/appPaths";
import Breadcrumb from "../Breadcrumb";

import "./style.scss";

import { UserValidationSchema } from "../InputValidation";

import LoadingForm from "../../../modules/Loading/Form";
import { useFetchUserById, useUpdateUser } from "../../../hooks/useUser";

const ViewUser = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isLoading } = useFetchUserById(id);
  const user = data?.data;
  const { mutateAsync } = useUpdateUser();

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await mutateAsync({ id: user.id, user: values });
      setSubmitting(false);
      toast.success(t("user.add.success"));
      navigate(AppPaths.users.all);
    } catch (error) {
      toast.error(t("user.add.error"));
      console.error(t("errorAddinguser"), error);
    }
  };

  if (isLoading) {
    return <LoadingForm />;
  }

  return (
    <div className="user-add-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: t("breadcrumb.dashboard"), to: AppPaths.dashboard },
            { label: t("breadcrumb.users"), to: AppPaths.users.all },
            { label: t("breadcrumb.adduser") },
          ]}
        />
      </div>
      <h1 className="user-add-title">{t("user.edit.title")}</h1>
      <Formik
        initialValues={{
          doc_id: user.doc_id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          address: user.address,
        }}
        validationSchema={UserValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, errors, values }) => (
          <FormikForm className="form-container w-100">
            {Object.keys(errors).length > 0 && (
              <div className="error">{Object.values(errors).join(", ")}</div>
            )}
            <Field
              type="text"
              name="doc_id"
              placeholder={t("user.add.enterFin")}
              className="form-control"
              value={values.doc_id}
              onChange={(e) => setFieldValue("doc_id", e.target.value)}
            />

            <Field
              type="text"
              name="name"
              placeholder={t("user.add.enterName")}
              className="form-control"
              value={values.name}
              onChange={(e) => setFieldValue("name", e.target.value)}
            />
            <Field
              type="tel"
              name="phone"
              placeholder={t("user.add.enterPhone")}
              className="form-control"
              value={values.phone}
              onChange={(e) => setFieldValue("phone", e.target.value)}
            />

            <Field
              type="email"
              name="email"
              placeholder={t("user.add.enterEmail")}
              className="form-control"
              value={values.email}
              onChange={(e) => setFieldValue("email", e.target.value)}
            />

            <Field
              type="text"
              name="address"
              placeholder={t("user.add.enterAddress")}
              className="form-control"
              value={values.address}
              onChange={(e) => setFieldValue("address", e.target.value)}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("user.add.submitting") : t("user.add.submit")}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default ViewUser;
