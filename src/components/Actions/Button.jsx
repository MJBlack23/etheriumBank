import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => (
  <button
    type="button"
    className={`btn btn-${props.color}`}
    disabled={props.actionType === props.value}
    onClick={() => props.updateState('actionType', props.value)}
  >
    {props.display}
  </button>
)

Button.propTypes = {
  display: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default Button;
