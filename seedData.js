import User from './models/user'
import Cooperative from './models/cooperative'
import Mangotree from './models/tree'
import Feedback from './models/feedback'
import Purchase from './models/purchase.history'

export const removeData = async () => {
  // await User.deleteMany({}, function (_err, numberRemoved) {
  //   console.log(' Delete all User ' + numberRemoved)
  // })
  // await Cooperative.deleteMany({}, function (_err, numberRemoved) {
  //   console.log(' Delete all Cooperative ' + numberRemoved)
  // })
  // await Mangotree.deleteMany({}, function (_err, numberRemoved) {
  //   console.log(' Delete all Mangotree ' + numberRemoved)
  // })
  // await Feedback.deleteMany({}, function (_err, numberRemoved) {
  //   console.log(' Delete all Feedback ' + numberRemoved)
  // })
  await Purchase.deleteMany({}, function (_err, numberRemoved) {
    console.log(' Delete all Purchase ' + numberRemoved)
  })
}

export const createData = async () => {
  await new Promise((resolve, reject) => {
    const currentUser = {
      avatar: 'QmQ66njK6KTGY2fMGNk7WAy2wLGxQN9DRvkqzaCQG9oUvF',
      phoneNumber: '2',
      active: true,
      verify: true,
      rand: 79045,
      firstName: 'Cao',
      lastName: 'Phuc',
      dateOfBirth: '2011-10-01T17:00:00.000Z',
      email: 'caophuc799@gmail.com',
      address: 'KTX',
      password: 'hello'
    }
    User.create(currentUser, (_error, _user) => {
      const currentCooperative = [{
        logo: 'QmXZiBbFk2Xhyuzdoqvr869HkKg9JhCSpnkwqHcJj9gAfy',
        active: true,
        verify: true,
        rand: 0,
        idRepresentation: _user._id,
        taxCode: '1234123',
        name: 'Xoai',
        description: 'Xoài',
        email: 'caophuc799@gmail.com',
        phoneNumber: '012366885',
        address: 'thanh hoa',
        password: 'hello'
      },
      {
        logo: 'QmUNFidVTqak4VXBP6HWSUx8RMsVsdPCwKobuQo45Mff7C',
        active: true,
        verify: true,
        rand: 0,
        idRepresentation: _user._id,
        taxCode: '1234124',
        name: 'Sáu Xoài',
        description: 'Sáu Xoài',
        email: 'caophuc7991@gmail.com',
        phoneNumber: '012366885',
        address: 'thanh hoa',
        password: 'hello'
      },
      {
        logo: 'QmRW8o6fKarhurk3BDFGoqn5PR1Mi9z7Yb9H8t8Ur9zxYC',
        active: true,
        verify: true,
        rand: 0,
        idRepresentation: _user._id,
        taxCode: '1234125',
        name: 'Xoài cam lâm',
        description: 'Xoài cam lâm',
        email: 'caophuc7992@gmail.com',
        phoneNumber: '012366885',
        address: 'thanh hoa',
        password: 'hello'
      },
      {
        logo: 'QmUkadaYGmSnr6QxfJgF6tbPzx6aMpEXhbuzHBpbr253D8',
        active: true,
        verify: true,
        rand: 0,
        idRepresentation: _user._id,
        taxCode: '1204123',
        name: 'Xoài cát tiền giang',
        description: 'Xoài cát tiền giang',
        email: 'caophuc7993@gmail.com',
        phoneNumber: '012366885',
        address: 'thanh hoa',
        password: 'hello'
      },
      {
        logo: 'QmXZiBbFk2Xhyuzdoqvr869HkKg9JhCSpnkwqHcJj9gAfy',
        active: true,
        verify: true,
        rand: 0,
        idRepresentation: _user._id,
        taxCode: '1534123',
        name: 'Xoài lắc ba thơ',
        email: 'caophuc7994@gmail.com',
        phoneNumber: '012366885',
        address: 'thanh hoa',
        password: 'hello',
        description: 'Xoài lắc ba thơ'
      }]
      Promise.all(
        currentCooperative.map(item => {
          return Cooperative.create(item)
            .then(mangotree => {
              return mangotree
            })
            .catch(error => {
              return error
            })
        })).then(result => {
        // console.log(result)
        console.log('result Cooperative')
        seedMangoTree(result)
      }).catch(error => {
        console.log(error)
      })
    })
  })
}

export const seedMangoTree = async (cooperative) => {
  await new Promise((resolve, reject) => {
    console.log('seedMangoTree')
    const currentMangotree = [
      {
        'name': 'Xoài cát Tiền Giang 1',
        'numberId': '112',
        'cooperativeId': cooperative[0]._id,
        'address': 'Nam bac',
        'location': { 'longitude': '1234', 'latitude': '123' },
        'category': 'Xoài',
        'price': 12,
        'stateTree': [{
          'image': ['QmVwBJ3zDDrWqeg67iDV4gYUFfjaSmwCdNbKLN4oavQYLP'],
          'quantity': '12/12',
          'description': 'gia tot'
        }],
        'purchasehistory': [],
        'timeStartPlant': '10/21/2019',
        'startTimeSelling': '12/22/2019',
        'endTimeSelling': '12/22/2028'
      },
      {
        'name': 'Xoài Sáu Xoài 1',
        'numberId': '2',
        'cooperativeId': cooperative[0]._id,
        'address': 'Nam bac',
        'location': { 'longitude': '1234', 'latitude': '123' },
        'category': 'Xoài',
        'price': 12,
        'stateTree': [{
          'image': ['QmXy5R5SqCb47ut6MZuJHBo9yqNMY2nUR9XkU6d5wbRm6b'],
          'quantity': '12/12',
          'description': 'gia tot'
        }],
        'purchasehistory': [],
        'timeStartPlant': '10/21/2019',
        'startTimeSelling': '12/22/2019',
        'endTimeSelling': '12/22/2028'
      },
      {
        'name': 'Xoài Cam Lâm 1',
        'numberId': '2',
        'cooperativeId': cooperative[1]._id,
        'address': 'Nam bac',
        'location': { 'longitude': '1234', 'latitude': '123' },
        'category': 'Xoài',
        'price': 12,
        'stateTree': [{
          'image': ['QmenFoCpUZF5FHijDwxFCn5vSpg9N5uJxU49PnVs3kMLCg'],
          'quantity': '12/12',
          'description': 'gia tot'
        }],
        'purchasehistory': [],
        'timeStartPlant': '10/21/2019',
        'startTimeSelling': '12/22/2019',
        'endTimeSelling': '12/22/2028'
      },
      {
        'name': 'Xoài cam lâm 2',
        'numberId': '2',
        'cooperativeId': cooperative[2]._id,
        'address': 'Nam bac',
        'location': { 'longitude': '1234', 'latitude': '123' },
        'category': 'Xoài',
        'price': 12,
        'stateTree': [{
          'image': ['QmfXUFs1QBkaDHMrwBqkDSDzovtVXafvLRXgLk3BxxEKfJ'],
          'quantity': '12/12',
          'description': 'gia tot'
        }],
        'purchasehistory': [],
        'timeStartPlant': '10/21/2019',
        'startTimeSelling': '12/22/2019',
        'endTimeSelling': '12/22/2028'
      },
      {
        'name': 'Xoài cát 5',
        'numberId': '22',
        'cooperativeId': cooperative[2]._id,
        'address': 'Nam bac',
        'location': { 'longitude': '1234', 'latitude': '123' },
        'category': 'Xoài',
        'price': 12,
        'stateTree': [{
          'image': ['QmZxjUKjk8uG6buvCDHfDzD6fmKdPMESBwVFodPbiZba4E'],
          'quantity': '12/12',
          'description': 'gia tot'
        }],
        'purchasehistory': [],
        'timeStartPlant': '10/21/2019',
        'startTimeSelling': '12/22/2019',
        'endTimeSelling': '12/22/2028'
      },
      {
        'name': 'Xoài Ba Thơ Vàng',
        'numberId': '22',
        'cooperativeId': cooperative[3]._id,
        'address': 'Nam bac',
        'location': { 'longitude': '1234', 'latitude': '123' },
        'category': 'Xoài',
        'price': 12,
        'stateTree': [{
          'image': ['QmfXqnPGdpsRi7sdgYbsFb6B4yfLiP6yWi7uTWPbJPpNjw'],
          'quantity': '12/12',
          'description': 'gia tot'
        }],
        'purchasehistory': [],
        'timeStartPlant': '10/21/2019',
        'startTimeSelling': '12/22/2019',
        'endTimeSelling': '12/22/2028'
      },
      {
        'name': 'Xoài Ba Thơ Tím',
        'numberId': '22',
        'cooperativeId': cooperative[3]._id,
        'address': 'Nam bac',
        'location': { 'longitude': '1234', 'latitude': '123' },
        'category': 'Xoài',
        'price': 12,
        'stateTree': [{
          'image': ['QmPWJRsHgUWYYuEMURbWpt23t4cz6eix3oiCHUQhdzmSrU'],
          'quantity': '12/12',
          'description': 'gia tot'
        }],
        'purchasehistory': [],
        'timeStartPlant': '10/21/2019',
        'startTimeSelling': '12/22/2019',
        'endTimeSelling': '12/22/2028'
      } ]
    Promise.all(
      currentMangotree.map(item => {
        return Mangotree.create(item)
          .then(mangotree => {
            return mangotree
          })
          .catch(error => {
            return error
          })
      })).then(result => {
      // console.log(result)
      console.log('Result seedMangoTree')
    }).catch(error => {
      console.log(error)
    })
  })
}
