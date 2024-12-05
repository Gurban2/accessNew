import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editVisitor } from '../../../store/reducers/visitorReducer';
import { toast } from 'react-toastify';
import { Formik, Field, Form as FormikForm } from 'formik';
import Breadcrumb from '../Breadcrumb';
import { useTranslation } from 'react-i18next';

import './style.scss';
import { AppPaths } from '../../../constants/appPaths';
import { VisitorValidationSchema } from '../InputValidation';
import { Button } from 'react-bootstrap';

const VisitorsEdit = () => {
  const { t } = useTranslation();

  const { id } = useParams();
  const visitor = useSelector((state) =>
    state.visitors.find((visitor) => visitor.id.toString() === id.toString())
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(editVisitor({ id: visitor.id, data: values }));
    setSubmitting(false);
    toast.success(t('visitor.add.success'));
    navigate('/visitors/all');
  };

  if (!visitor) {
    return <p>{t('visitor.add.error')}</p>;
  }

  return (
    <div className="visitor-add-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: t('breadcrumb.dashboard'), to: AppPaths.dashboard.home },
            { label: t('breadcrumb.visitors'), to: AppPaths.visitors.all },
            { label: t('breadcrumb.addVisitor') },
          ]}
        />
      </div>
      <h1 className="visitor-add-title">{t('visitor.edit.title')}</h1>
      <Formik
        initialValues={{
          name: visitor.name,
          phone: visitor.phone,
          fin: visitor.fin,
          email: visitor.email,
          address: visitor.address,
          description: visitor.description,
          photo: visitor.photo,
        }}
        validationSchema={VisitorValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, errors, values }) => (
          <FormikForm className="form-container">
            {Object.keys(errors).length > 0 && (
              <div className="error">{Object.values(errors).join(', ')}</div>
            )}
            <Field
              type="text"
              name="name"
              placeholder={t('visitor.add.enterName')}
              className="form-control"
              value={values.name}
              onChange={(e) => setFieldValue('name', e.target.value)}
            />
            <Field
              type="tel"
              name="phone"
              placeholder={t('visitor.add.enterPhone')}
              className="form-control"
              value={values.phone}
              onChange={(e) => setFieldValue('phone', e.target.value)}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? t('visitor.add.submitting')
                : t('visitor.add.submit')}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default VisitorsEdit;
