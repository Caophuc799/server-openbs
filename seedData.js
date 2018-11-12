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
    const currentCooperative = {
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
    }
    return Cooperative.create(currentCooperative)
      .then(cooperative => resolve(cooperative))
      .catch(error => {
        return reject(error)
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
      name: 'Xoài cát 1',
      category: 'Xoài',
      description: 'good',
      timeStartPlant: '2000-12-11T17:00:00.000Z',
      idCooperative: '5bdc2750b003813780a29b8b',
      price: 21,
      oldBuyer: [],
      productivity: []
    },
    {
      image: 'QmVwBJ3zDDrWqeg67iDV4gYUFfjaSmwCdNbKLN4oavQYLP',
      idBuyer: null,
      savedInEther: false,
      _id: '5be52be9dcd546284863588e',
      idTree: '2',
      name: 'Xoài cát 2',
      category: 'Xoài',
      description: 'good',
      timeStartPlant: '2000-12-11T17:00:00.000Z',
      idCooperative: '5bdc2750b003813780a29b8b',
      price: 24,
      oldBuyer: [],
      productivity: []
    },
    {
      image: 'QmVwBJ3zDDrWqeg67iDV4gYUFfjaSmwCdNbKLN4oavQYLP',
      idBuyer: null,
      savedInEther: false,
      _id: '5be52be9dcd546284863588c',
      idTree: '3',
      name: 'Xoài cát 3',
      category: 'Xoài',
      description: 'good',
      timeStartPlant: '2000-12-11T17:00:00.000Z',
      idCooperative: '5bdc2750b003813780a29b8b',
      price: 25,
      oldBuyer: [],
      productivity: []
    },
    {
      image: 'QmVwBJ3zDDrWqeg67iDV4gYUFfjaSmwCdNbKLN4oavQYLP',
      idBuyer: null,
      savedInEther: false,
      _id: '5be52be9dcd546284863588b',
      idTree: '4',
      name: 'Xoài cát 4',
      category: 'Xoài',
      description: 'good',
      timeStartPlant: '2000-12-11T17:00:00.000Z',
      idCooperative: '5bdc2750b003813780a29b8b',
      price: 26,
      oldBuyer: [],
      productivity: []
    },
    {
      image: 'QmVwBJ3zDDrWqeg67iDV4gYUFfjaSmwCdNbKLN4oavQYLP',
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
      image: 'QmVwBJ3zDDrWqeg67iDV4gYUFfjaSmwCdNbKLN4oavQYLP',
      idBuyer: null,
      savedInEther: false,
      _id: '5be52be9dcd546284863588a',
      idTree: '6',
      name: 'Xoài cát 6',
      category: 'Xoài',
      description: 'good',
      timeStartPlant: '2000-12-11T17:00:00.000Z',
      idCooperative: '5bdc2750b003813780a29b8b',
      price: 29,
      oldBuyer: [],
      productivity: []
    },
    {
      image: 'QmVwBJ3zDDrWqeg67iDV4gYUFfjaSmwCdNbKLN4oavQYLP',
      idBuyer: null,
      savedInEther: false,
      _id: '5be52be9dcd546284863568a',
      idTree: '9',
      name: 'Xoài cát 9',
      category: 'Xoài',
      description: 'good',
      timeStartPlant: '2000-12-11T17:00:00.000Z',
      idCooperative: '5bdc2750b003813780a29b8b',
      price: 29,
      oldBuyer: [],
      productivity: []
    },
    {
      image: 'QmVwBJ3zDDrWqeg67iDV4gYUFfjaSmwCdNbKLN4oavQYLP',
      idBuyer: null,
      savedInEther: false,
      _id: '5be52be9dcd546284863589a',
      idTree: '10',
      name: 'Xoài cát 10',
      category: 'Xoài',
      description: 'good',
      timeStartPlant: '2000-12-11T17:00:00.000Z',
      idCooperative: '5bdc2750b003813780a29b8b',
      price: 21,
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
      console.log(result)
    }).catch(error => {
      console.log(error)
    })
  })
}
