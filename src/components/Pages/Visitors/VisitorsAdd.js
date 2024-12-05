import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addVisitor } from '../../../store/reducers/visitorReducer';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { VisitorValidationSchema } from '../InputValidation';
import Breadcrumb from '../Breadcrumb';
import './style.scss';
import { AppPaths } from '../../../constants/appPaths';
import Capture from '../../../modules/Capture';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const VisitorsAdd = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const handleCapture = (imageSrc, setFieldValue) => {
    setFieldValue('photo', imageSrc);
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', description: '' }]);
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

  const handleSubmit = (values, { setSubmitting }) => {
    const currentTime = new Date().toISOString();
    const uniqueId = Date.now().toString();
    const newFormData = {
      ...values,
      id: uniqueId,
      createdAt: currentTime,
      items,
    };
    dispatch(addVisitor(newFormData));
    setSubmitting(false);
    toast.success(t('visitorAdd.success'));
    navigate('/visitors/all');
  };

  return (
    <div className="visitor-add-container">
      <Breadcrumb
        paths={[
          { label: t('breadcrumb.dashboard'), to: AppPaths.dashboard.home },
          { label: t('breadcrumb.visitors'), to: AppPaths.visitors.all },
          { label: t('breadcrumb.addVisitor'), to: AppPaths.visitors.add },
        ]}
      />
      <hr className="navigation-underline" />
      <Formik
        initialValues={{
          name: '',
          phone: '',
          fin: '',
          email: '',
          address: '',
          description: '',
          photo: '',
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
                  btnText={t('visitorAdd.addPhoto')}
                />
                <Form.Label className="form-label-head">
                  {t('visitorAdd.addPhoto')}
                </Form.Label>
                <ErrorMessage name="photo" component="div" className="error" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md={6} controlId="name">
                <Form.Label className="form-label-head">
                  {t('visitorAdd.name')}
                </Form.Label>
                <Field
                  type="text"
                  name="name"
                  placeholder={t('visitorAdd.enterName')}
                  className="form-control"
                />
                <ErrorMessage name="name" component="div" className="error" />
              </Form.Group>
              <Form.Group as={Col} xs={12} md={6} controlId="phone">
                <Form.Label className="form-label-head">
                  {t('visitorAdd.phone')}
                </Form.Label>
                <Field
                  type="tel"
                  name="phone"
                  placeholder={t('visitorAdd.enterPhone')}
                  className="form-control"
                />
                <ErrorMessage name="phone" component="div" className="error" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md={6} controlId="fin">
                <Form.Label className="form-label-head">
                  {t('visitorAdd.fin')}
                </Form.Label>
                <Field
                  type="text"
                  name="fin"
                  placeholder={t('visitorAdd.enterFin')}
                  className="form-control"
                />
                <ErrorMessage name="fin" component="div" className="error" />
              </Form.Group>
              <Form.Group as={Col} xs={12} md={6} controlId="email">
                <Form.Label className="form-label-head">
                  {t('visitorAdd.email')}
                </Form.Label>
                <Field
                  type="email"
                  name="email"
                  placeholder={t('visitorAdd.enterEmail')}
                  className="form-control"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md={6} controlId="address">
                <Form.Label className="form-label-head">
                  {t('visitorAdd.address')}
                </Form.Label>
                <Field
                  type="text"
                  name="address"
                  placeholder={t('visitorAdd.enterAddress')}
                  className="form-control"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="error"
                />
              </Form.Group>
              <Form.Group as={Col} xs={12} md={6} controlId="ControlTextarea">
                <Form.Label className="form-label-head">
                  {t('visitorAdd.description')}
                </Form.Label>
                <Field
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder={t('visitorAdd.enterDescription')}
                  className="form-control"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} md={6} controlId="additem">
                <Button variant="warning" onClick={handleAddItem}>
                  {t('visitorAdd.addItem')}
                </Button>
              </Form.Group>
            </Row>
            {items.length > 0 && (
              <Table bordered className="mb-3">
                <thead>
                  <tr>
                    <th>{t('visitorAdd.itemName')}</th>
                    <th>{t('visitorAdd.itemDescription')}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Form.Control
                          type="text"
                          placeholder={t('visitorAdd.itemName')}
                          value={item.name}
                          onChange={(e) =>
                            handleItemChange(index, 'name', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          placeholder={t('visitorAdd.itemDescription')}
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              'description',
                              e.target.value
                            )
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
                  ? t('visitorAdd.submitting')
                  : t('visitorAdd.submit')}
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={() => {
                  resetForm();
                  setItems([]);
                }}
              >
                {t('visitorAdd.reset')}
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default VisitorsAdd;
