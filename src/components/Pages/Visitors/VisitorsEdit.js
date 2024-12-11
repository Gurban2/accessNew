import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppPaths } from "../../../constants/appPaths";
import { editVisitor } from "../../../store/reducers/visitorReducer";
import Breadcrumb from "../Breadcrumb";

import "./style.scss";
import { VisitorValidationSchema } from "../InputValidation";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  useFetchVisitorById,
  useUpdateVisitor,
} from "../../../hooks/useVisitors";
import LoadingForm from "../../../modules/Loading/Form";
import FormField from "../FormField";
import Capture from "../../../modules/Capture";
import { format, parseISO } from "date-fns";

const VisitorsEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isLoading } = useFetchVisitorById(id);
  const visitor = data?.data;
  const [items, setItems] = useState(visitor?.items || []);
  const { mutateAsync } = useUpdateVisitor();

  useEffect(() => {
    if (visitor) {
      setItems(visitor.items);
    }
  }, [visitor]);

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formattedVisitTime = format(
        new Date(values.visit_time),
        "yyyy-MM-dd HH:mm",
      );

      await mutateAsync({
        id: visitor.id,
        visitor: values,
        visiting_now: values.visiting_now ? 1 : 0,
        visit_time: formattedVisitTime,
      });
      dispatch(editVisitor({ id: visitor.id, data: values }));
      setSubmitting(false);
      toast.success(t("visitors.edit.success"));
      navigate(AppPaths.visitors.view.replace(":id", visitor.id));
    } catch (error) {
      toast.error(t("visitors.edit.error"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCapture = (imageSrc, setFieldValue) => {
    setFieldValue("avatar", imageSrc);
  };

  if (isLoading) {
    return <LoadingForm />;
  }

  console.log({ visitor });

  return (
    <div className="user-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
          { label: t("breadcrumbs.visitors"), to: AppPaths.visitors.all },
          { label: t("breadcrumbs.addVisitor") },
        ]}
      />
      <hr className="navigation-underline" />

      <Formik
        initialValues={{
          doc_id: visitor.doc_id,
          name: visitor.name,
          phone: visitor.phone,
          email: visitor.email,
          address: visitor.address,
          visit_time: format(new Date(visitor.visit_time), "yyyy-MM-dd HH:mm"),
          visiting_now: visitor.visiting_now,
          avatar: visitor.avatar,
        }}
        validationSchema={VisitorValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, errors, values }) => (
          <FormikForm className="add-form">
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md={3} controlId="photo">
                <Capture
                  photo={values.avatar}
                  onConfirm={(imageSrc) =>
                    handleCapture(imageSrc, setFieldValue)
                  }
                  btnText={t("visitors.edit.addPhoto")}
                />
                <Form.Label className="form-label-head">
                  {t("visitors.edit.addPhoto")}
                </Form.Label>
                <ErrorMessage name="avatar" component="div" className="error" />
              </Form.Group>
            </Row>
            <div className="form-wrapper">
              <FormField
                label={t("visitors.edit.fin")}
                name="doc_id"
                type="text"
                className="form-control"
              />
              <FormField
                label={t("visitors.edit.name")}
                name="name"
                type="text"
                className="form-control"
              />
              <FormField
                label={t("visitors.edit.phone")}
                name="phone"
                type="text"
                className="form-control"
              />

              <FormField
                label={t("visitors.edit.email")}
                name="email"
                type="email"
                className="form-control"
              />
              <FormField
                label={t("visitors.edit.address")}
                name="address"
                type="text"
                className="form-control"
              />

              <FormField
                label={t("visitors.edit.visitTime")}
                name="visit_time"
                type="datetime-local"
                className="form-control"
              />

              <Form.Check
                type="checkbox"
                label={t("visitors.edit.visitingNow")}
                name="visiting_now"
              />
            </div>
            <div className="form-footer">
              <Button variant="warning" onClick={handleAddItem}>
                {t("visitors.edit.addItem")}
              </Button>
            </div>
            {items?.length > 0 && (
              <Table bordered className="mb-3">
                <thead>
                  <tr>
                    <th>{t("visitors.edit.itemName")}</th>
                    <th>{t("visitors.edit.itemDescription")}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Field
                          type="text"
                          value={item.name}
                          onChange={(e) =>
                            handleItemChange(index, "name", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <Field
                          type="text"
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

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? t("visitors.edit.submitting")
                : t("visitors.edit.submit")}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default VisitorsEdit;
