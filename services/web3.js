const Web3 = require('web3')
const urlWeb = 'wss://ropsten.infura.io/v3/c28dbe6b4d7a4fa08c9335b00d0a9df6'
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'))
// const web3 = new Web3(new Web3.providers.WebsocketProvider(urlWeb))
module.exports = web3
