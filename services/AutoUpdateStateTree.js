import moment from 'moment'
import ModelName from '../constants/ModelName';
import Mangotree from '../models/tree'
const autoUpdateStatetree = new Promise((resolve, reject) => {
  Mangotree.find({}, projection, options)
    .sort({ createdAt: 'desc' })
    .populate({ path: 'cooperativeId', model: ModelName.CooperativeModel })
    .populate({ path: 'purchasehistory', model: ModelName.PurchaseHistoryModel })
    .then(mangotrees => {
      mangotrees = mangotrees.filter(item => {
        let purchasehistory = item.purchasehistory
        purchasehistory = purchasehistory.sort((a, b) => {
          if (a && moment(a.createdAt).isValid() && b && moment(b.createdAt).isValid() &&
              moment(a.createdAt).isAfter(b.createdAt)) {
            return 1
          }
          return -1
        })
        let temppurchase = purchasehistory[purchasehistory.length - 1]
        return !(temppurchase && moment().isBefore(temppurchase.endTime) && temppurchase.status !== 0)
      })
      mangotrees.forEach(tree => {
        delete tree.purchasehistory
      })
      resolve(mangotrees)
    })
    .catch(error => reject(error))
})

export default autoUpdateStatetree
