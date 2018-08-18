import React from 'react';
import PropTypes from 'prop-types';

import Subhead from '../shared/Subhead';

const RecentEvents = (props) => (
  <div className="container">
  <Subhead text="Recent Events" />
    <table className="table table-striped table-compact">
      <tbody>
        { props.events.map((event) => (
          <tr key={event.transactionHash}>
            <td>{event.blockNumber}</td>
            <td>{event.event}</td>
            <td>{event.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

RecentEvents.propTypes = {
  events: PropTypes.array.isRequired,
}

export default RecentEvents;
