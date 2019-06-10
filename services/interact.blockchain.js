import { walletPrivateKey, addressSC } from '../constants/constant'
import web3 from './web3'
import EcommerceStore from './OpenBS.blockchain'
import EthereumTx from 'ethereumjs-tx'
import { async } from '@firebase/util';
let addressOwner
let accountEther
// const account = await web3.eth.accounts.wallet.add(accountEther)
const initBC = async () => {
  accountEther = await web3.eth.accounts.privateKeyToAccount(walletPrivateKey)
  addressOwner = accountEther.address
}
const createAccount = async () => {
  const account = web3.eth.accounts.create()
  sendEtherForNewUser(account.address)
  return account
}
const addNewAction = async (input) => {
  console.log('addnewAction')
  let accountEther = await web3.eth.accounts.privateKeyToAccount(walletPrivateKey)
  const data = EcommerceStore.methods.addNewAction(`${input.from}`, `${input.to}`, input.action, input.description).encodeABI()
  const nonce = await getNonce(web3, input.address || accountEther.address)
  console.log(nonce)
  const txParam = {
    from: input.address || accountEther.address,
    nonce: nonce,
    gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')), // web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
    gasLimit: 8000000,
    to: addressSC,
    data: data
  }
  const tx = new EthereumTx(txParam)
  let priKey = input.priKey || walletPrivateKey
  let privateKey = new Buffer.from(priKey.substr(2, priKey.length), 'hex');
  tx.sign(privateKey)
  const rawTx = '0x' + tx.serialize().toString('hex')
  const response = web3.utils.keccak256(rawTx)
  console.log('caculate', response)
  const result = await web3SendSignedTransaction(web3, rawTx)
  console.log(result)
  return result
}

const getNonce = async (web3, accountAddress) => {
  if (!accountAddress) {
    return Promise.reject('Missing ETH Address')
  }
  const nonce = await web3GetTransactionCount(web3, accountAddress)
  return nonce
}

const web3SendSignedTransaction = (web3, ...args) => new Promise((resolve, reject) => {
  web3.eth.sendSignedTransaction(...args, (error, doc) => {
    if (error) {
      reject(error)
      } else {
      resolve(doc)
      }
  }).on('receipt', (receipt) => {
    console.log('receipt', receipt);
  })
})

const web3GetTransactionCount = (web3, ...args) => new Promise((resolve, reject) => {
  web3.eth.getTransactionCount(...args, (error, doc) => {
    if (error) {
      reject(error)
    } else {
      resolve(doc)
    }
  })
})

const sendEtherForNewUser = async (destAddress) => {
  console.log('sendEtherForNewUser')
  const nonce = await getNonce(web3, addressOwner);
  const txParams = {
    from: addressOwner,
    nonce: nonce,
    gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
    gasLimit: 8000000,
    to: destAddress,
    value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
  };
  const tx = new EthereumTx(txParams);
  let privateKey = new Buffer.from(walletPrivateKey.substr(2, walletPrivateKey.length), 'hex');
  tx.sign(privateKey)
  const rawTx = '0x' + tx.serialize().toString('hex');
  const response = web3.utils.keccak256(rawTx);
  web3SendSignedTransaction(web3, rawTx);
  return response;
}

export default {
  addNewAction,
  createAccount,
  initBC
}
