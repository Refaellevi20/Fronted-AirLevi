import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'orders'

export const orderService = {
  query,
  getById,
  remove,
  save,
  getEmptyOrder,
}

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
//! here testing
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
      _id: uuidv4(), //! here uuid
      // _id: '',
      fullname: 'baba',
      // imgUrl,
      imgUrl: "https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg",
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
      price:20,
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
        loc: { lat: 114.15202,
          lng: 22.28582},
      },
      msgs: [],
      status: 'pending',
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
      status: 'pending', 
    },
    {
      _id: 'o1223',
      hostId: 'u101',
      buyer: {
        _id: 'u102',
        fullname: 'Puki guest',
        imgURL: 'https://robohash.org/pukiguest',
      },
      totalPrice: 360,
      startDate: '2023/10/12',
      endDate: '2023/3/8',
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
      status: 'pending',
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
