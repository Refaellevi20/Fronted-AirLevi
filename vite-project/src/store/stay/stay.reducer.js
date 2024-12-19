import { stayService } from "../../services/stay.service"

export const SET_STAYS = 'SET_STAYS'
export const SAVE_STAYS = 'SAVE_STAYS'
export const TOGGLE_LIKE_STAY = 'LIKE_STAYS'
export const REMOVE_STAYS = 'REMOVE_STAYS'
export const UPDATE_STAYS = 'UPDATE_STAYS'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_LABELS = 'SET_LABELS'
export const UNDO_TOGGLE_LIKE_STAY = 'UNDO_LIKE_STAY'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const UPDATE_STAY = 'UPDATE_STAY'
export const SET_CURRENCY = 'SET_CURRENCY'

const initialState = {
  stays: [],
  labels: [],
  lastLikedStay: null,
  isLoading: false,
  filterBy: stayService.getDefaultFilter(),
  currency: 'USD',
}

export function stayReducer(state = initialState, action) {
  let stays = []

  switch (action.type) {
    case SET_STAYS:
      return { ...state, stays: action.stays }
      case SET_CURRENCY:
        // console.log('Setting currency to', action.currency)
        return { ...state, currency: action.currency }
      case UPDATE_STAY:
        stays = state.stays.map(stay => (stay._id === action.stay._id) ? action.stay : stay)
        return { ...state, stays }
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading }
    case SAVE_STAYS:
      return { ...state, stays: [...state.stays, action.stay] }
    case UPDATE_STAYS:
      stays = state.stays.map(stay => (stay._id === action.stay._id) ? action.stay : stay)
      return { ...state, stays }
      case SET_FILTER_BY:
        return { ...state, filterBy: action.val }
    case REMOVE_STAYS:
      stays = state.stays.filter((stay) => stay._id !== action.stayId)
      return { ...state, stays }
    case SET_LABELS:
        return { ...state, filterBy: action.filterBy }
    case TOGGLE_LIKE_STAY:
      const likedStay = state.stays.find(stay => stay._id === action.stayId)
      if (!!likedStay.likedByUsers.find(user => user._id === action.user._id)) {
        likedStay.likedByUsers = likedStay.likedByUsers.filter(user => user._id !== action.user._id)
      } else {
        likedStay.likedByUsers = [...likedStay.likedByUsers, action.user]
      }
      stays = state.stays.map(stay => (stay._id === action.stayId) ? likedStay : stay)
      return { ...state, stays, lastLikedStay: { stayId: action.stayId, user: action.user } }
    case UNDO_TOGGLE_LIKE_STAY:
      if (state.lastLikedStay) {
        const lastLikedStay = state.stays.find(stay => stay._id === state.lastLikedStay.stayId)
        if (lastLikedStay.likedByUsers.find(user => user._id === action.user._id)) {
          lastLikedStay.likedByUsers = lastLikedStay.likedByUsers.filter(user => user._id !== action.user._id)
        } else {
          lastLikedStay.likedByUsers = [...lastLikedStay.likedByUsers, action.user]
        }
        return { ...state, stays: [...state.stays, lastLikedStay], lastLikedStay: null }
      }
      break
    default:
      return { ...state }

  }
}
