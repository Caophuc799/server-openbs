import { walletAddress, contractAddress, walletPrivateKey } from '../constants/constant'
import web3 from '../services/web3'
import TokenOpenBS from '../services/TokenOpenBS'

class OpenBS {
  async mintUniqueTokenTo (_to, _tokenId, _tokenURI) {
    var transfer = TokenOpenBS.methods.mintUniqueTokenTo(_to, _tokenId, _tokenURI)
    var encodedABI = transfer.encodeABI()
    var gasPrice = await web3.eth.getGasPrice()
    var tx = {
      from: walletAddress,
      to: contractAddress,
      gas: 5000000,
      data: encodedABI,
      gasPrice: gasPrice * 10
    }
    let result = web3.eth.accounts.signTransaction(tx, walletPrivateKey).then(signed => {
      return web3.eth.sendSignedTransaction(signed.rawTransaction)
        .on('confirmation', (confirmationNumber, receipt) => {
          // console.log('confirmation: ' + confirmationNumber)
          return confirmationNumber
        })
        .on('transactionHash', hash => {
          // console.log('hash')
          // console.log(hash)
          return hash
        })
        .on('receipt', receipt => {
          // console.log('reciept')
          // console.log(receipt)
          return receipt
        })
        .on('error', error => {
          // console.log(error)
          return error
        })
    })
    return result
  }
}

export default new OpenBS()
