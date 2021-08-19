import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import PriceOracle from './PriceOracle.json'

  class App extends Component {

    async componentWillMount() {
      await this.loadWeb3()
      await this.loadBlockchainData()
    }
  
    async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    }

    async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = PriceOracle.networks[networkId]
    if(networkData) {
      const contract = new web3.eth.Contract(PriceOracle.abi, networkData.address)
      this.setState({ contract })
      const oracle = await contract.methods.getLatestPrice().call()/100000000
      this.setState({ oracle })
      console.log(oracle);
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)

    this.state = {
     
      contract: null,
      web3: null,
      account: null,
      
    }
  }
    
   
  render(){
  return (
    <div className="App">
      <header className="App-header">
   <h2>The latest price feed for ether ETH/USD using chainlink </h2>
   
   <p>Value :{this.state.oracle}</p>
      </header>
     
    </div>
  );
  }
}
  
  
export default App;
