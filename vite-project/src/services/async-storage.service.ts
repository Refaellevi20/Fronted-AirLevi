export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    makeId
}

type EntityId = {
    _id: string
}

async function query<T>(entityType: string, delay = 100): Promise<T[]> {
    var entities = JSON.parse(localStorage.getItem(entityType) || 'null') || []
    if (delay) {
        return new Promise((resolve) => setTimeout(resolve, delay, entities))
    }
    return entities
}

async function get<T extends EntityId>(entityType: string, entityId: string): Promise<T> {
    const entities = await query<T>(entityType)
    const entity = entities.find(entity => entity._id === entityId)
    if (!entity) throw new Error(`Cannot get, Item ${entityId} of type: ${entityType} does not exist`)
    return entity;
}

async function post<T>(entityType: string, newEntity: T): Promise<T> {
    newEntity = { ...newEntity, _id: makeId() }
    const entities = await query<T>(entityType)
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
}

async function put<T extends EntityId>(entityType: string, updatedEntity: T): Promise<T> {
    const entities = await query<T>(entityType)
    const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
    entities[idx] = updatedEntity
    _save(entityType, entities)
    return updatedEntity
}

async function remove<T extends EntityId>(entityType: string, entityId: string): Promise<void> {
    const entities = await query<T>(entityType)
    const idx = entities.findIndex(entity => entity._id === entityId)
    if (idx !== -1) entities.splice(idx, 1)
    else throw new Error(`Cannot remove, item ${entityId} of type: ${entityType} does not exist`)
    _save(entityType, entities)
}


function _save<T>(entityType: string, entities: T[]) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}