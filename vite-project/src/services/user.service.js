import { httpService } from './http.service'
import {socketService} from './socket.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    updateUserCount,
    getAllUsers,
}

window.userService = userService


async function getUsers() {
    return await httpService.get(`user`)
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
}

async function updateUser(user) {
    return await httpService.put(`user/${user._id}`,user)
}

async function updateUserCount(userId) {
    const user = await getById(userId)
    user.count = Number(user.count) || 0
    user.count += 1
    return await updateUser(user)
  }

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    console.log(user)
    if (user) {
        socketService.login(user._id)
        return saveLocalUser(user)
    }
}
async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    socketService.login(user._id)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.logout()
    return await httpService.post('auth/logout')
}

async function getAllUsers() {
    return await httpService.get('user/counts')
}

function saveLocalUser(user) {
    console.log(user)
    user = {_id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, isOwner: user.isOwner,count:Number(user.count) || 0}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    // const user = JSON.parse(sessionStorage)
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()



