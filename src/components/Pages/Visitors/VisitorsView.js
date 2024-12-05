import React from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppPaths } from '../../../constants/appPaths';
import Breadcrumb from '../Breadcrumb';
import './style.scss';

const VisitorsView = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const visitor = useSelector(
    (state) =>
      state.visitors.find((visitor) => visitor.id.toString() === id.toString()),
    shallowEqual
  );

  if (!visitor) {
    return <div>{t('loading')}</div>; // Use translation for loading
  }

  return (
    <div className="visitor-view-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: t('breadcrumb.dashboard'), to: AppPaths.dashboard.home },
            { label: t('breadcrumb.visitors'), to: AppPaths.visitors.all },
            { label: t('visitorView.viewVisitor') }, // Translation for 'View Visitor'
          ]}
        />
      </div>
      <div className="visitor-view-card">
        <div className="visitor-photo">
          {visitor.photo ? (
            typeof visitor.photo === 'string' ? (
              <img
                src={visitor.photo}
                alt={`${visitor.name}`}
                className="visitor-photo-img"
              />
            ) : (
              <img
                src={URL.createObjectURL(visitor.photo)}
                alt={`${visitor.name}`}
                className="visitor-photo-img"
              />
            )
          ) : (
            <div className="visitor-photo-frame">
              <span>{t('visitorView.noPhoto')}</span>{' '}
            </div>
          )}
        </div>
        <div className="visitor-info">
          <p>
            <strong>{t('name')}:</strong> {t('visitorView.name')}
          </p>
          <p>
            <strong>{t('phone')}:</strong> {t('visitorView.phone')}
          </p>
          <p>
            <strong>{t('fin')}:</strong> {t('visitorView.fin')}
          </p>
          <p>
            <strong>{t('email')}:</strong> {t('visitorView.email')}
          </p>
          <p>
            <strong>{t('address')}:</strong> {t('visitorView.address')}
          </p>
          <p>
            <strong>{t('description')}:</strong> {t('visitorView.description')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisitorsView;
