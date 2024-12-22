import { orderService } from '../services/order.service.js'
import { store } from './store.js'
import { ADD_ORDER, REMOVE_ORDER, SET_ORDERS, UPDATE_ORDER, } from './order.reducer.js'
import { SET_WATCHED_USER } from './user.reducer.js'
import { LOADING_DONE, LOADING_START } from './system.reducer'

// Action Creators
export function getActionRemoveOrder(orderId) {
  return { type: REMOVE_ORDER, orderId }
}

 async (params) => {getActionAddOrder(params)
  params.LOADING_DONE
 }

export function getActionAddOrder(order) {
  return { type: ADD_ORDER, order }
}

export function getActionSetWatchedUser(user) {
  return { type: SET_WATCHED_USER, user }
}

export async function loadOrders(filterBy = {}) {
  store.dispatch({ type: LOADING_START })
  try {
    const orders = await orderService.query(filterBy)
    store.dispatch({ type: SET_ORDERS, orders })
  } catch (err) {
    console.log('OrderActions: error in loadOrders', err)
    throw err
  } finally {
    store.dispatch({ type: LOADING_DONE })
  }
}

export async function saveOrder(order) {
  try {
    const addedOrder = await orderService.save(order)
    store.dispatch(getActionAddOrder(addedOrder))
  } catch (err) {
    console.log('OrderActions: error in addOrder', err)
    throw err
  }
}

export async function updateOrder(order) {
  try {
    const updatedOrder = await orderService.save(order)
    store.dispatch({ type: UPDATE_ORDER, order: updatedOrder })
  } catch (err) {
    console.log('OrderActions: error in updateOrder', err)
    throw err
  }
}

export async function removeOrder(orderId) {
  try {
    await orderService.remove(orderId)
    store.dispatch(getActionRemoveOrder(orderId))
  } catch (err) {
    console.log('OrderActions: err in removeOrder', err)
    throw err
  }
}
