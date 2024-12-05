import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDepartment } from '../../../store/reducers/departmentReducer';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import { DepartmentValidationSchema } from '../InputValidation';
import Breadcrumb from '../Breadcrumb';
import FormField from '../FormField';
import { useTranslation } from 'react-i18next'; // Added to handle translations

import './style.scss';
import { AppPaths } from '../../../constants/appPaths';

const DepartmentsAdd = () => {
  const { data: offices } = useSelector((state) => state.offices);
  const { t } = useTranslation(); // Initialize translation hook
  const dispatch = useDispatch();

  const parentOptions = [
    { value: '1', label: t('department.add.parent') + ' 1' },
    { value: '2', label: t('department.add.parent') + ' 2' },
    { value: '3', label: t('department.add.parent') + ' 3' },
  ];

  const handleSubmit = (values, { setSubmitting }) => {
    const uniqueId = Date.now().toString();
    const newFormData = { ...values, id: uniqueId };

    dispatch(addDepartment(newFormData));
    toast.success(t('department.add.success'));
    setSubmitting(false);
  };

  return (
    <div className="department-add-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: t('breadcrumb.dashboard'), to: AppPaths.dashboard.home },
            {
              label: t('breadcrumb.departments'),
              to: AppPaths.departments.all,
            },
            { label: t('breadcrumb.addDepartment') },
          ]}
        />
      </div>
      <hr className="navigation-underline" />

      <Formik
        initialValues={{
          name: '',
          phone: '',
          parent: '',
          office: '',
        }}
        validationSchema={DepartmentValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="department-add-form">
            <FormField label={t('department.add.name')} name="name" />
            <FormField
              label={t('department.add.phone')}
              name="phone"
              type="tel"
            />
            <FormField
              label={t('department.add.parent')}
              name="parent"
              as="select"
              options={parentOptions}
            />
            <FormField
              label={t('department.add.office')}
              name="office"
              as="select"
              options={offices}
            />

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t('department.add.submitting')
                : t('department.add.submit')}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DepartmentsAdd;
