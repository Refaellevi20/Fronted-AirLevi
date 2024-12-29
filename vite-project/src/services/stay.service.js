import { httpService } from './http.service'

export const stayService = {
    query,
    getById,
    remove,
    save,
    getEmptyStay,
    getAmenitiesList,
    addStayLike,
    removeStayLike,
    addDemoStay,
    getDefaultFilter
}

window.us=stayService

async function query(filterBy) {
    //can you not put the filterBy in the body?
    var queryStr = (!filterBy) ? '' : `?location=${filterBy.location || ''}&likedByUserId=${filterBy.likedByUserId || ''}`
    return await httpService.get(`stay${queryStr}`)
}

async function getById(stayId) {
    const stay = await httpService.get(`stay/${stayId}`)
    return stay
}

function isOwner(stay,loggedInUser) {
    return loggedInUser?.isOwner || stay.host._id === loggedInUser?._id
}
// async function remove(stayId) {

// try{
//     return await httpService.delete(BASE_URL + stayId)
// } catch {
//             console.log('filed to remove stay:', err)
//             throw err
// }

// }


async function remove(stayId,user) {
    if(!user) throw new Error ('Not authorized')
    try {
        const stay = await getById(stayId)
        if(!user || (user.isAdmin && stay.host._id !== user._id)) {
            throw new Error('Not authorized to delete this stay')
        }
       return await httpService.delete(BASE_URL + stayId)
    } catch {
        console.log('filed to remove stay:', err)
        throw err
        
    }
    // return await httpService.delete(`stay/${stayId}`)
}

async function save(stay) {
    if (stay._id) {
        return await httpService.put(`stay/${stay._id}`, stay)
    } else {
        return await httpService.post(`stay`, stay)
    }
}

async function addStayLike(stayId) {
    return await httpService.post(`stay/${stayId}/like`)
}

function getDefaultFilter() {
    return { labels: '' }
  }

async function removeStayLike(stayId) {
    return await httpService.delete(`stay/${stayId}/like`)
}

async function addDemoStay() {
    const stay = {
        name: 'Karam house',
        type: 'Entire home/apt',
        imgUrls: [],
        price: '82',
        summary: 'my lovely home in kentucky',
        capacity: 8,
        amenities: [
            'Air conditioning',
            'Balcony',
            'Beachfront',
            'Bed linens',
            'Blender',
            'Board Games',
            'Body soap',
            'Building staff',
            'Carbon monoxide detector',
            'City skyline view',
            'Cleaning products',
            'Coffee maker',
            'Cooking basics',
            'Crib',
            'Dining table',
            'Dishes and silverware',
            'Dishwasher',
            'Doorman',
            'Dryer',
            'Elevator',
            'Essentials',
            'Ethernet connection',
            'Extra pillows and blankets',
            'Fire extinguisher',
            'Fire pit',
        ],
        host: {
            _id: '63d62b81c0c8ec5374e792e2',
            fullname: 'Karam Isa',
            imgUrl: 'https://res.cloudinary.com/dcwibf9o5/image/upload/v1674980219/urc6qtltxigniiymlblg.jpg'
        },
        reviews: [
            {
                id: 'nsL4nL',
                txt: "We spent a great week at Patty and Peter's place. The place was exactly as shown in the pictures, very comfortable, nice view, with all amenities. The resort is great with several pools, a long beach, many restaurants, and of course a lot of great activities all around.",
                rate: {
                    cleanliness: 4.9,
                    communication: 4.7,
                    'check-in': 4.8,
                    accuracy: 4.7,
                    location: 4.6,
                    value: 4.8,
                },
                by: {
                    _id: '622f3404e36c59e6164fb4af',
                    fullname: 'Samy',
                    imgUrl:
                        'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/56.jpg',
                },
            },
            {
                id: 'H1g9Cu',
                txt: 'This place was perfect for my family. We had plenty of room to spread out and the service could not have been any better',
                rate: {
                    cleanliness: 4.9,
                    communication: 4.7,
                    'check-in': 4.8,
                    accuracy: 4.7,
                    location: 4.6,
                    value: 4.8,
                },
                by: {
                    _id: '622f3405e36c59e6164fb87b',
                    fullname: 'Breanne',
                    imgUrl:
                        'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/74.jpg',
                },
            },
            {
                id: 'Wa8uuP',
                txt: 'We love Westin Kaanapalli',
                rate: {
                    cleanliness: 4.6,
                    communication: 4.5,
                    'check-in': 4.9,
                    accuracy: 4.9,
                    location: 4.8,
                    value: 4.5,
                },
                by: {
                    _id: '622f3405e36c59e6164fb713',
                    fullname: 'Kimberly',
                    imgUrl:
                        'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/4.jpg',
                },
            },
        ],
        likedByUsers: []
    }
    return await httpService.post(`stay`, stay)
}


function getEmptyStay() {
    return {
        _id: '',
        name: 'Magical Place',
        type: '',
        imgUrls: [
            'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg',
            'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg',
            'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436496/ihozxprafjzuhil9qhh4.jpg',
            'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg',
            'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg',
        ],
        price: 100,
        summary: 'An imaginary place far far away',
        capacity: '',
        amenities: [],
        labels: [''],
        host: {
            _id: '',
            fullname: '',
            imgUrl: '',
        },
        loc: {
            country: 'Canada',
            countryCode: 'CA',
            city: 'Montreal',
            address: 'Montréal, QC, Canada',
            lat: -73.54985,
            lng: 45.52797,
        },
        reviews: [],
        likedByUsers: [],
    }
}

function getAmenitiesList() {
    return [
        'Air conditioning',
        'Balcony',
        'Beachfront',
        'Bed linens',
        'Blender',
        'Board Games',
        'Body soap',
        'Building staff',
        'Carbon monoxide detector',
        'City skyline view',
        'Cleaning products',
        'Coffee maker',
        'Cooking basics',
        'Crib',
        'Dining table',
        'Dishes and silverware',
        'Dishwasher',
        'Doorman',
        'Dryer',
        'Elevator',
        'Essentials',
        'Ethernet connection',
        'Extra pillows and blankets',
        'Fire extinguisher',
        'Fire pit',
        'First aid kit',
        'Free parking on premises',
        'Free street parking',
        'Gym',
        'Hair dryer',
        'Hangers',
        'Heating',
        'High Chair',
        'Host greets you',
        'Hot tub',
        'Hot water',
        'Hot water kettle',
        'Iron',
        'Kitchen',
        'Laptop friendly workspace',
        'Lockbox',
        'Long term stays allowed',
        'Microwave',
        'Mountain view',
        'Oven',
        'Paid parking off premises',
        'Paid parking on premises',
        'Park view',
        'Parking',
        'Patio or balcony',
        'Pets allowed',
        'Pool',
        'Private entrance',
        'Refrigerator',
        'Room-darkening shades',
        'Safe',
        'Security cameras',
        'Self check-in',
        'Shampoo',
        'Single level home',
        'Smoke detector',
        'Smoking allowed',
        'Step-free access',
        'Stove',
        'Suitable for events',
        'Toaster',
        'TV',
        'Valley view',
        'Wardrobe',
        'Washer',
        'Waterfront',
        'Wifi',
    ]
}