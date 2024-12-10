import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaRegTrashAlt } from "react-icons/fa";
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
} from "../../../hooks/useVisitors";
import LoadingForm from "../../../modules/Loading/Form";
import FormField from "../FormField";
import "./style.scss";

const VisitorsAdd = () => {
  const { t } = useTranslation();

  const { mutateAsync } = useAddVisitor();
  const { data: documentTypesData, isLoading: isLoadingDocumentTypes } =
    useFetchDocumentTypes();
  const documentTypes = documentTypesData?.data;

  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const handleCapture = (imageSrc, setFieldValue) => {
    setFieldValue("photo", imageSrc);
  };

  const handleAddItem = () => {
    setItems([...items, { name: "", desc: "" }]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log({
      values,
      items,
    });
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
    console.log({ newFormData });
    try {
      await mutateAsync(newFormData);
      setSubmitting(false);
      toast.success(t("visitorAdd.success"));
      navigate(AppPaths.visitors.all);
    } catch (error) {
      toast.error(t("visitor.Add.error"));
    }
  };

  if (isLoadingDocumentTypes) {
    return <LoadingForm />;
  }

  return (
    <div className="visitor-add-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumb.dashboard"), to: AppPaths.dashboard },
          { label: t("breadcrumb.visitors"), to: AppPaths.visitors.all },
          { label: t("breadcrumb.addVisitor"), to: AppPaths.visitors.add },
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
        validationSchema={VisitorValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, resetForm, values }) => (
          <FormikForm className="form-container">
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md={3} controlId="photo">
                <Capture
                  photo={values.photo}
                  onConfirm={(imageSrc) =>
                    handleCapture(imageSrc, setFieldValue)
                  }
                  btnText={t("visitorAdd.addPhoto")}
                />
                <Form.Label className="form-label-head">
                  {t("visitorAdd.addPhoto")}
                </Form.Label>
                <ErrorMessage name="photo" component="div" className="error" />
              </Form.Group>
            </Row>
            <div className="d-flex flex-wrap gap-2">
              <FormField
                label={t("department.add.doc_type")}
                name="doc_type"
                as="select"
                options={Object.entries(documentTypes)?.map(([value, key]) => ({
                  label: key,
                  value: value,
                }))}
              />
              <FormField
                label={t("visitorAdd.fin")}
                name="doc_id"
                type="text"
                className="form-control"
              />
              <FormField
                label={t("visitorAdd.name")}
                name="name"
                type="text"
                className="form-control"
              />
              <FormField
                label={t("visitorAdd.phone")}
                name="phone"
                type="text"
                className="form-control"
              />

              <FormField
                label={t("visitorAdd.email")}
                name="email"
                type="email"
                className="form-control"
              />
              <FormField
                label={t("visitorAdd.address")}
                name="address"
                type="text"
                className="form-control"
              />

              <FormField
                label={t("visitorAdd.visitTime")}
                name="visit_time"
                type="datetime-local"
                className="form-control"
              />

              <Form.Check
                type="checkbox"
                label={t("visitorAdd.visitingNow")}
                name="visiting_now"
              />
            </div>
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md={6} controlId="additem">
                <Button variant="warning" onClick={handleAddItem}>
                  {t("visitorAdd.addItem")}
                </Button>
              </Form.Group>
            </Row>
            {items.length > 0 && (
              <Table bordered className="mb-3">
                <thead>
                  <tr>
                    <th>{t("visitorAdd.itemName")}</th>
                    <th>{t("visitorAdd.itemDescription")}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Form.Control
                          type="text"
                          placeholder={t("visitorAdd.itemName")}
                          value={item.name}
                          onChange={(e) =>
                            handleItemChange(index, "name", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          placeholder={t("visitorAdd.itemDescription")}
                          value={item.desc}
                          onChange={(e) =>
                            handleItemChange(index, "desc", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemoveItem(index)}
                        >
                          <FaRegTrashAlt />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <div className="form-actions">
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? t("visitorAdd.submitting")
                  : t("visitorAdd.submit")}
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={() => {
                  resetForm();
                  setItems([]);
                }}
              >
                {t("visitorAdd.reset")}
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default VisitorsAdd;
