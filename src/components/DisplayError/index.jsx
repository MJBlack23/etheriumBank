import React from 'react';
import PropTypes from 'prop-types';

const DisplayError = (props) => (
  <div className="container">
    <div className="row">
      <div className="col">
        <div className="alert alert-danger" role="alert">
          {props.error}
        </div>
      </div>
    </div>
  </div>
)

DisplayError.propTypes = {
  error: PropTypes.string.isRequired,
};

export default DisplayError;
