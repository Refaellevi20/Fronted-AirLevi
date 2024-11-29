import { userService } from "../services/user.service.local"

export const CHANGE_COUNT = 'CHANGE_COUNT'
export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_WISH_LIST = 'SET_WISH_LIST'
export const NOTIFY = 'NOTIFY'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS'



const initialState = {
    user: userService.getLoggedinUser(),
    users: [],
    watchedUser: null,
    notifications: []

}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        case SET_WISH_LIST:
            newState = { ...state, user: { ...state.user, score: action.score } }
            break

        case NOTIFY:
            return { ...state, notifications: [...state.notifications, action.notification] }
        case REMOVE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notification) => notification.type !== action.notificationType
                )
            }
        case CLEAR_NOTIFICATIONS:
            return {
                ...state,
                notifications: []
            }

        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
