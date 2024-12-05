import PropTypes from 'prop-types';
import React from 'react';
import './LoadingForm.scss';

const LoadingForm = ({ fields = 6 }) => {
  return (
    <div className="loading-form">
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index} className="loading-form-field">
          <div className="loading-placeholder label"></div>
          <div className="loading-placeholder input"></div>
        </div>
      ))}
    </div>
  );
};

// PropTypes for better usability
LoadingForm.propTypes = {
  fields: PropTypes.number, // Number of fields to render
};

export default LoadingForm;
