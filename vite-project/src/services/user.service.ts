// user.service.ts
import { httpService } from './http.service'
import { socketService } from './socket.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

interface UserCred {
    username: string
    password: string
    fullname?: string
    score?: number
    isAdmin?: boolean
}

interface User {
    _id: string
    fullname: string
    imgUrl: string
    isOwner: boolean
}

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
}

// global.d.ts
interface Window {
    userService: typeof import('./user.service').userService
}

// window.userService = userService

async function getUsers(): Promise<User[]> {
    return await httpService.get(`user`)
}

async function getById(userId: string): Promise<User> {
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId: string): Promise<void> {
    return httpService.delete(`user/${userId}`)
}

async function login(userCred: UserCred): Promise<User | undefined> {
    const user = await httpService.post('auth/login', userCred)
    console.log(user)
    if (user) {
        socketService.login(user._id)
        return saveLocalUser(user)
    }
    return undefined
}

async function signup(userCred: UserCred): Promise<User | undefined> {
    const user = await httpService.post('auth/signup', userCred)
    socketService.login(user._id)
    return saveLocalUser(user)
}

async function logout(): Promise<void> {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.logout()
    await httpService.post('auth/logout')
}

function saveLocalUser(user: User): User {
    console.log(user)
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, isOwner: user.isOwner }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser(): User | null {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}

// Uncomment the following block for testing purposes
// (async () => {
//     await userService.signup({ fullname: 'Puki Norma', username: 'puki', password: '123', score: 10000, isAdmin: false })
//     await userService.signup({ fullname: 'Master Adminov', username: 'admin', password: '123', score: 10000, isAdmin: true })
//     await userService.signup({ fullname: 'Muki G', username: 'muki', password: '123', score: 10000 })
// })()