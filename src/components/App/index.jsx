import React, { Component } from 'react';
import './App.css';
import contractDefinition from '../../static/data/contractDefinition';

// Components
import Header from '../Header/';
import Account from '../Account';
import Actions from '../Actions';
import DisplayError from '../DisplayError';
import RecentEvents from '../RecentEvents/';

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      warning: "",
      web3: {},
      userAddress: "",
      contract: {},
      userWallet: "",
      userVault: "",
      actionType: "deposit",
      actionAmount: 0,
      events: [],
    };
    
    this.updateState = this.updateState.bind(this);
    this.determineMaxAvailable = this.determineMaxAvailable.bind(this);
    this.performAction = this.performAction.bind(this);
  }

  async componentDidMount() {
    await this.initialSetup();
  }


  async initialSetup () {
    const { web3 } = window;
    if (!web3) {
      return this.setState({
        ...this.state,
        error: 'Metamask not detected.  Check it out at https://metamask.io',
      })
    }

    const userAddress = web3.eth.accounts[0];
    if (userAddress === undefined) {
      return this.setState({
        ...this.state,
        error: 'Metamask account not found, Sign up for one at https://metamask.io or try reloading the page.',
      })
    }
    const contract = this.createContract(web3);
    const [userWallet, userVault] = await Promise.all([
      this.getWallet(web3, userAddress),
      this.getVault(contract, userAddress),
    ]);

    this.getEvents(contract);

    this.setState(() => ({
      ...this.state,
      web3,
      userAddress,
      contract,
      userWallet,
      userVault,
    }));
  }


  createContract(web3) {
    const contract = web3.eth.contract(contractDefinition);
    return contract.at(process.env.REACT_APP_CONTRACT_ADDRESS);
  }
  

  getWallet(web3, userAddress) {
    return new Promise((resolve, reject) => {
      web3.eth.getBalance(userAddress, (error, balance) => {
        if (error) {
          return reject(error);
        }

        return resolve(balance.toNumber());
      })
    })
  }


  getVault(contract, userAddress) {
    return new Promise((resolve, reject) => {
      contract.balanceOf(userAddress, (error, balance) => {
        if (error) {
          return reject(error);
        }
  
        return resolve(balance.toNumber());
      });
    });
  }


  getEvents(contract) {
    // return new Promise((resolve, reject) => {
      const allEvents = contract.allEvents({ fromBlock: 0, toBlock: 'latest' });
      allEvents.watch((error, logs) => {
        if (error) {
          this.setState(() => ({
            ...this.state,
            error: error.message,
          }));
        }

        this.setState(() => ({
          ...this.state,
          events: [...this.state.events, logs],
        }));
      });
    // });
  }


  makeDeposit(amount) {
    const { web3, contract, userAddress } = this.state;
    const value = web3.toWei(amount, 'ether');

    return new Promise((resolve, reject) => {
      contract.deposit({ value, sender: userAddress, gas: 2000 }, (error, success) => {
        if (error) {
          return reject(error);
        }
        
        console.log(success);
        return resolve(success);
      });
    });
  }


  makeWithdraw(amount) {
    const { web3, userAddress, contract } = this.state;
    const value = web3.toWei(amount, 'ether');
    console.log(value);
    
    return new Promise((resolve, reject) => {
      contract.withdraw(value, { gas: 2000 }, (error, success) => {
        if (error) {
          return reject(error);
        }
        console.log(success);
        return resolve(success);
      });
    });
  }


  async refreshValues() {
    const { web3, contract, userAddress } = this.state;
    const [userWallet, userVault] = await Promise.all([
      this.getWallet(web3, userAddress),
      this.getVault(contract, userAddress),
    ]);

    this.setState(() => ({
      ...this.state,
      userWallet,
      userVault,
    }));
  }

  updateState(key, value) {
    let warning = '';
    if (key === 'actionAmount') {
      const initialValue = value;
      value = this.determineMaxAvailable(value);
      if (initialValue !== value) {
        warning = 'Warning: Insufficent Funds to perform this action.';
      }
    }

    this.setState(() => ({
      ...this.state,
      [key]: value,
      warning: warning,
    }));
  }

  determineMaxAvailable(amount) {
    const { actionType, userWallet, userVault } = this.state

    if (actionType === 'deposit' && amount > userWallet) {
      return userWallet;
    } 
    
    if (actionType === 'withdraw' && amount > userVault) {
      return userVault;
    }

    return amount;
  }

  performAction(e) {
    e.preventDefault();
    const { actionType, actionAmount } = this.state;
    let promise;

    switch (actionType) {
      case 'deposit':
        promise = this.makeDeposit(actionAmount);
        break;

      case 'withdraw':
        promise = this.makeWithdraw(actionAmount);
        break;

      default:
        return;
    }

    promise.then(() => {
      this.refreshValues();
    })
      .catch((error) => {
        if (error.message.startsWith('Error: MetaMask Tx Signature:')) {
          return;
        }
        console.log(error);
        this.setState(() => ({
          ...this.state,
          error: 'Looks like something went wrong.  Please try again!',
        }));
      });
  }

  renderError () {
    if (!this.state.error) {
      return null;
    }

    return <DisplayError error={this.state.error} />;
  }


  render() {
    return (
      <div className="App">
        <Header />
        { this.renderError.call(this) }
        <Account
          userAddress={this.state.userAddress}
          walletBalance={this.state.userWallet.toString()}
          vaultBalance={this.state.userVault.toString()} 
        />
        <Actions 
          warning={this.state.warning}
          actionType={this.state.actionType}
          actionAmount={this.state.actionAmount.toString()}
          updateState={this.updateState}
          performAction={this.performAction}
        />

        <RecentEvents events={this.state.events} />
      </div>
    );
  }
}

export default App;
