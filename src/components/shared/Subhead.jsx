import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  marginTop: 15,
  marginBottom: 15,
  borderBottom: '1px solid grey',
}

const Subhead = (props) => (
  <h2 style={styles}>{props.text}</h2>
)

Subhead.propTypes = {
  text: PropTypes.string.isRequired
}

export default Subhead;
