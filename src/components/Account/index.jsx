import React from 'react';
import PropTypes from 'prop-types';

import Subhead from '../shared/Subhead';
import Row from '../shared/Row';



const Account = (props) => (
    <div className="container">
      <Subhead text="Ether Account information" />
      
      <Row name="Metamask Account Address" value={props.userAddress} />
      <Row name="Wallet Balance" value={props.walletBalance} />
      <Row name="Vault Balance" value={props.vaultBalance} />
    </div>
)

Account.propTypes = {
  userAddress: PropTypes.string.isRequired,
  walletBalance: PropTypes.string.isRequired,
  vaultBalance: PropTypes.string.isRequired,
}

export default Account;
