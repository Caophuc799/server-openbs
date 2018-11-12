import User from './models/user'
import Cooperative from './models/cooperative'
import Mangotree from './models/mangotree'

export const removeData = async () => {
  await User.deleteMany({}, function (_err, numberRemoved) {
    console.log(' Delete all User ' + numberRemoved)
  })
  await Cooperative.deleteMany({}, function (_err, numberRemoved) {
    console.log(' Delete all Cooperative ' + numberRemoved)
  })
  await Mangotree.deleteMany({}, function (_err, numberRemoved) {
    console.log(' Delete all Mangotree ' + numberRemoved)
  })
}

export const seedUser = () => {
  return new Promise((resolve, reject) => {
    const currentUser = {
      avatar: 'QmQ66njK6KTGY2fMGNk7WAy2wLGxQN9DRvkqzaCQG9oUvF',
      phoneNumber: '2',
      active: true,
      verify: true,
      rand: 79045,
      _id: '5bdc1c0c190ff22b68a98ece',
      firstName: 'Cao',
      lastName: 'Phuc',
      dateOfBirth: '2011-10-01T17:00:00.000Z',
      email: 'caophuc799@gmail.com',
      address: 'KTX',
      password: '$2b$08$BTNRwm7iNHf1TgMBxmitj.DPy.k9P05IXBFzoNRH.92O4Hjuwb1Ie'
    }
    User.create(currentUser)
      .then(user => resolve(user))
      .catch(error => {
        return reject(error)
      })
  })
}

export const seedCooperative = () => {
  return new Promise((resolve, reject) => {
    const currentCooperative = [{
      logo: 'QmXZiBbFk2Xhyuzdoqvr869HkKg9JhCSpnkwqHcJj9gAfy',
      active: true,
      verify: true,
      rand: 0,
      _id: '5bdc2750b003813780a29b8b',
      idRepresentation: '5bdc1c0c190ff22b68a98ece',
      taxCode: '1234123',
      name: 'Xoai',
      email: 'caophuc799@gmail.com',
      phoneNumber: '012366885',
      address: 'thanh hoa',
      password: '$2b$08$ZJzUhErPoV9pHHSwJvls.O5zXRZxRNnXeg4jytARtVAbBdT/fRpHa'
    },
    {
      logo: 'QmUNFidVTqak4VXBP6HWSUx8RMsVsdPCwKobuQo45Mff7C',
      active: true,
      verify: true,
      rand: 0,
      _id: '5bdc2750b003813780a29b8a',
      idRepresentation: '5bdc1c0c190ff22b68a98ece',
      taxCode: '1234124',
      name: 'Sáu Xoài',
      email: 'caophuc799@gmail.com',
      phoneNumber: '012366885',
      address: 'thanh hoa',
      password: '$2b$08$ZJzUhErPoV9pHHSwJvls.O5zXRZxRNnXeg4jytARtVAbBdT/fRpHa'
    },
    {
      logo: 'QmRW8o6fKarhurk3BDFGoqn5PR1Mi9z7Yb9H8t8Ur9zxYC',
      active: true,
      verify: true,
      rand: 0,
      _id: '5bdc2750b003813780a29b6b',
      idRepresentation: '5bdc1c0c190ff22b68a98ece',
      taxCode: '1234125',
      name: 'Xoài cam lâm',
      email: 'caophuc799@gmail.com',
      phoneNumber: '012366885',
      address: 'thanh hoa',
      password: '$2b$08$ZJzUhErPoV9pHHSwJvls.O5zXRZxRNnXeg4jytARtVAbBdT/fRpHa'
    },
    {
      logo: 'QmUkadaYGmSnr6QxfJgF6tbPzx6aMpEXhbuzHBpbr253D8',
      active: true,
      verify: true,
      rand: 0,
      _id: '5bdc2750b003813780a29b4b',
      idRepresentation: '5bdc1c0c190ff22b68a98ece',
      taxCode: '1204123',
      name: 'Xoài cát tiền giang',
      email: 'caophuc799@gmail.com',
      phoneNumber: '012366885',
      address: 'thanh hoa',
      password: '$2b$08$ZJzUhErPoV9pHHSwJvls.O5zXRZxRNnXeg4jytARtVAbBdT/fRpHa'
    },
    {
      logo: 'QmXZiBbFk2Xhyuzdoqvr869HkKg9JhCSpnkwqHcJj9gAfy',
      active: true,
      verify: true,
      rand: 0,
      _id: '5bdc2750b003813780a39b8b',
      idRepresentation: '5bdc1c0c190ff22b68a98ece',
      taxCode: '1534123',
      name: 'Xoài lắc ba thơ',
      email: 'caophuc799@gmail.com',
      phoneNumber: '012366885',
      address: 'thanh hoa',
      password: '$2b$08$ZJzUhErPoV9pHHSwJvls.O5zXRZxRNnXeg4jytARtVAbBdT/fRpHa'
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
    }).catch(error => {
      console.log(error)
    })
  })
}

export const seedMangoTree = () => {
  return new Promise((resolve, reject) => {
    const currentMangotree = [{
      image: 'QmVwBJ3zDDrWqeg67iDV4gYUFfjaSmwCdNbKLN4oavQYLP',
      idBuyer: null,
      savedInEther: false,
      _id: '5be52be9dcd546284863588f',
      idTree: '1',
      name: 'Xoài cát Tiền Giang 1',
      category: 'Xoài',
      description: 'good',
      timeStartPlant: '2000-12-11T17:00:00.000Z',
      idCooperative: '5bdc2750b003813780a29b4b',
      price: 21,
      oldBuyer: [],
      productivity: []
    },
    {
      image: 'QmXy5R5SqCb47ut6MZuJHBo9yqNMY2nUR9XkU6d5wbRm6b',
      idBuyer: null,
      savedInEther: false,
      _id: '5be52be9dcd546284863588e',
      idTree: '2',
      name: 'Xoài Sáu Xoài 1',
      category: 'Xoài',
      description: 'good',
      timeStartPlant: '2000-12-11T17:00:00.000Z',
      idCooperative: '5bdc2750b003813780a29b8a',
      price: 24,
      oldBuyer: [],
      productivity: []
    },
    {
      image: 'QmenFoCpUZF5FHijDwxFCn5vSpg9N5uJxU49PnVs3kMLCg',
      idBuyer: null,
      savedInEther: false,
      _id: '5be52be9dcd546284863588c',
      idTree: '3',
      name: 'Xoài Cam Lâm 1',
      category: 'Xoài',
      description: 'good',
      timeStartPlant: '2000-12-11T17:00:00.000Z',
      idCooperative: '5bdc2750b003813780a29b6b',
      price: 25,
      oldBuyer: [],
      productivity: []
    },
    {
      image: 'QmfXUFs1QBkaDHMrwBqkDSDzovtVXafvLRXgLk3BxxEKfJ',
      idBuyer: null,
      savedInEther: false,
      _id: '5be52be9dcd546284863588b',
      idTree: '4',
      name: 'Xoài cam lâm 2',
      category: 'Xoài',
      description: 'good',
      timeStartPlant: '2000-12-11T17:00:00.000Z',
      idCooperative: '5bdc2750b003813780a29b6b',
      price: 26,
      oldBuyer: [],
      productivity: []
    },
    {
      image: 'QmZxjUKjk8uG6buvCDHfDzD6fmKdPMESBwVFodPbiZba4E',
      idBuyer: null,
      savedInEther: false,
      _id: '5be52be9dcd546284863588d',
      idTree: '5',
      name: 'Xoài cát 5',
      category: 'Xoài',
      description: 'good',
      timeStartPlant: '2000-12-11T17:00:00.000Z',
      idCooperative: '5bdc2750b003813780a29b8b',
      price: 27,
      oldBuyer: [],
      productivity: []
    },
    {
      image: 'QmfXqnPGdpsRi7sdgYbsFb6B4yfLiP6yWi7uTWPbJPpNjw',
      idBuyer: null,
      savedInEther: false,
      _id: '5be52be9dcd546284863588a',
      idTree: '6',
      name: 'Xoài Ba Thơ Vàng',
      category: 'Xoài',
      description: 'good',
      timeStartPlant: '2000-12-11T17:00:00.000Z',
      idCooperative: '5bdc2750b003813780a39b8b',
      price: 29,
      oldBuyer: [],
      productivity: []
    },
    {
      image: 'QmPWJRsHgUWYYuEMURbWpt23t4cz6eix3oiCHUQhdzmSrU',
      idBuyer: null,
      savedInEther: false,
      _id: '5be52be9dcd546284863568a',
      idTree: '9',
      name: 'Xoài Ba Thơ Tím',
      category: 'Xoài',
      description: 'good',
      timeStartPlant: '2000-12-11T17:00:00.000Z',
      idCooperative: '5bdc2750b003813780a39b8b',
      price: 29,
      oldBuyer: [],
      productivity: []
    }]
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
    }).catch(error => {
      console.log(error)
    })
  })
}
