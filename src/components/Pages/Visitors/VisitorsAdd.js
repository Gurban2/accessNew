import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";

import { AppPaths } from "../../../constants/appPaths";
import Capture from "../../../modules/Capture";
import Breadcrumb from "../Breadcrumb";
import { VisitorValidationSchema } from "../InputValidation";
import {
  useAddVisitor,
  useFetchDocumentTypes,
  useInfoByDoc,
} from "../../../hooks/useVisitors";
import LoadingForm from "../../../modules/Loading/Form";
import FormField from "../FormField";
import "./style.scss";
import ItemsTable from "./ItemsTable";

const VisitorsAdd = () => {
  const { t } = useTranslation();

  const { mutateAsync } = useAddVisitor();
  const { mutateAsync: fetchInfoData } = useInfoByDoc();
  const { data: documentTypesData, isLoading: isLoadingDocumentTypes } =
    useFetchDocumentTypes();
  const documentTypes = documentTypesData?.data;

  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const handleCapture = (imageSrc, setFieldValue) => {
    setFieldValue("photo", imageSrc);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const newFormData = {
      visitors: [
        {
          ...values,
          avatar: values.photo,
          items,
          visiting_now: values.visiting_now ? 1 : 0,
          visit_time: format(new Date(values.visit_time), "yyyy-MM-dd HH:mm"),
        },
      ],
    };
    try {
      await mutateAsync(newFormData);
      setSubmitting(false);
      toast.success(t("visitors.add.success"));
      navigate(AppPaths.visitors.all);
    } catch (error) {
      toast.error(t("visitors.add.error"));
    }
  };

  if (isLoadingDocumentTypes) {
    return <LoadingForm />;
  }

  const handleItemsUpdate = (data) => {
    setItems(data);
  };

  const handleSearchByDoc = async (e, setFieldValue, docType) => {
    console.log({ value: e.target.value });
    if (e.target.value.length > 2) {
      const infoData = await fetchInfoData({
        doc_number: e.target.value,
        doc_type: docType,
      });
      console.log({ infoData });
    }
  };

  return (
    <div className="user-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
          { label: t("breadcrumbs.visitors"), to: AppPaths.visitors.all },
          { label: t("breadcrumbs.addVisitor"), to: AppPaths.visitors.add },
        ]}
      />
      <hr className="navigation-underline" />
      <Formik
        initialValues={{
          name: "",
          phone: "",
          doc_id: "",
          email: "",
          address: "",
          photo: "",
          doc_type: "id",
          visit_time: "",
          visiting_now: false,
        }}
        validationSchema={VisitorValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, resetForm, values }) => (
          <FormikForm className="add-form">
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md={3} controlId="photo">
                <Capture
                  photo={values.photo}
                  onConfirm={(imageSrc) =>
                    handleCapture(imageSrc, setFieldValue)
                  }
                  btnText={t("visitors.add.photo")}
                />
                <ErrorMessage name="photo" component="div" className="error" />
              </Form.Group>
            </Row>
            <div className="form-wrapper">
              <FormField
                label={t("visitors.add.docType")}
                name="doc_type"
                as="select"
                options={Object.entries(documentTypes)?.map(([value, key]) => ({
                  label: key,
                  value: value,
                }))}
              />
              <FormField
                label={t("visitors.add.doc_id")}
                name="doc_id"
                type="text"
                className="form-control"
                fieldProps={{
                  onChange: (e) => {
                    handleSearchByDoc(e, setFieldValue, values.doc_type);
                    setFieldValue("doc_id", e.target.value.toUpperCase());
                  },
                }}
              />
              <FormField
                label={t("visitors.add.name")}
                name="name"
                type="text"
                className="form-control"
              />
              <FormField
                label={t("visitors.add.phone")}
                name="phone"
                type="text"
                className="form-control"
              />

              <FormField
                label={t("visitors.add.email")}
                name="email"
                type="email"
                className="form-control"
              />
              <FormField
                label={t("visitors.add.address")}
                name="address"
                type="text"
                className="form-control"
              />

              <FormField
                label={t("visitors.add.visitTime")}
                name="visit_time"
                type="datetime-local"
                className="form-control"
              />
            </div>
            <ItemsTable initialItems={[]} onItemsUpdate={handleItemsUpdate} />
            <div className="form-footer">
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? t("visitors.add.submitting")
                  : t("visitors.add.submit")}
              </Button>
              <Button
                variant="danger"
                type="button"
                onClick={() => {
                  resetForm();
                  setItems([]);
                }}
              >
                {t("visitors.add.reset")}
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default VisitorsAdd;
