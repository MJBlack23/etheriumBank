import React from 'react';
import PropTypes from 'prop-types';

import Subhead from '../shared/Subhead';
import Button from './Button';

const Actions = (props) => (
  <div className="container">
    <Subhead text="Account Actions" />

    <div className="row">
      <div className="col">
        <div className={`alert alert-warning ${props.warning ? '' : 'd-none'}`} role="alert">
          {props.warning}
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-xs-12 col-sm-4">
        <h5 className="text-right">Action Type</h5>
      </div>
      <div className="col-xs-6 col-sm-4">
        <div className="btn-group btn-group-lg" role="group" aria-label="Action Type">
          <Button
            color="success"
            display="Deposit"
            value="deposit"
            actionType={props.actionType}
            updateState={props.updateState}
          />
          <Button
            color="warning"
            display="Withdraw"
            value="withdraw"
            actionType={props.actionType}
            updateState={props.updateState}
          />
        </div>
      </div>
    </div>
    
    <div className="row">
      <div className="col-xs-12 col-sm-4">
        <h5 className="text-right">
          Amount
        </h5>
      </div>
      <div className="col-xs-12 col-sm-4">
        <input
          className="form-control"
          type="number"
          value={props.actionAmount}
          onChange={(e) => props.updateState('actionAmount', e.target.value)}
          required
        />
      </div>
    </div>

    <div className="row">
      <div className="col-xs-12 text-center">
        <input
          type="submit"
          value={`Make ${props.actionType}`}
          className="btn btn-lg btn-primary"
          onClick={props.performAction}
        />
      </div>
    </div>


  </div>
)

Actions.propTypes = {
  warning: PropTypes.string.isRequired,
  actionType: PropTypes.string.isRequired,
  actionAmount: PropTypes.string.isRequired,
  updateState: PropTypes.func.isRequired,
  performAction: PropTypes.func.isRequired,
}

export default Actions;
