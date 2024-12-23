import { httpService } from './http.service'


export const orderService = {
    query,
    save,
    remove,
    getById,
    getEmptyOrder,
    addOrderMsg,
    removeOrderMsg
}

// window.us = orderService

async function query(filterBy = { stayId: '' }) {
    //should maybe be in body?
    var queryStr = (!filterBy) ? '' : `?stayId=${filterBy.stayId || ''}`
    return await httpService.get(`order${queryStr}`)
}

async function getById(orderId) {
    return await httpService.get(`order/${orderId}`)
}

async function remove(orderId) {
    return await httpService.delete(`order/${orderId}`)
}

async function save(order) {
    if (order._id) {
        return await httpService.put(`order/${order._id}`, order)
    } else {
        return await httpService.post(`order`, order)
    }
}

async function addOrderMsg(orderId, msg) {
    return await httpService.post(`order/${orderId}/msg`, msg)
}

// async function removeOrderMsg(orderId, msgId) {
//     return await httpService.delete(`order/${orderId}/msg/${msgId}`)
// }

async function removeOrderMsg(req, res) {
    try {
        const { orderId, msgId } = req.params
        const updatedOrder = await orderService.removeOrderMsg(orderId, msgId)
        res.json(updatedOrder)
    } catch (err) {
        res.status(500).send({ err: 'Failed to remove message' })
    }
}

// async function removeOrderMsg(orderId, msgId) {
//     try {
//         // Make sure this endpoint matches your backend route
//         const updatedOrder = await httpService.delete(`order/${orderId}/msg/${msgId}`)
//         return updatedOrder
//     } catch (err) {
//         console.error('Failed to remove message from server:', err)
//         throw err
//     }
// }//!! in database


function getEmptyOrder(
    startDate = null,
    endDate = null,
    guests = { adults: 0, kids: 0, infants: 0, pets: 0 },
    stayId = null,
    totalPrice = null,
    hostId = null,
    msgs = [],
    status = 'pending',
) {
    return {
        hostId,
        buyer: null,
        totalPrice,
        startDate,
        endDate,
        guests,
        stayId,
        msgs,
        status,
    }
}




