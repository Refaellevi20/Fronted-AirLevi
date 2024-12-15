import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
// import { stayService } from './stay.service.local.js'
// import { userService } from './user.service.js'

export const orderService = {
  query,
  getById,
  remove,
  save,
  getEmptyOrder,
}
const STORAGE_KEY = 'orders'

_createOrders()

async function query(filterBy = {}) {
  let orders = await storageService.query(STORAGE_KEY)
  if (filterBy.hostId) {
    orders = orders.filter((order) => order.hostId === filterBy.hostId)
  }
  if (filterBy.buyerId) {
    orders = orders.filter((order) => order.buyer._id === filterBy.buyerId)
  }
  return orders
}

async function getById(orderId) {
  const stays = await storageService.get(STORAGE_KEY, orderId)
  return stays
}

async function remove(orderId) {
  return storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
  console.log('order', order)
  if (order._id) {
    return storageService.put(STORAGE_KEY, order)
  } else {
    return storageService.post(STORAGE_KEY, order)
  }
}

function getEmptyOrder(
  startDate = null,
  endDate = null,
  guests = { adults: 0, kids: 0, infants: 0, pets: 0 },
  stay = { _id: null, name: null }
) {
  return {
    _id: null,
    hostId: null,
    buyer: {
      // _id: userService.getLoggedinUser()._id,
      // fullname: userService.getLoggedinUser().fullname
      _id: '',
      fullname: '',
      imgUrl: '',
    },
    totalPrice: 0,
    startDate,
    endDate,
    guests,
    stay,
    msgs: [],
    status: 'pending',
  }
}

function _createdDemoOrders() {
  let DEMO_ORDERS = [
    {
      _id: 'o12251',
      hostId: 'u101',
      buyer: {
        _id: 'u102',
        fullname: 'Puki guest',
        imgURL: 'https://robohash.org/pukiguest',
      },
      totalPrice: 160,
      startDate: '2025/10/15',
      endDate: '2025/10/17',
      guests: {
        adults: 2,
        kids: 1,
        infants: 0,
        pets: 0,
      },
      stay: {
        _id: 'h102',
        name: 'House Of Uncle My',
        price: 80.0,
        loc: {},
      },
      msgs: [],
      status: 'pending', // pending, approved
    },
    {
      _id: 'o1225',
      hostId: 'u101',
      buyer: {
        _id: 'u102',
        fullname: 'Puki guest',
        imgURL: 'https://robohash.org/pukiguest',
      },
      totalPrice: 160,
      startDate: '2025/01/8',
      endDate: '2025/01/17',
      guests: {
        adults: 2,
        kids: 1,
        infants: 0,
        pets: 0,
      },
      stay: {
        _id: 'h102',
        name: 'House Of Uncle My',
        price: 80.0,
        loc: {},
      },
      msgs: [],
      status: 'pending', // pending, approved
    },
    {
      _id: 'o1223',
      hostId: 'u101',
      buyer: {
        _id: 'u102',
        fullname: 'Puki guest',
        imgURL: 'https://robohash.org/pukiguest',
      },
      totalPrice: 160,
      startDate: '2025/10/15',
      endDate: '2025/10/17',
      guests: {
        adults: 2,
        kids: 1,
        infants: 0,
        pets: 0,
      },
      stay: {
        _id: 'h104',
        name: 'Amizing apartment in center. ',
        price: 100.0,
        loc: {},
      },
      msgs: [],
      status: 'pending', // pending, approved
    },
  ]
  utilService.saveToStorage(
    STORAGE_KEY,
    JSON.parse(JSON.stringify(DEMO_ORDERS))
  )
}

function _createOrders() {
  let orders = utilService.loadFromStorage(STORAGE_KEY)
  if (!orders || !orders.length) {
    _createdDemoOrders()
  }
}
