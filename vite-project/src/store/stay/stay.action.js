import { stayService } from '../../services/stay.service.local.js'
import { userService } from '../../services/user.service.local.js'
import { store } from '../store.js'

import { REMOVE_STAYS, SAVE_STAYS, SET_STAYS, TOGGLE_LIKE_STAY, UNDO_TOGGLE_LIKE_STAY, UPDATE_STAYS, } from './stay.reducer'

import { LOADING_DONE, LOADING_START } from '../system.reducer'
//  Load stays
export async function loadStays(filterBy = {}, sortBy = {}) {
  store.dispatch({ type: LOADING_START })
  try {
    const stays = await stayService.query(filterBy, sortBy)
    store.dispatch({ type: SET_STAYS, stays: stays })
  } catch (err) {
    console.log('Had issues loading stays: ', err)
    throw err
  }
  finally {
    store.dispatch({ type: LOADING_DONE })
  }
}

// Save stay
export async function saveStay(stay) {
  const type = stay._id ? UPDATE_STAYS : SAVE_STAYS
  try {
    const savedStay = await stayService.save(stay)
    store.dispatch({ type, stay: savedStay })
    return savedStay
  } catch (err) {
    console.error(`Cannot save stay: `, err)
    throw err
  }
}

// Delete stay
export async function removeStay(stayId) {
  try {
    await stayService.remove(stayId)
    store.dispatch({ type: REMOVE_STAYS, stayId })
  } catch (err) {
    console.log('Cannot delete stay: ', err)
    throw err
  }
}

// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
export async function onLikeStayOptimistic(stayId) {
  const user = userService.getLoggedinUser()
  store.dispatch({ type: TOGGLE_LIKE_STAY, stayId, user })
  try {
    const stay = await stayService.getById(stayId)
    const likedByUser = stay.likedByUsers.filter(
      (miniUser) => miniUser._id === user._id
    )

    if (likedByUser.length) {
      stay.likedByUsers.filter((miniUser) => miniUser._id !== user._id)
      await stayService.removeStayLike(stayId)
    } else {
      stay.likedByUsers.push(user)
      await stayService.addStayLike(stayId)
    }
  } catch (err) {
    console.log('Cannot update stay', err)
    store.dispatch({
      type: UNDO_TOGGLE_LIKE_STAY,
    })
  }
}

// export async function updateStay(stay) {
//   try {
//       const savedStay = await stayService.save(stay)
//       console.log('Updated stay action store:', savedStay)
//       store.dispatch(getActionUpdateStay(savedStay))
//       return savedStay
//   } catch (err) {
//       console.log('Cannot save stay', err)
//       throw err
//   }
// }

// export function getActionUpdatestay(stay) {
//   return {
//       type: UPDATE_STAYS,
//       stay
//   }
// }