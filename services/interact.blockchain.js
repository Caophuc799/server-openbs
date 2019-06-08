import EcommerceStore from './OpenBS.blockchain'
import web3 from './web3'
import { async } from '@firebase/util';
// let accountEther = await web3.eth.accounts.privateKeyToAccount(walletPrivateKey)
// const account = await web3.eth.accounts.wallet.add(accountEther)
const initAccount = async () => {

}
const addDiary = async (data) => {
  EcommerceStore.methods.addProductToStore(data.from, data.to, data.action, data.description).send({
    from: web3.eth.accounts[0] || accounts[0], gas: 5000000
  }, (error, transactionHash) => {
    if (error) {
      AlerService.swal.close()
      return AlerService.errorPopup('Error', 'Add to Ethereum fail!', console.log(error))
    }
    this.setState({ transactionHash }, AlerService.successPopup('Thành Công!!'))
  })
}
