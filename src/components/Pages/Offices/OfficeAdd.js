import React from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch
import { addOffice } from "../../../store/reducers/officeReducer"; // Import addOffice action
import { OfficeValidationSchema } from "../InputValidation";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import Breadcrumb from "../Breadcrumb";
import FormField from "../FormField";
import { AppPaths } from "../../../constants/appPaths";
import { Button } from "react-bootstrap";

const OfficeAdd = () => {
  const { t } = useTranslation();

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
      return toast.error(t("office.add.officeExists")); // Используем перевод
    }

    dispatch(addOffice(newOffice));
    toast.success(t("office.add.success")); // Используем перевод

    setSubmitting(false);
  };

  const breadCrumbs = [
    { label: t("breadcrumb.dashboard"), to: AppPaths.dashboard.home }, // Локализуем заголовки хлебных крошек
    { label: t("breadcrumb.offices"), to: AppPaths.offices.all },
    { label: t("breadcrumb.addOffice"), to: AppPaths.offices.add },
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
              label={t("office.add.officeName")} 
              name="name"
              placeholder={t("office.add.OfficeName")}
            />
            <FormField
              label={t("office.add.address")}
              name="address"
              placeholder={t("office.add.Address")}
            />
            <FormField
              label={t("office.add.phone")}
              name="phone"
              type="tel"
              placeholder={t("office.add.phone")}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              className="btn-primary"
            >
              {isSubmitting ? t("office.add.submitting") : t("office.add.submit")} 
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default OfficeAdd;
