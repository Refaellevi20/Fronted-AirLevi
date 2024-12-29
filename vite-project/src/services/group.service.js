import { httpService } from './http.service'

export const groupService = {
  query,
  getById,
  create,
  update,
  remove,
  addGroupMsg,
  removeGroupMsg
}

async function query(filterBy = {}) {
  const queryStr = `?hostId=${filterBy.hostId || ''}`
  return await httpService.get(`group${queryStr}`)
}

async function getById(groupId) {
  return await httpService.get(`group/${groupId}`)
}

async function create(group) {
  return await httpService.post('group', group)
}

async function update(group) {
  return await httpService.put(`group/${group._id}`, group)
}

async function remove(groupId) {
  return await httpService.delete(`group/${groupId}`)
}

async function addGroupMsg(groupId, msg) {
  return await httpService.post(`group/${groupId}/msg`, msg)
}

async function removeGroupMsg(groupId, msgId) {
  return await httpService.delete(`group/${groupId}/msg/${msgId}`)
}
