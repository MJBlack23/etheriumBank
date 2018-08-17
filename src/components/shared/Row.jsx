import React from 'react';
import PropTypes from 'prop-types';

const Row = (props) => (
  <div className="row">
    <div className="col-sm-12 col-md-4">
      <h5 className="text-right">{props.name}</h5>
    </div>
    <div className="col-sm-12 col-md-6">
      <p className="text-muted">{props.value}</p>
    </div>
  </div>
)

Row.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default Row;
