import { Formik, Form } from 'formik';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'; // Import useDispatch
import { toast } from 'react-toastify';

import { AppPaths } from '../../../constants/appPaths';
import { useAddOffice } from '../../../hooks/useOffices';
import Breadcrumb from '../Breadcrumb';
import FormField from '../FormField';
import { OfficeValidationSchema } from '../InputValidation';

const OfficeAdd = () => {
  const { data: offices } = useSelector((state) => state.offices); // Get the state from the store
  const { mutateAsync, isPending } = useAddOffice();
  const { t } = useTranslation();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const uniqueId = Date.now().toString();
    const newOffice = { ...values, id: uniqueId };

    const existingOffice = offices.find(
      (office) => office.name === newOffice.name
    );

    if (existingOffice) {
      setSubmitting(false);
      return toast.error(t('office.add.officeExists')); // Используем перевод
    }

    try {
      await mutateAsync(newOffice);
      resetForm();
      toast.success(t('office.add.success'));
    } catch (error) {
      toast.error('An error occurred while adding the office');
    }

    setSubmitting(false);
  };

  const breadCrumbs = [
    { label: t('breadcrumb.dashboard'), to: AppPaths.dashboard.home }, // Локализуем заголовки хлебных крошек
    { label: t('breadcrumb.offices'), to: AppPaths.offices.all },
    { label: t('breadcrumb.addOffice'), to: AppPaths.offices.add },
  ];

  return (
    <Formik
      initialValues={{ name: '', address: '', phone: '' }}
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
              label={t('office.add.officeName')}
              name="name"
              placeholder={t('office.add.OfficeName')}
            />
            <FormField
              label={t('office.add.address')}
              name="address"
              placeholder={t('office.add.Address')}
            />
            <FormField
              label={t('office.add.phone')}
              name="phone"
              type="tel"
              placeholder={t('office.add.phone')}
            />
            <Button
              type="submit"
              disabled={isSubmitting || isPending}
              variant="primary"
              className="btn-primary"
            >
              {isSubmitting || isPending
                ? t('office.add.submitting')
                : t('office.add.submit')}
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default OfficeAdd;
