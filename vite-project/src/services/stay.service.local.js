import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'stayDB'

export const stayService = {
  query,
  getAllStays,
  getById,
  save,
  remove,
  getEmptyStay,
  getAmenitiesList,
  getDefaultFilter,
}

_createStays()

async function query(filterBy) {
  let stays = await storageService.query(STORAGE_KEY)

  if (filterBy.category) {
    stays = stays.filter((stay) => {
      return stay.labels.includes(filterBy.category)
    })
  }
  if (filterBy.location) {
    stays = stays.filter((stay) => {
      return stay.loc.country
        .toLowerCase()
        .includes(filterBy.location.toLowerCase())
    })
  }
  return stays
}

// const defaultFilter = getDefaultFilter()
// console.log(defaultFilter)

function getDefaultFilter() {
  return { labels: '' }
}

async function getAllStays() {
  const stays = await storageService.query(STORAGE_KEY)
  return stays
}

async function getById(stayId) {
  const stay = await storageService.get(STORAGE_KEY, stayId)
  return stay
}

async function save(stay) {
  if (stay._id) {
    return storageService.put(STORAGE_KEY, stay)
  } else {
    return storageService.post(STORAGE_KEY, stay)
  }
}

async function remove(stayId) {
  return storageService.remove(STORAGE_KEY, stayId)
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
function getEmptyStay(wishList = []) {
  return {
    _id: '',
    name: 'Magical Place',
    type: 'Entire home/apt',
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
    wishList,
    labels: [''],
    host: {
      _id: '',
      fullname: '',
      sortName: '',
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

//PVT
function _createDemoStays() {
  const DEMO_STAYS = [
    {
      _id: '234454sfdsrf',
      name: "Moshe's house",
      type: 'Entire home/apt',
      host_id: 'u101',
      imgUrls: [
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436496/ihozxprafjzuhil9qhh4.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg',
      ],
      price: '82',
      details: {
        guests: '6',
        bedroom: '2',
        bed: '4',
        bath: '2',
      },
      wishList: [],
      summary:
        'Moshe\'s house, stays under 7 night $38/res - Inquire about availability, I review then offer/approve if available :) - READ "The Space" for cleaning/etc AND brief explanation about timeshare reservations - Want guaranteed view for additional cost? Must be weekly rental, other restrictions - Wheelchair accessible / ADA, call resort directly to ensure U receive. If U need ADA U MUST inform us BEFORE booking.',
      capacity: '5',
      amenities: [
        'TV',
        'Wifi',
        'Air conditioning',
        'Wheelchair accessible',
        'Pool',
        'Kitchen',
        'Free parking on premises',
        'Doorman',
        'Gym',
        'Elevator',
        'Hot tub',
        'Heating',
        'Suitable for events',
        'Washer',
        'Dryer',
        'Smoke detector',
        'Carbon monoxide detector',
        'First aid kit',
        'Safety card',
        'Fire extinguisher',
        'Essentials',
        'Shampoo',
        '24-hour check-in',
        'Hangers',
        'Hair dryer',
        'Iron',
        'Laptop friendly workspace',
        'Self check-in',
        'Building staff',
        'Private entrance',
        'Room-darkening shades',
        'Hot water',
        'Bed linens',
        'Extra pillows and blankets',
        'Ethernet connection',
        'Luggage dropoff allowed',
        'Long term stays allowed',
        'Ground floor access',
        'Wide hallway clearance',
        'Step-free access',
        'Wide doorway',
        'Flat path to front door',
        'Well-lit path to entrance',
        'Disabled parking spot',
        'Step-free access',
        'Wide doorway',
        'Wide clearance to bed',
        'Step-free access',
        'Wide doorway',
        'Step-free access',
        'Wide entryway',
        'Waterfront',
        'Beachfront',
      ],
      labels: ["national-parks", "Chief's kitchens", "Luxe"],
      host: {
        _id: 'u101',
        fullname: 'shukiyHost',
        createAt: 2563564560000,
        sortName: 'shukiy',
        imgUrl: "https://cdn.pixabay.com/photo/2021/07/01/02/01/avatar-6377965_960_720.png",
      },
      loc: {
        country: 'Portugal',
        countryCode: 'US',
        city: 'Porto',
        address: 'Porto, Portugal',
        lat: -156.6917,
        lng: 20.93792,
      },
      reviews: [
        {
          id: 'cex3BQ',
          txt: 'I had a great experience working with Patty and Peter.  Both were very attentive in sorting out the booking details and following up directly when I had questions.  I rented a 2 bedroom unit at the Westin Villas  in Maui and both the unit and property was absolutely amazing.  I think we had the best unit on the resort complete with 2 outdoor patios with direct access  to  the  beach.  I would HIGHLY recommend renting with Patty and Peter.',
          rate: {
            cleanliness: 4.7,
            communication: 4.9,
            'check-in': 4.7,
            accuracy: 4.6,
            location: 4.5,
            value: 4.8,
          },
          by: {
            _id: '622f3407e36c59e6164fc004',
            fullname: 'Kiesha',
            createAt: 1459440000000,
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/68.jpg',
          },
        },
        {
          id: 'lc2vxY',
          txt: 'Peter quickly responded to any questions I had before, and during the trip. Will use again, highly recommend. ',
          rate: {
            cleanliness: 4.6,
            communication: 4.6,
            'check-in': 4.7,
            accuracy: 5,
            location: 5,
            value: 4.7,
          },
          by: {
            _id: '622f3403e36c59e6164fb204',
            fullname: 'Chris',
            createAt: 1731451576472,
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/10.jpg',
          },
        },
        {
          id: '8xUQz6',
          txt: 'We had the perfect location for a room, first floor right in front of the pool. The resort is beautiful, and the staff is so friendly! I enjoyed it so much, we talked about buying a timeshare ourselves.',
          rate: {
            cleanliness: 4.6,
            communication: 4.9,
            'check-in': 4.6,
            accuracy: 4.6,
            location: 4.6,
            value: 4.5,
          },
          by: {
            _id: '622f3405e36c59e6164fb703',
            fullname: 'Kim',
            createAt: 1718491576472,
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/64.jpg',
          },
        },
        {
          id: 'q6sQAq',
          txt: 'Beautiful location. Patty & Peter were super helpful and easy to work with!',
          rate: {
            cleanliness: 4.9,
            communication: 4.8,
            'check-in': 5,
            accuracy: 4.8,
            location: 4.6,
            value: 4.6,
          },
          by: {
            _id: '622f3404e36c59e6164fb37f',
            fullname: 'Tracy',
            createAt: 1708123576472,
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/44.jpg',
          },
        },
        {
          id: 'n51v85',
          txt: 'Great spot for the kids and family and close to beach and everything at the resort. We will definitely be back.',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.6,
            accuracy: 4.8,
            location: 4.6,
            value: 4.7,
          },
          by: {
            _id: '622f3403e36c59e6164fb105',
            fullname: 'Duyen',
            createAt: 1687387576472,
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/32.jpg',
          },
        },
        {
          id: 'Fva8Ez',
          txt: 'The unit and the Westin offer variety of amenities you can possibly ask for. Sofa beds are very comfortable to sleep in. But there is charge for ocean view upgrade. Overall, I highly recommend to book with Patty and Peter. ',
          rate: {
            cleanliness: 4.6,
            communication: 4.6,
            'check-in': 4.5,
            accuracy: 5,
            location: 4.9,
            value: 4.7,
          },
          by: {
            _id: '622f3402e36c59e6164fabbe',
            fullname: 'Billy',
            createAt: 1731624376472,
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/58.jpg',
          },
        },
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
            createAt: 1729809976472,
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
            createAt: 1728600376472,
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
            createAt: 1724971576472,
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/4.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: uuidv4(),
      name: 'Belle chambre à côté Metro Papineau',
      type: 'Private room',
      imgUrls: [
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437045/dmquvficldi8ssfdlrrx.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437033/rhw6gycttaimzocc1poz.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437330/mmhkmfvg8o3freucyekc.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436867/yocip4igdbruuh2grzpf.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436993/yzxnnw83e9qyas022au4.jpg',
      ],
      price: 30,
      details: {
        guests: '8',
        bedroom: '3',
        bed: '6',
        bath: '4',
      },
      summary:
        "Chambre dans un bel appartement moderne avec balcon, ascenseur et terrasse. Private room in a beautiful modern apartment  with balcony, elevator and patio. La chambre est fermée avec une lit double. Vous aurez accès à une salle de bain avec une douche, terrasse. L'appartement est climatisé.  Votre chambre est équipé d'une connexion Wi-Fi illimité. Vous serez proche du centre ville, au pied du pont Jacques Cartier et à distance de marche de toutes les commodités (métro, supermarché, pharmacie",
      capacity: 2,
      amenities: [
        'TV',
        'Wifi',
        'Air conditioning',
        'Kitchen',
        'Elevator',
        'Heating',
        'Washer',
        'Dryer',
        'Smoke detector',
        'Carbon monoxide detector',
        'Essentials',
        'Iron',
      ],
      labels: ['campers', 'trending'],
      host: {
        _id: 'u101',
        fullname: 'shukiyHost',
        sortName: 'shukiy',
        imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/16/01/woman-1846127_960_720.jpg',
      },
      loc: {
        country: 'Canada',
        countryCode: 'CA',
        city: 'Montreal',
        address: 'Montréal, QC, Canada',
        lat: -73.54985,
        lng: 45.52797,
      },
      reviews: [
        {
          id: 'kErRhY',
          txt: 'The place was great, as was the host! I would recommend staying here.',
          rate: {
            cleanliness: 4.9,
            communication: 4.7,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 4.7,
            value: 5,
          },
          by: {
            _id: '622f3407e36c59e6164fc058',
            fullname: 'Rowan',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/58.jpg',
          },
        },
        {
          id: 'Wi1xhe',
          txt: "J'ai adoré rester là. Très acceuillant.",
          rate: {
            cleanliness: 4.9,
            communication: 4.6,
            'check-in': 4.5,
            accuracy: 4.9,
            location: 4.7,
            value: 4.6,
          },
          by: {
            _id: '622f3403e36c59e6164fb274',
            fullname: 'Adriana',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/25.jpg',
          },
        },
        {
          id: 'DkMuO1',
          txt: "Angel est un hôte très sympa et arrangeant ! L'appartement est agréable à vivre et propre. Proche du métro et du centre ville. Nous avons passé un très bon séjour !",
          rate: {
            cleanliness: 4.5,
            communication: 4.7,
            'check-in': 5,
            accuracy: 4.8,
            location: 4.8,
            value: 4.9,
          },
          by: {
            _id: '622f3405e36c59e6164fb87c',
            fullname: 'Emma',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/8.jpg',
          },
        },
        {
          id: 'exheNp',
          txt: "Angel was warm and welcoming and has a beautiful apartment. I'd recommend his place to anyone visiting downtown Montreal!",
          rate: {
            cleanliness: 5,
            communication: 5,
            'check-in': 4.5,
            accuracy: 4.9,
            location: 4.7,
            value: 4.9,
          },
          by: {
            _id: '622f3408e36c59e6164fc082',
            fullname: 'Jeffery',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/25.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: uuidv4(),
      name: 'M&M Space MM2  Apartamento no centro da cidade',
      type: 'Entire home/apt',
      imgUrls: [
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436861/xrxhgsif3ekhxgn8irlm.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437017/gjyzgdjngyrhfrj2loxz.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436556/mb70fifvvpvde8jub5cg.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437241/wt0seud4ot4cmdrztdzz.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437308/p80ndulkcghpcfsnvjdo.jpg',
      ],
      price: 65,
      details: {
        guests: '4',
        bedroom: '3',
        bed: '8',
        bath: '4',
      },
      summary:
        'O apartamento fica perto de arte e cultura e dos mais belos monumentos da cidade. Belos jardins e paisagens da cidade e do rio Douro ficam perto e podem ser apreciadas.  Existem restaurantes típicos e de comida internacional ao redor do apartamento.   O espaço fica numa rua típica da cidade, cheia da sua magia e magnetismo e é muito pratico e confortável. O espaço é excelente para quem pretende visitar e conhecer a zona histórica e turística do Porto. Transportes públicos ficam próximos.',
      capacity: 4,
      amenities: [
        'TV',
        'Wifi',
        'Air conditioning',
        'Kitchen',
        'Paid parking off premises',
        'Free street parking',
        'Washer',
        'Smoke detector',
        'First aid kit',
        'Fire extinguisher',
        'Essentials',
        'Shampoo',
        'Lock on bedroom door',
        '24-hour check-in',
        'Hangers',
        'Hair dryer',
        'Iron',
        'Laptop friendly workspace',
        'Private entrance',
        'Crib',
        'Room-darkening shades',
        'Hot water',
        'Bed linens',
        'Extra pillows and blankets',
        'Microwave',
        'Coffee maker',
        'Refrigerator',
        'Dishwasher',
        'Dishes and silverware',
        'Cooking basics',
        'Oven',
        'Stove',
        'Patio or balcony',
        'Luggage dropoff allowed',
        'Long term stays allowed',
        'Wide doorway',
        'Well-lit path to entrance',
        'Step-free access',
        'Wide doorway',
        'Accessible-height bed',
        'Step-free access',
        'Wide doorway',
        'Accessible-height toilet',
        'Step-free access',
        'Wide entryway',
        'Host greets you',
        'Handheld shower head',
        'Paid parking on premises',
        'Fixed grab bars for shower',
      ],
      labels: ['ski'],
      host: {
        _id: 'u101',
        fullname: 'shukiyHost',
        sortName: 'shukiy',
        imgUrl: 'https://robohash.org/shukiyhost?set=set4',
      },
      loc: {
        country: 'Portugal',
        countryCode: 'PT',
        city: 'Porto',
        address: 'Porto, Porto, Portugal',
        lat: -8.60154,
        lng: 41.14834,
      },
      reviews: [
        {
          id: 'VTlLdy',
          txt: "Mes parents ont passé un excellent séjour à Porto dans l'appartement de Maria qui est bien équipé, confortable et très propre. Il est situé au coeur du centre ville et tout est accessible à pied. Si vous venez en voiture, prévoir de se garer dans le parking souterrain payant juste à côté. Mes parents remercient chaudement Maria et son mari qui ont été adorables, notamment par leur accueil chaleureux.",
          rate: {
            cleanliness: 5,
            communication: 4.3,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3403e36c59e6164fb090',
            fullname: 'Lina & Alexis',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/63.jpg',
          },
        },
        {
          id: 'g5hJvc',
          txt: 'El apartamento es perfecto para una  estancia, esta perfectamente dotado para cubrir las necesidades de un viaje de recreo, situado perfectamente para acceder a pie a las zonas más interesantes de Oporto. María una perfecta anfitriona que te facilitará una inolvidable estancia en Oporto. Ha sido una gran experiencia.',
          rate: {
            cleanliness: 4.6,
            communication: 4.9,
            'check-in': 4.9,
            accuracy: 4.9,
            location: 4.9,
            value: 4.6,
          },
          by: {
            _id: '622f3404e36c59e6164fb4e7',
            fullname: 'Mario R.',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/66.jpg',
          },
        },
        {
          id: 'dS8Pj9',
          txt: "Thierry, Patricia, Anaïs et Manon,\r\nMaria et son mari nous attendaient avec gentillesse et sourires, Maria a toujours répondu à mes mails et SMS en cours de voyage.   Ils nous ont aidé à monter les valises, Il y avait une bouteille d'eau au frais, très appréciable ainsi que des petits gâteaux et une bouteille de vin dans le frigo...L'appartement était très propre rien ne manquait, conforme à la description, bien situé, nous avons tout fait à pieds ...Très à l'écoute de nos demandes Maria et son mari sont charmants, nous nous sommes sentis en famille, nous reviendrons et je recommande fortement ce logement ...Nous avons pu apprécier notre séjour sans tracas.  ",
          rate: {
            cleanliness: 4.6,
            communication: 4.8,
            'check-in': 4.9,
            accuracy: 4.7,
            location: 4.5,
            value: 4.8,
          },
          by: {
            _id: '622f3403e36c59e6164fb110',
            fullname: 'Patricia',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/14.jpg',
          },
        },
        {
          id: 'jP8e6k',
          txt: 'Thanks Maria for your warm welcome. The appartement was really clean. It has everything that we needed for our stay and is really well located. It was easy to park for free near the appartement. Thanks!',
          rate: {
            cleanliness: 4.9,
            communication: 4.6,
            'check-in': 4.7,
            accuracy: 5,
            location: 4.6,
            value: 4.8,
          },
          by: {
            _id: '622f3401e36c59e6164fab5b',
            fullname: 'Ingrid',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/51.jpg',
          },
        },
        {
          id: 'XUifWc',
          txt: 'L appartement de Maria est tres bien situe, propre et surtout tres calme. Il ne manque rien . Maria nous a tres bien recus . Je recommande cet appartement.',
          rate: {
            cleanliness: 4.6,
            communication: 4.9,
            'check-in': 4.5,
            accuracy: 4.8,
            location: 4.5,
            value: 4.8,
          },
          by: {
            _id: '622f3403e36c59e6164fb27c',
            fullname: 'Marie Odile',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/60.jpg',
          },
        },
        {
          id: 'Hvgfv6',
          txt: 'Maria is a great host and we loved this apartment! It was bright, clean, airy and well-equipped and Maria gave us a thorough introduction to how everything worked. The bed was comfortable (it is not made for tall people though) and nights were quiet as both living room and bedroom are facing the backyard, not the street. Only in the morning we could not sleep in as there was loud construction noise during the day. The metro station is only a few minutes walk away and the city center is at walking distance. We also got a sweet welcome with Portuguese wine.',
          rate: {
            cleanliness: 4.7,
            communication: 4.7,
            'check-in': 4.7,
            accuracy: 4.7,
            location: 4.7,
            value: 4.6,
          },
          by: {
            _id: '622f3407e36c59e6164fbd3c',
            fullname: 'Anne',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/56.jpg',
          },
        },
        {
          id: 'GogYPn',
          txt: "Appartement très bien situé, tout le vieux porto se fait à pied. Très propre, indépendant et fonctionnel. Metro au pied en venant de l'aéroport, ligne directe 15 minutes environ.\nRestaurants et épiceries typiques au pied de l'immeuble. Climatisation et télé dans toutes les pièces, calme et quartier pittoresque. À recommander pour 3 ou 4. Accueil simple, gentil et efficace comme Maria la propriétaire.\n",
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.5,
            accuracy: 4.7,
            location: 4.6,
            value: 4.8,
          },
          by: {
            _id: '622f3407e36c59e6164fbd39',
            fullname: 'Armelle',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/75.jpg',
          },
        },
        {
          id: 's12WBy',
          txt: 'apartamento bien situado, agradable, bonito, muy limpio y con una anfitriona maravillosa dispuesta a resolver cualquier inconveniente que se pueda presentar. lo recomiendo sin lugar a dudas.\ngracias Mariapor su gentileza',
          rate: {
            cleanliness: 4.9,
            communication: 4.9,
            'check-in': 4.6,
            accuracy: 4.9,
            location: 5,
            value: 4.9,
          },
          by: {
            _id: '622f3406e36c59e6164fbc52',
            fullname: 'Domingo',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/1.jpg',
          },
        },
        {
          id: 'hKefrl',
          txt: 'Appartement très propre et très bien situé, bien agencé. Quartier très vivant mais appartement calme car ne donne pas sur la rue. Nous avons passé un très bon séjour chez Maria qui nous a très bien accueilli.',
          rate: {
            cleanliness: 4.8,
            communication: 4.7,
            'check-in': 4.8,
            accuracy: 4.3,
            location: 5,
            value: 4.5,
          },
          by: {
            _id: '622f3406e36c59e6164fbb3f',
            fullname: 'Estelle',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/16.jpg',
          },
        },
        {
          id: 'UN1A42',
          txt: 'Apartamento agradable, muy limpio y muy bien equipado, en zona tranquila pero accesible para llegar a todos lados de a pie. Maria y Arturo nos recibieron con un rico vino del Douro y galletitas y muy buenas recomendaciones para pasear y comer.',
          rate: {
            cleanliness: 4.8,
            communication: 4.7,
            'check-in': 4.8,
            accuracy: 4.7,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3403e36c59e6164fb06f',
            fullname: 'Alfredo Julio Leandro',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/64.jpg',
          },
        },
        {
          id: 'H4tDyi',
          txt: 'Нам очень понравилась квартира,светлая,уютная,на 3-м этаже,с большим балконом,в квартире есть все самое необходимое,стиральная машина,утюг,кровати очень удобные,красивое постельное белье,вся обстановка в квартире сделана с душой,все время прибывания чувствовали себя как дома.\nМария по приезду подарила нам бутылку вина из долины реки Дору,из красивых бокалов мы его с удовольствием выпили,спасибо за презент.\nВ этой маленькой уютной квартире -3 телевизора!!!!Смотреть было некогда,наслаждались красивым городом и окрестностями Порту.',
          rate: {
            cleanliness: 4.8,
            communication: 4.7,
            'check-in': 4.8,
            accuracy: 4.7,
            location: 5,
            value: 4.9,
          },
          by: {
            _id: '622f3405e36c59e6164fb78f',
            fullname: 'Nataliia',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/17.jpg',
          },
        },
        {
          id: 'TdRPEi',
          txt: 'Muy contentos con todo. El piso estaba bastante cerca del centro, Maria y su marido estaban incluso antes de la hora de nuestra llegada. El piso esta muy bien equipado: cafetera, botiquín, lavadora etc. Super super limpio todo y las camas muy comodas y acogedores. Y al ser un piso interior, no se oia nada de ruido. Recomendable!',
          rate: {
            cleanliness: 4.5,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.7,
            location: 5,
            value: 4.9,
          },
          by: {
            _id: '622f3402e36c59e6164fad62',
            fullname: 'Liz',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/72.jpg',
          },
        },
        {
          id: 'WLQtM8',
          txt: 'Eu e minha amiga ficamos um mês no apartamento e foi uma otima experiencia!\nMuito bem localizado, perto de tudo! Não tivemos nenhuma dificuldade em encontrar o local, que fica a minutos da estação do metrô e é muito perto da região central.\nÓtima infraestrutura, limpeza e organização.\nFomos muito bem recebidas e bem auxiliadas pela Maria, que com certeza é uma ótima anfitriã!\nRecomendo muito a estadia, não poderia ter sido melhor!',
          rate: {
            cleanliness: 4.6,
            communication: 4.7,
            'check-in': 4.6,
            accuracy: 4.9,
            location: 4.8,
            value: 4.6,
          },

          by: {
            _id: '622f3403e36c59e6164fb1c3',
            fullname: 'Ariadne',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/68.jpg',
          },
        },
        {
          id: 'ZqPX2P',
          txt: 'Respostas sempre rápidas; excelente recepção ; sempre simpática e disponível.',
          rate: {
            cleanliness: 4.8,
            communication: 4.7,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.9,
          },
          by: {
            _id: '622f3404e36c59e6164fb5f5',
            fullname: 'Bruno',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/40.jpg',
          },
        },
        {
          id: '8bqnwt',
          txt: 'Clean, quiet and centrally located. Very welcoming host as well.',
          rate: {
            cleanliness: 4.8,
            communication: 4.7,
            'check-in': 4.8,
            accuracy: 5,
            location: 5,
            value: 4.9,
          },
          by: {
            _id: '622f3402e36c59e6164fad10',
            fullname: 'João',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/71.jpg',
          },
        },
        {
          id: 'WY0tVc',
          txt: 'O Espaço de Maria é de extremo bom gosto. Tudo extremamente limpo, pratico e organizado nos mínimos detalhes.  Boa localização perto de tudo.  Sem falar na Simpatia e disponibilidade da Maria que com suas dicas tornou nossa estadia em Porto melhor do que esperávamos. Recomendadíssimo !',
          rate: {
            cleanliness: 5,
            communication: 4.7,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.9,
          },
          by: {
            _id: '622f3408e36c59e6164fc075',
            fullname: 'Alcides',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/8.jpg',
          },
        },
        {
          id: 'FrT5c2',
          txt: 'Alojamiento coqueto y acogedor, muy limpio y bien ubicado, tiene 2 habitaciones y todo lo necesario para poder pasar unos días en Oporto, buena ubicación cerca de Sta Catarina. Nos ha gustado mucho la estancia, la atención de María inmejorable. Muchas gracias por su atención y amabilidad',
          rate: {
            cleanliness: 4.8,
            communication: 4.7,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.9,
          },
          by: {
            _id: '622f3406e36c59e6164fbad8',
            fullname: 'Miguel Angel',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/65.jpg',
          },
        },
        {
          id: 'dRBZ0U',
          txt: 'buena ubicación, piso acogedor, reformado, excelente servicio y recomendaciones',
          rate: {
            cleanliness: 4.8,
            communication: 5,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3407e36c59e6164fbede',
            fullname: 'Alessandro',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/32.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: uuidv4(),
      name: 'Fresh and modern 1BR in Bed-Stuy',
      type: 'Entire home/apt',
      imgUrls: [
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436912/xle8ueqxjeazbs4bp09p.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436460/qi3vkpts37b4k0dedosc.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436481/tqwkxtbalipudzhivoag.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437250/o8uutj3t2bvfafvxkr9j.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436855/khyvb5q3yzcqaoscuppz.jpg',
      ],
      price: 79,
      details: {
        guests: '5',
        bedroom: '2',
        bed: '3',
        bath: '2',
      },
      summary:
        'A spacious, art-filled one-bedroom apartment near the express train (28 minutes to Times Square) and a Citibike station. Sample Bed-Stuy life at a nearby French restaurant,  a sunny Haitian cafe, a boutique grocery and more. We do NOT discriminate based on race, religion or sexual orientation.',
      capacity: 2,
      amenities: [
        'Wifi',
        'Air conditioning',
        'Kitchen',
        'Heating',
        'Smoke detector',
        'Carbon monoxide detector',
        'Fire extinguisher',
        'Essentials',
        'Shampoo',
        '24-hour check-in',
        'Hangers',
        'Hair dryer',
        'Iron',
        'Laptop friendly workspace',
        'Self check-in',
        'Lockbox',
      ],
      labels: ['bed-and-breakfast'],
      host: {
        _id: '622f3402e36c59e6164fac46',
        fullname: 'Shaila & Alex',
        sortName: 'Alex',
        imgUrl:
          'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/47.jpg',
      },
      loc: {
        country: 'United States',
        countryCode: 'US',
        city: 'New York',
        address: 'Brooklyn, NY, United States',
        lat: -73.92922,
        lng: 40.68683,
      },
      likedByUsers: ['u101'],
      reviews: [
        {
          id: 'YKAmPW',
          txt: "Shaila's place is amazing! It's new, it's clean and it's big! And Shaila is very accommodating, we found everything we needed (cooking, coffee) and more. Given that we were the first guests she hosted through airbnb I can say that she did an amazing job! \r\n",
          rate: {
            cleanliness: 4.8,
            communication: 4.7,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3407e36c59e6164fbfd2',
            fullname: 'Nicolas',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/40.jpg',
          },
        },
        {
          id: 'QX2Oqg',
          txt: 'Great, quiet place to stay. It is great having Shaila just upstairs to answer any questions, and especially to give great tips on places to go. ',
          rate: {
            cleanliness: 4.8,
            communication: 4.7,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3403e36c59e6164fb048',
            fullname: 'Jeff',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/53.jpg',
          },
        },
        {
          id: '8LcIKD',
          txt: "Shaila and Alex are wonderful hosts really, they helped us every time we needed with directions, the internet, the supermarket, the post office !!! (thank you guys !!!).The place and the neighbord are great, 8 blocks far from the apartment you have the subway and 30 min. later you are in the island, we moved early in the morning, late at night (sometimes we came back at 2am) and everything turned out great.Definetly I would come back to their apartment, It's bigger than ours in Argentina !!! I look forward to stay there again and, next time, go out with you guys and have a beer or anything.\r\nBye !!! - Guido and Carla - ",
          rate: {
            cleanliness: 4.8,
            communication: 4.7,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3406e36c59e6164fba55',
            fullname: 'Carla',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/25.jpg',
          },
        },
        {
          id: 'V3fm98',
          txt: "Shaila and Alex were incredibly accommodating and me and my girlfriend enjoyed our stay thoroughly. Highly recommended. The place was very private and homely. I didn't really know anything about New York and was nervous about staying in bed stuy but it was safe and friendly everywhere I went. Very easy to get to the airport and manhattan by train.",
          rate: {
            cleanliness: 4.8,
            communication: 4.7,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3407e36c59e6164fbf76',
            fullname: 'Dan',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/14.jpg',
          },
        },
        {
          id: 'KqjDwb',
          txt: 'Great place to stay in Brooklyn! Alex gave us a really useful list of nice restaurants and coffee places near the place (We are very happy to have discovered, the restaurant "Saraghina", thanks to Alex\'s map!).  The apartment is vast, furnished with taste and very convenient. We highly recommend!',
          rate: {
            cleanliness: 4.8,
            communication: 4.7,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.5,
          },
          by: {
            _id: '622f3407e36c59e6164fbe9d',
            fullname: 'Ariane',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/52.jpg',
          },
        },
        {
          id: 'SyYocw',
          txt: 'I can recommend to everyone to come to this beautiful apartment, Shaila and Alex are great hosts and the neighbourhood is very friendly everywhere we go.\r\nIt really felt like home.',
          rate: {
            cleanliness: 4.8,
            communication: 4.7,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.5,
          },
          by: {
            _id: '622f3402e36c59e6164fad91',
            fullname: 'Ilka',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/67.jpg',
          },
        },
        {
          id: 'npuBgv',
          txt: "My sister and I loved staying here! The apartment is very spacious and recently renovated so it looks amazing. The kitchen has everything you need with Alex and Shalia stocking it with a few basics. The neighbourhood is a little shabby, especially compared to the home we stayed in. We were told by some people in Manhattan that the neighbour of Bed-Stuy used to be very dangerous and just to be careful walking around at night. Walking from the subway after dark was a little daunting but we remained safe. We did catch a cab a few times from Manhattan as it was very late. Overall, it was a positive experience with Alex and Shalia being very helpful, even going out of their way to let us store our luggage at Shalia's work the day we were to fly out. They were great hosts.",
          rate: {
            cleanliness: 4.8,
            communication: 4.7,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.5,
          },
          by: {
            _id: '622f3401e36c59e6164fab81',
            fullname: 'Kristy',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/57.jpg',
          },
        },
        {
          id: 'Lkh4YH',
          txt: 'We just met Alex when we checked in, but anyhow he had been a very friendly and helpful host. He was reachable anytime and answered my mails prompt.\r\nThe apartment was great! It was really beautiful and big. It has a perfectly equipped kitchen and there are also a few basics for breakfast and cooking. The bed is very comfortable. It is not that soundproofed as we are accustomed to (the steps from upstairs waked me every day - my son slept well, he did not hear it), but I think that is normal for american houses. But apart from this it is very quiet.\r\nThe neighbourhood is great! It is very authentic, people are friendly and helpful if required, no problems even late at night. We loved staying there!\r\nIn any case: apartment, host and neighbourhood are high recommended! If we are in New York again, we certainly return to this place!',
          rate: {
            cleanliness: 4.8,
            communication: 4.7,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.5,
          },
          by: {
            _id: '622f3405e36c59e6164fb785',
            fullname: 'Barbara',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/13.jpg',
          },
        },
        {
          id: 'YcvW7Q',
          txt: 'Hello! \n\nWe just spent 5 days in the big apple and we drove in to this Brooklyn location.  The host where incredibly attentive and just wonderful, the apartment spotless, hip & modern and really comfortable. \n\nDo not be intimidated by the transitioning neighborhood as we encountered that many residents are very friendly and helpful (directions) and this particular street has a real interest in making a real change hence empowering their community.\n\nThe subway is a little ways (12 to 15 min.) walk. We would use our vehicle to drive to the subway station (there are two corresponding)  and park nearby to facilitate the to and from.  If you need quick access to the subway at all hours of the day and night this may not be the place for you.\n\nThe apt. is an excellent value  for the money (as per  many  manhattan locations offer around  the same nightly  $$ rate but have to share their apt ).\n\n\n\n',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.5,
          },
          by: {
            _id: '622f3404e36c59e6164fb515',
            fullname: 'Gloria',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/36.jpg',
          },
        },
        {
          id: 'abCTQy',
          txt: 'We really had a wonderful time in NYC thanks to Alex’s house. It’s just as big, beautiful and clean as it seems in the pictures. Alex has an incredible apartment in the basement that makes you feel like home after being out all day knowing the big city. All the furniture and the kitchen appliances are new.\r\n\r\nThe location is perfect for visiting Brooklyn and Manhattan (only 15-20 to Brooklyn Bridge and South Manhattan or 25-30 min to Times Square in the underground).\r\n\r\nAlso, Alex gave us some good advices the first day for having all we needed in the neighbourhood. Don’t miss Saraghina’s brunch (10 minutes walking from the house)! He even let us to keep our luggage in the house until we left to the airport in the evening on our last day in the city.',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3403e36c59e6164fb079',
            fullname: 'Javier',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/16.jpg',
          },
        },
        {
          id: 'Zk6iV5',
          txt: 'The appartment was really clean, pretty spacious and kitchen was very well equipped! Its totally in line with all the information posted. \r\n\r\nAlex was very nice host, even allowed us to keep the luggage  after check out as we had a flight in the evening. Thank you once again for that! \r\n\r\nThe neighboorhood itself was safe, we had no issues at all, however I`d prefer staying   in Brooklyn districts closer to Manhattan area next time as  we were travelling to Midtown up to 1h. Being a citizen of the huge city too (Moscow, Russia) , underground is not our favorite place to be  :) \r\n\r\nOverall , it was a great stay. \r\n\r\n\r\n\r\n',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3402e36c59e6164fabc4',
            fullname: 'Ivan',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/3.jpg',
          },
        },
        {
          id: '7ahPxO',
          txt: "Communication with Alex was spot on.  He happily answered any questions and made it easy for me to arrive late at night and went above and beyond to help me have a good stay. \r\nThe apartment has been tastefully refurbished.  Extremely clean, and with all you could need for cooking.  The bed is so comfy.  The apartment is peaceful at night and I slept so well.   Some noise travels from Alex' apartment upstairs but it is only a little during the day.\r\nThe area is a bit out of the main hub of Williamsburg and Bushwick but everything is easily accessible with a short walk or the subway about 8 mins walk away.\r\nAlex left me a list of great stores, cafes and restaurants in the immediate area.  \r\nSome people may be concerned about the area at face value as it is a white minority but I felt safe at all times.  People seemed friendly.\r\n\r\n",
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3402e36c59e6164fada2',
            fullname: 'India',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/44.jpg',
          },
        },
        {
          id: 'KCJ91e',
          txt: 'Was an amazing stay, we charm your apartment and were very friendly. Thank you for all your attentions.',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 5,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3406e36c59e6164fb9f9',
            fullname: 'Pamela',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/41.jpg',
          },
        },
        {
          id: 'Ba8aMT',
          txt: "Shaila and Alex are wonderful hosts - very accommodating, friendly, and easy to communicate with. We found it fairly easy to get around the city from Bed-Stuy, even with the weekend subway schedule. The apartment is lovely, bright, and very clean, and overall it was a pleasure to stay for a few nights. It's been recently renovated and thoughtfully decorated - we felt quite comfortable during our stay and appreciated the art and other nice touches throughout. I'd highly recommend staying with Shaila and Alex.",
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 5,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3402e36c59e6164fae8c',
            fullname: 'Lindsay',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/70.jpg',
          },
        },
        {
          id: 'FHgWBr',
          txt: 'Great apartment, really spacious & has a lovely homely feel to it. Alex & Shaila were very helpful & welcoming, bed was really comfortable, good transport links, only a 20 min subway ride into manhattan, the area is really nice & quiet, unlike manhattan.\r\n\r\nThanks Alex & Shaila for having us ! Enjoy the Gin !! ',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 5,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3407e36c59e6164fbf31',
            fullname: 'Nadia',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/40.jpg',
          },
        },
        {
          id: '9uR2Qo',
          txt: 'The apartment is spacious and well furnished, the kitchen very well equipped and the bed very confortable. Sheila and alex were friendly and the comunication with them was easy.the neighborhood is very nice with typical town house, and very quite. Also the people Who lives there was very kind and helped us on many occasion. \nDefinitely raccommend you to spend your holidays in NY in the lovely apartment of sheila&alex! ',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 5,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3407e36c59e6164fbdab',
            fullname: 'Barbara',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/73.jpg',
          },
        },
        {
          id: 'k1JPbM',
          txt: 'We had a great time staying with Alex & Shaila. The apartment is just as depicted in the photos. Lots of space and very comfortable.  The house is located really close to buses and subway which was very convenient. The neighbourhood is fine with a couple of nice places to eat nearby.\r\n\r\nShaila and alex were really friendly and easy to communicate with if needed.  \r\n\r\nWe stayed for 2 months and would recommend it to others who are looking for a place in Brooklyn.',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 5,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3404e36c59e6164fb2c1',
            fullname: 'Chris',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/8.jpg',
          },
        },
        {
          id: 'rKRohb',
          txt: 'Upon arriving, Alex was very helpful giving directions to the location. , he gave us a brief overview of everything, and let us settle in. It was a very cozy place to come back to after long days out exploring New York. The subways are very close. We preferred heading up to broadway to catch our trains (Depending where we were going) only because it was much more pleasant on sunny days to be above grounds if we could. It was great to have all amenities available, and at such a reasonable price.The only thing I will mention is that if you do plan on sleeping in- it might not happen as they do have a newborn who you can sometimes hear in the morning if you are a light sleeper.\r\nOverall,  I would recommend you stay at Alex & Shailas airbnb! It was a great and pleasant environment.',
          rate: {
            cleanliness: 4.8,
            communication: 4.5,
            'check-in': 4.8,
            accuracy: 5,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3405e36c59e6164fb8fc',
            fullname: 'Melody',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/51.jpg',
          },
        },
        {
          id: 'G3SxMN',
          txt: 'We felt very happy those days at the home of Alex and Shaila. It is a very warm and comfortable place, it was like being at home.',
          rate: {
            cleanliness: 4.8,
            communication: 4.5,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3404e36c59e6164fb41e',
            fullname: 'Carlos',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/38.jpg',
          },
        },
        {
          id: 'USNlTi',
          txt: 'Great host. Very clean, nice place and friendly people. Thanks again!',
          rate: {
            cleanliness: 4.8,
            communication: 4.5,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3403e36c59e6164fb087',
            fullname: 'Sergei',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/18.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: '622f337a75c7d36e498aaafc',
      name: 'Habitación centro de Barcelona',
      type: 'Private room',
      imgUrls: [
        'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670407572/stayby/stays-pics/4ddde677-af85-4038-a2a1-93294bffd8f5_vkddr8.webp',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436394/kscsvxyn0uro9tjhefeb.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436281/doubvhbpwjfx81yfzpxq.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436376/phpltehcr6uq9lh5jlax.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436571/fvqbazrysqpymjlhhdqu.jpg',
      ],
      price: 40,
      details: {
        guests: '5',
        bedroom: '2',
        bed: '3',
        bath: '2',
      },
      summary:
        'Mi piso está en el centro de Barcelona. Cerca del metro, las ramblas, los museos, el Portal del Ángel, Plaza Cataluña. Mi alojamiento es bueno para turistas, aventureros, y viajeros de negocios....y tiene ascensor.',
      capacity: 2,
      amenities: [
        'Wifi',
        'Kitchen',
        'Doorman',
        'Elevator',
        'Heating',
        'Essentials',
        'Hangers',
        'Hair dryer',
      ],
      labels: ['surfing', 'trending'],
      host: {
        _id: '622f3407e36c59e6164fbdae',
        fullname: 'Marián',
        sortName: 'Marián',
        imgUrl:
          'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/40.jpg',
      },
      loc: {
        country: 'Spain',
        countryCode: 'ES',
        city: 'Barcelona',
        address: 'Barcelona, Catalunya, Spain',
        lat: 2.16685,
        lng: 41.38371,
      },
      reviews: [
        {
          id: 'bRirt8',
          txt: "Host: Marian gave us a warm welcome and treated us kindly from the very beginning. She offered us help, told us what to visit and even put water, milk and orange juice in the fridge! We could have breakfast at her place which was perfect because she has a little sweet balcony! \r\nLocation: calmly situated in a side street, very near to the Placa Catalunya, the Rambla and the gothic area of Barcelona (very beautiful:)) so you have the old cultural center as well as all the restaurants and bars just nearby.\r\nHouse/Room: the appartment is not a huge, but I think you have everything you need (beautiful sitting room, balcony, kitchen) in it. You have to share the appartment with Marian so pay attention and don't be too loud in the evening!!\r\ndisadvantage: the heat is terrible in summer and there is no air-condition..\r\n\r\nI would overall recommend it to everybody!! But if you want to party and stay up late, take a hostel or another appartment.",
          rate: {
            cleanliness: 4.8,
            communication: 4.5,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.7,
          },
          by: {
            _id: '622f3407e36c59e6164fbebb',
            fullname: 'Rafaela',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/48.jpg',
          },
        },
        {
          id: 'oOEk7y',
          txt: "Nous avons passé un bon séjour, l'appartement est très bien situé. La chambre est agréable et plus grande que sur la photo. Seul point négatif pas de volets dans la chambre. ",
          rate: {
            cleanliness: 4.8,
            communication: 4.5,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.7,
          },
          by: {
            _id: '622f3403e36c59e6164faf56',
            fullname: 'Pauline',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/62.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: '622f337a75c7d36e498aaafd',
      name: 'DOUBLE ROOM IN THE HEART OF BCN',
      type: 'Private room',
      imgUrls: [
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436793/httqod38otalkzp9kynq.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436236/ctnbnqazpqhotjcauqwp.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436937/mkbcjfockxezgrvimska.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436553/hbkx9lwxjd0wabqk0bmo.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436852/y3scgbn8d6evumdpwdp4.jpg',
      ],
      price: 25,
      details: {
        guests: '7',
        bedroom: '4',
        bed: '12',
        bath: '2',
      },
      summary:
        'Lit room with balcony. The apartment is in the center, just meters from the Palau de la Musica Catalana. Well connected, a few minutes from Las Ramblas and the Born. Very close to the beach and Ciutadella Park',
      capacity: 2,
      amenities: [
        'Wifi',
        'Kitchen',
        'Paid parking off premises',
        'Smoking allowed',
        'Heating',
        'Washer',
        'Essentials',
        'Shampoo',
        'Lock on bedroom door',
        'Hangers',
        'Hair dryer',
        'Iron',
        'Hot water',
        'Bed linens',
        'Host greets you',
      ],
      labels: ['amazing-views', 'luxe', 'trending'],
      host: {
        _id: '622f3404e36c59e6164fb63a',
        fullname: 'Isabel',
        sortName: 'Isabel',
        imgUrl:
          'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/9.jpg',
      },
      loc: {
        country: 'Spain',
        countryCode: 'ES',
        city: 'Barcelona',
        address: 'Barcelona, Catalonia, Spain',
        lat: 2.17561,
        lng: 41.38701,
      },
      reviews: [
        {
          id: 'vjsDjE',
          txt: 'Una instancia muy céntrica en uno de estos edificios antiguos del Barri Gotic. No es poco haber conseguido estar en el centro de Barcelona en la misma semana del Mobile World Congress. Isabel es un encanto de anfitrión.',
          rate: {
            cleanliness: 4.8,
            communication: 4.5,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.7,
          },
          by: {
            _id: '622f3405e36c59e6164fb95e',
            fullname: 'Pierre',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/31.jpg',
          },
        },
        {
          id: 'UF7Oqz',
          txt: 'The host canceled this reservation 2 days before arrival. This is an automated posting.',
          rate: {
            cleanliness: 4.8,
            communication: 5,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.7,
          },
          by: {
            _id: '622f3403e36c59e6164fafa6',
            fullname: 'Isabelle',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/34.jpg',
          },
        },
        {
          id: 'mR3Pe1',
          txt: "Chambre très bien située et hôtesse très sympathique. Merci encore Isabel pour l'accueil !",
          rate: {
            cleanliness: 4.8,
            communication: 5,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3406e36c59e6164fbaf2',
            fullname: 'Hélène',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/32.jpg',
          },
        },
        {
          id: 'H8IOp1',
          txt: "Sheets weren't clean... Shower has very low water pressure. Room is only good for sleeping. It's in a good location but that's about it. Isabel could've provided more information about what's around the house during check in... Overall just decent enough to sleep",
          rate: {
            cleanliness: 4.8,
            communication: 5,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3407e36c59e6164fbdc3',
            fullname: 'Daniel',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/28.jpg',
          },
        },
        {
          id: 'FC7grN',
          txt: "Isabel est accueillante. L'appartement est charmant, correspond aux images. Très bien situé, à côté de Palau de la musica, dans un vieil immeuble plein de charme un peu désuet. Amateurs de confort et décor \"tendance\" s'abstenir. Chez Isabel on se trouve dans une authentique ambiance d'artiste. Merci beaucoup, je garderai le souvenir de cet accueil lié aux souvenirs de Barcelone.",
          rate: {
            cleanliness: 4.8,
            communication: 5,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3401e36c59e6164fabad',
            fullname: 'Maria Isabel',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/19.jpg',
          },
        },
        {
          id: '5SQyAG',
          txt: 'Es un piso con mucho encanto, muy tranquilo y en un lugar inmejorable. La anfitriona, Isabel, es amable y facilitadora. El piso es una construcción antigua, lo que le da un ambiente genial pero también hace que el agua de la ducha salga con poquísima presión y sea un poco incómodo a veces. A parte de esto, si tuviese que poner alguna queja sería la hora del chekout, ya que las diez de la mañana me parece un poco pronto. \r\nEn conjunto tuvimos una muy buena experiencia y repetiríamos sin duda.',
          rate: {
            cleanliness: 4.8,
            communication: 5,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3405e36c59e6164fb967',
            fullname: 'Aitana',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/41.jpg',
          },
        },
        {
          id: 'UlJvDQ',
          txt: "Isabel was a wonderful host even if she was not there. She was in touch with me by mobile constantly. Thank you so much!\r\nThe house it's nice and was very clean and quite in the night.Perfect location. All you need for few days in Barcelona!",
          rate: {
            cleanliness: 4.8,
            communication: 5,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3406e36c59e6164fbb88',
            fullname: 'Valentina',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/24.jpg',
          },
        },
        {
          id: 'HkjCHG',
          txt: "Isabel's place was perfect. It was cozy, clean and quiet. She was a very gracious host and was always there to answer my questions about getting around Barcelona. ",
          rate: {
            cleanliness: 4.8,
            communication: 5,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3405e36c59e6164fb715',
            fullname: 'Jeremy',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/5.jpg',
          },
        },
        {
          id: 'q8fTMg',
          txt: 'Great room with lots of sunlight in a charming apartment. Fantastic location.',
          rate: {
            cleanliness: 4.8,
            communication: 5,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3403e36c59e6164fb0b2',
            fullname: 'Mei-Lin',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/7.jpg',
          },
        },
        {
          id: 'TH9t7m',
          txt: 'Isa was a kind and gracious host with a lovely appartment in a centric and vibrant area. We loved our stay and surely will visit again.',
          rate: {
            cleanliness: 4.8,
            communication: 5,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3403e36c59e6164fb1f7',
            fullname: 'Taneli',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/40.jpg',
          },
        },
        {
          id: 'oGPJRf',
          txt: 'SUPER cute place with lots of charm!! Perfect for my first trip to Barcelona:) Amazing location! Gracias Isabel for helping me find last minute accommodations! \r\n',
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.5,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3404e36c59e6164fb623',
            fullname: 'Natasha',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/49.jpg',
          },
        },
        {
          id: 'uTB7bS',
          txt: "Isabel was a great host. She met me at the local bar where she worked and took me to her home a street away. The flight of stairs up to here place was a bit daunting but I can see why she lives up there.. It was beautiful! The room and whole place was clean, tidy and very welcoming. I saw Isabel twice, when I arrived and when I left, but it was perfect. \n\nThe facilities were great. The pressure in the shower was weak but it didn't bother me one bit. It is a bit noisy being in the heart of the city, but I can imagine it would be anywhere in this area. It was lovely to have a balcony, and the location was very convenient. Thanks.x",
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.5,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3407e36c59e6164fc013',
            fullname: 'Elizabeth',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/51.jpg',
          },
        },
        {
          id: 'Ar8bup',
          txt: 'Isabel was good host. Location is perfect.',
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.5,
            location: 5,
            value: 4.5,
          },
          by: {
            _id: '622f3403e36c59e6164fb0af',
            fullname: 'Monika',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/32.jpg',
          },
        },
        {
          id: 'bQRXdN',
          txt: 'Super piso, super barrio! \r\nThe guest welcomed us well.',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.5,
            location: 5,
            value: 4.5,
          },
          by: {
            _id: '622f3403e36c59e6164fb23a',
            fullname: 'Margaux',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/46.jpg',
          },
        },
        {
          id: 'MVLcd1',
          txt: 'It was really nice to stay at Isabels place. She is very uncomplicated and nice and the flat is super located for exploring bcn. For me it was perfect!:)',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.5,
            location: 5,
            value: 4.5,
          },
          by: {
            _id: '622f3403e36c59e6164fb21c',
            fullname: 'Elisabeth',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/11.jpg',
          },
        },
        {
          id: '1UzgDf',
          txt: "IT was the perfect stay to Discover the city-a super location with sometimes noisy tourists (even we we're tourists but hopefully not so noisy) but that's part of the location i guess :-). We loved the colourful house and we Will Be go back for a next stay. thank you!",
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.5,
            location: 5,
            value: 4.5,
          },
          by: {
            _id: '622f3407e36c59e6164fbd7f',
            fullname: 'Ingrid',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/26.jpg',
          },
        },
        {
          id: 'IkNU1c',
          txt: "Isa is a very lovely, sensitive, artistic and gorgeous person. She is respectful of one's privacy but always ready to give support when asked upon. Be it in spoken or written form I always got my answers from her within no times. She also proofed to be very flexible in terms of arrival and departure times which I appreciated a great deal. If you are a fan of jazz music (like I am), make sure to double check ahead of time about her current concert dates so as not to miss your hostess on stage like I did (grumble ;-)).\n\nThe room I occupied was the smaller one of two that Isabel rents out. So if her flat is fully rented out there can be a maximum of 4 guests plus your hostess in the flat, which can cause some bathroom jam, especially during the hot and humid summer times, when the need for a cool shower is inherent to everyone's desire. \nMy room was as depicted. If you plan on using it for double occupancy, I recommend taking Isa's larger room (unless the two of you are very much in love and want to cuddle up close ;-)). Also, if you need a table for writing, ask for the larger room as well, which comes along with one.\nThe flat itself is absolutely enchanting and furnished with love and an artistic eye to details. It's location is a dream for touristic explorations with anything within walking distance. \nTherefore, I can easily recommend both Isabel and her flat to anyone wishing to immerge himself into the local customs and get a good doze of what it is like \"to live like a true Barcelonian\".  \n\nQuerida Isa, muchas gracias por tu hospedalid génial! Volveré a ciencia cierta!\nSaludos y besos\nLiliana",
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.5,
            location: 5,
            value: 4.4,
          },
          by: {
            _id: '622f3403e36c59e6164fb1ac',
            fullname: 'Liliane',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/24.jpg',
          },
        },
        {
          id: 'bfY6Hx',
          txt: "The apartment is very centrally located, in the heart of the gothic part of the city and a couple of blocks from the Placa de Catalunya which makes transportation and sightseeing very easy. It's a 20 minute walk from the beach which is a plus. It's located in a very old building on the top floor, so it is rather stuffy and warm in the apartment. The room overlooks a very narrow street/alley so it's rather dark and it's easy to hear the noise coming from the street and the neighboring apartments. There are a few other rooms in the house that are being rented out, so other people will be staying in the house which makes it a necessity to lock the room when you leave the apartment. \n\nIt's important to note that this place has a very strict check out time. On our last day, we had an evening flight but had to check out in the morning. When we asked if we could check out late, Isa told us to take our stuff to the train station and use the lockers there, but the train station does not have lockers. We ended up renting a locker  at a place called \"Barcelona lockers\". That, I would say changed all the plans for the last day. \n\n",
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.5,
            location: 5,
            value: 4.4,
          },
          by: {
            _id: '622f3405e36c59e6164fb8e1',
            fullname: 'Murat',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/26.jpg',
          },
        },
        {
          id: 'urFlaL',
          txt: "I was happy to experience Isabels home as described here. It was spacious, bright and original, with lovely colours and beautiful artwork surrounding me in every room. Isabel is a creative, sensitive and respectful person, with an open mind- yet she has the necessary boundaries that are required to organize an environment where so many different people are going to stay and hopefully enjoy. \nThe street itself is very lively, but the noises didn't bother me at all as i could easily block them out with earplugs. The location could not have been more sentral, still it's on \"the right side\" of the Rambla, where you can find more independent shops, restaurants, cafes and bars compared to the same leveled streets towards Raval. It is an old and very charming building, so if you want an minimalistic experience with cold, stainless steel and elevators this is not the place for you! And perhaps you are not the right person for this place either ;) I had to leave earlier due to illness, and was so sorry i couldn't stay throughout the whole month as planned. Hope to be seeing Isabel and her welcoming surroundings again one day ",
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.5,
            location: 5,
            value: 4.4,
          },
          by: {
            _id: '622f3406e36c59e6164fbcb4',
            fullname: 'Mina',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/4.jpg',
          },
        },
        {
          id: 'yhySQR',
          txt: 'Isabel was an amazing host. She is incredible and super considerate. The apartment was by no means the best location in Barcelona, I walked everywhere and never needed a map or a taxi. Arriving late at night was always fine and there was never any disturbing street noise. The block is super cute with awesome little shops that are open during the day. Best neighborhood to be in and incredible city ! Muchísima gracias Isabel, estas invitada a visitar Los Ángeles, todo fue increíble !❤️',
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.5,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3405e36c59e6164fb85f',
            fullname: 'Jessy',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/38.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: '622f337a75c7d36e498aaafe',
      name: 'Home, Sweet, Harlem. Welcome!',
      type: 'Entire home/apt',
      imgUrls: [
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436390/om97cgufeacwlric2r5w.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436827/znh7gqzbwb4wm6bdziy7.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436334/nqgdwv3ljfkrbvynoetv.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436376/phpltehcr6uq9lh5jlax.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436937/mkbcjfockxezgrvimska.jpg',
      ],
      price: 110,
      details: {
        guests: '6',
        bedroom: '2',
        bed: '3',
        bath: '2',
      },
      summary:
        'Welcome! Upgrades Added as of January 2018 This listing is located in the Spanish Harlem Section of Manhattan. I offer a cozy apartment that has great transportation in and out the city! The area has a lot of ethnic restaurants and a lot of local, active residents. This residence is great for a quick, inexpensive stay in New York whether its for business, travel, or personal purposes. I am glad to welcome all guests!',
      capacity: 3,
      amenities: [
        'TV',
        'Wifi',
        'Air conditioning',
        'Kitchen',
        'Free street parking',
        'Heating',
        'Smoke detector',
        'Carbon monoxide detector',
        'Essentials',
        'Shampoo',
        'Lock on bedroom door',
        'Hangers',
        'Iron',
        'Laptop friendly workspace',
        'Private living room',
        'Hot water',
        'Bed linens',
        'Extra pillows and blankets',
        'Refrigerator',
        'Dishes and silverware',
        'Cooking basics',
        'Oven',
        'Stove',
        'Host greets you',
      ],
      labels: ['beach', 'beachfront'],
      host: {
        _id: '622f3405e36c59e6164fb914',
        fullname: 'Kevin',
        sortName: 'Kevin',
        imgUrl:
          'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/10.jpg',
      },
      loc: {
        country: 'United States',
        countryCode: 'US',
        city: 'New York',
        address: 'New York, NY, United States',
        lat: -73.93955,
        lng: 40.79733,
      },
      reviews: [
        {
          id: 'TXCI4f',
          txt: "Kevin was very welcoming and thorough with all information. The description of the property was accurate. It's also near the MTA if you want to get to another part of the city. Kevin got in touch before I arrived, and his brother was there to meet me and show me where everything was, which was great. Last but not least, he had provided a great information on the local area with recommendations for places to eat, etc., which I found really useful.\r\n",
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3405e36c59e6164fb8b4',
            fullname: 'Christine',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/12.jpg',
          },
        },
        {
          id: '53YF7T',
          txt: "Kevin was nice. And he was very responsive via text, which I appreciate. The listing is in East Harlem, which isn't for everyone. The area is not very posh, but, for me, it feels like home, so I tend to stay there whenever I go to New York. The listing description was accurate enough, with respect to the way the apartment looks. If you can't deal with noise at night, however, this might not be the place for you. The neighbors were surprisingly noisy in the wee hours of the night and virtually silent during the day. This apartment is close to the subway, which was very useful.",
          rate: {
            cleanliness: 4.8,
            communication: 4.2,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3407e36c59e6164fbdb9',
            fullname: 'Hector',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/16.jpg',
          },
        },
        {
          id: 'qnVAG6',
          txt: 'Kevin was very helpful and communicative during the whole time. The apartment is very nice, and within walking distance to the subway. Would definitely stay there again.',
          rate: {
            cleanliness: 4.8,
            communication: 4.2,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3407e36c59e6164fbdca',
            fullname: 'Jaime',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/13.jpg',
          },
        },
        {
          id: '1tSJur',
          txt: "I had a wonderful stay at Kevin's apartment. The apartment is very close to the six train line. Everything in the apartment was spotless clean. I definitely recommend this apartment to others. Thank you Kevin for hosting me!",
          rate: {
            cleanliness: 4.8,
            communication: 5,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3402e36c59e6164fae69',
            fullname: 'Anan',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/31.jpg',
          },
        },
        {
          id: 'pK4vRk',
          txt: 'Kevin fue excelente anfitrión. Se mantuvo en contacto con nosotros y fue muy comprensivo aún cuando llegamos más tarde de la hora acordada para el check in porque nos perdimos en el subway. También fue muy comprensivo para acordar el check out de acuerdo a la hora que fue más conveniente para nosotros, aún cuando también se nos hizo tarde. Nos proveyó de un matress de aire para nuestra amiga que vino de M.A. y se quedó una noche con nosotros. El barrio nos pareció bien, no tuvimos ningún incidente. Muchos puertoriqueños y Dominicanos, así que nos sentimos como en casa. Todo fue muy cómodo y limpio. Los vecinos hicieron mucho ruido en las noches, pero no fue problema para nosotros. Una sugerencia sería poner un espejo de cuerpo completo en alguna parte del apartento. En resumen, el apartamento fue perfecto para nosotros, nos volveríamos a quedar y claro que lo recomendaría! Muchas Gracias Kevin por tu ayuda!',
          rate: {
            cleanliness: 4.8,
            communication: 5,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3407e36c59e6164fbf23',
            fullname: 'Yamilis',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/74.jpg',
          },
        },
        {
          id: 'rEB2Zw',
          txt: 'Kevin was really thoughtful about everything. He gave me all information needed while staying on his house. The house was very clean.',
          rate: {
            cleanliness: 4.8,
            communication: 5,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3405e36c59e6164fb6a4',
            fullname: 'Leonam',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/48.jpg',
          },
        },
        {
          id: 'Ha6gbK',
          txt: "Kevin is a really nice host, flexible and very responsive. The apartment is a 4th-floor walk up, well-maintained and exactly as advertised in the listing. The apartment has all the basic things--it's especially nice to have a kitchen and comfy sofa. There's no TV and wifi, but you probably don't need it anyway since you are here to see New York city! It is just a short 5-min walk from the subway station, so very convenient. Street noise is not a problem although you can hear the neighbors at times (the kids next door can be noisy). East Harlem is a bustling Latino neighborhood with many local eateries and shops. The food selection is supposed to be great (too bad we didn't get to try any). There is a grocery store right outside the building. There're always locals hanging out in front but we were never bothered. All and all, a good choice if you are looking to stay in this part of the city.",
          rate: {
            cleanliness: 4.8,
            communication: 5,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3407e36c59e6164fc063',
            fullname: 'Amy',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/50.jpg',
          },
        },
        {
          id: 'ZrMWEQ',
          txt: 'Kevin was an excellent host. Everything was absolutely as described. The apartment is lovely and very clean. There are numerous windows in every room and there is plenty of light! Would definitely stay again!',
          rate: {
            cleanliness: 4.8,
            communication: 5,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3401e36c59e6164fab7d',
            fullname: 'Vlad',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/21.jpg',
          },
        },
        {
          id: 'SF3CFO',
          txt: 'Great experience, we enjoyed ourselves for the night we stayed, only issue really were the neighbors being loud all night made it hard to sleep.',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.7,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3407e36c59e6164fbe7b',
            fullname: 'Derick',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/13.jpg',
          },
        },
        {
          id: 'JR0e2c',
          txt: "Kevin's place is exactly as other reviewers describe it:  nice and clean, spacious and very convenient as a base to explore and enjoy NYC. \r\n\r\nThe Neighborhood is definitely classic East Harlem.  Very real NYC vibe. Not a tourist area.  \r\n\r\nThe neighbors are noisy sometimes, so if you are a light sleeper, that could be a problem. But I didn't have any trouble. \r\n\r\nIt would have been nice to have wireless, but I didn't come to NYC to play online, so I didn't mind that too much.  \r\n\r\nKevin was a very nice, responsive host! ",
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.7,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3407e36c59e6164fbefb',
            fullname: 'Derek',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/59.jpg',
          },
        },
        {
          id: 'FJDXNp',
          txt: 'Kevin made my friend and I feel really welcomed. The apartment was very clean!',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.7,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3404e36c59e6164fb484',
            fullname: 'Shiann',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/50.jpg',
          },
        },
        {
          id: 'nTI2xL',
          txt: 'Me and my husband stayed in the apartment this was our first time using this site and Kevin made us feel like we are regulars. We stayed one night and it was wonderful. Kevin contacted us right away and was really good with getting us whatever we need to stay there. The area is the only bad thing but when we went in the apartment you really forget about the outside.',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.7,
            location: 5,
            value: 4.7,
          },
          by: {
            _id: '622f3403e36c59e6164fb208',
            fullname: 'Stephanie',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/61.jpg',
          },
        },
        {
          id: 'I67Gn1',
          txt: 'Kevin is easy to get in touch with and waited for us to arrive Even if it was already late in the evening. He even asked if everything was fine during our stay.\nThe appartment is perfectly situated to visit Manhattan island. Just note the neighbours are noisy if it is important to you.',
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.7,
          },
          by: {
            _id: '622f3404e36c59e6164fb52c',
            fullname: 'Virginie',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/23.jpg',
          },
        },
        {
          id: 'EWCyWE',
          txt: "Kevin was absolutely wonderful. He was very responsive and communicative and I could tell he takes great pride in being an exceptional host. His place was exactly as described, as shown in the pictures and also very clean. The neighborhood is great and the room is a great price for someone looking to stay in the city and explore. It's right next to the trains, neighborhood gems but also commonly known stores for anyone who isn't familiar with the area. ",
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.7,
          },
          by: {
            _id: '622f3405e36c59e6164fb803',
            fullname: 'Ada',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/63.jpg',
          },
        },
        {
          id: 'g4Zafl',
          txt: 'everything was correct , very good condition to this price',
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.7,
          },
          by: {
            _id: '622f3406e36c59e6164fbc21',
            fullname: 'Fernando',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/1.jpg',
          },
        },
        {
          id: 'xFWUjQ',
          txt: 'This is my first time using Airbnb. Kevin responded quickly to my inquiry about booking his apartment. Once booked he was very easy to reach via phone or text if I needed to. His one bedroom apartment was very clean and nicely furnished. It is central to a lot of restaurants and neighborhood shopping should you need something and a couple blocks from the subway and buses. Kevin was a great host. He was there to greet me, show me around the apartment and tell me a bit about the area. He also has maps and booklets about what to visit while in New York City. There is wifi in the apartment which is great. Kevin checked in with me just to make sure everything was ok during my trip. I had a wonderful stay at his apartment and would book it again! ',
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.3,
          },
          by: {
            _id: '622f3407e36c59e6164fbdfe',
            fullname: 'Francesca',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/38.jpg',
          },
        },
        {
          id: 'rpqZwP',
          txt: "Kevin was a phenomenal host, he was very accommodating about arrival and check out times and provided me with a ton of useful information to navigate the area and make my stay as pleasant as possible. The apartment is two blocks from the subway and easy to navigate from. I would definitely recommend staying at Kevin's for all those considering a trip to New York.",
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 5,
            location: 5,
            value: 4.3,
          },
          by: {
            _id: '622f3404e36c59e6164fb4de',
            fullname: 'Alex',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/59.jpg',
          },
        },
        {
          id: 's6cKC5',
          txt: 'The apartment is as described. Kevin is very pleasant and was kind to helped me bring my belongings to the apartment. The apartment is cozy in a great location. I will definitely be using this apartment again',
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 5,
            location: 5,
            value: 5,
          },
          by: {
            _id: '622f3407e36c59e6164fbd08',
            fullname: 'Johanna',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/13.jpg',
          },
        },
        {
          id: 'NYiUQe',
          txt: "Kevin's a great guy, but if you're looking for a hotel-like experience, this is NOT it... This however, IS a genuine NYC experience. Noisy & inconsiderate neighbors, dirty streets, dangerous vibes... All in all your safe, and anyone you actually talk to will be cool... Kevin was also very considerate and did everything he could to add comfort to my stay, he even warned me of the noisy neighbors in advance... This place is good for people who already know NYC, and need an affordable, SHORT-TERM (like 1-2days), place to crash uptown...",
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 5,
            location: 5,
            value: 5,
          },
          by: {
            _id: '622f3405e36c59e6164fb7a6',
            fullname: 'Bandele',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/31.jpg',
          },
        },
        {
          id: 'UvRpyu',
          txt: 'This place was cozy, comfortable and very clean. The AC was very helpful during the heat waves. Good shower and great WiFi connection as well.',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 5,
            location: 5,
            value: 5,
          },
          by: {
            _id: '622f3405e36c59e6164fb80a',
            fullname: 'Bryan',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/57.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: '622f337a75c7d36e498aaaff',
      name: 'Heroísmo IV',
      type: 'Entire home/apt',
      imgUrls: [
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436823/af6elioxovkhvp6cg1un.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437327/epcnh2tzpafwmvi3srcp.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437310/tus71yfpnvgulenrli6a.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436453/ndl8odasqgnyquvsbalp.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436821/b4ejulqdhsvyseyfnfr0.jpg',
      ],
      price: 29,
      details: {
        guests: '8',
        bedroom: '6',
        bed: '7',
        bath: '3',
      },
      summary:
        'If the dates you wish are not available, we have other options in the same location. You can find them on my profile. My goal is for you to have your days with the most comfort i can propose. I want you to taste all the feelings in Porto, as our food, as our best places, our best pointviews. I just love to help you enjoying this beautiful city :)',
      capacity: 2,
      amenities: [
        'TV',
        'Wifi',
        'Kitchen',
        'Free street parking',
        'Heating',
        'First aid kit',
        'Safety card',
        'Fire extinguisher',
        'Essentials',
        'Shampoo',
        '24-hour check-in',
        'Hangers',
        'Hair dryer',
        'Room-darkening shades',
        'Hot water',
        'Bed linens',
        'Extra pillows and blankets',
        'Microwave',
        'Refrigerator',
        'Dishes and silverware',
        'Cooking basics',
        'Stove',
        'Single level home',
        'Long term stays allowed',
        'Host greets you',
        'Handheld shower head',
      ],
      labels: ['castles', 'manson', 'design'],
      host: {
        _id: '622f3401e36c59e6164fab5c',
        fullname: 'Apartments2Enjoy',
        sortName: 'Apart',
        imgUrl:
          'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/48.jpg',
      },
      loc: {
        country: 'Portugal',
        countryCode: 'PT',
        city: 'Porto',
        address: 'Porto, Porto, Portugal',
        lat: -8.59275,
        lng: 41.1462,
      },
      reviews: [
        {
          id: 'R3YEmY',
          txt: 'Nuno and Francisca were extremely kind and helpful people. They made us feel very welcome and the house is surprisingly spacious. The wifi connection did struggle in our room but maybe we just had bad luck. They were even kind enough to extend our stay last minute. The service was top quality and the shower was amazing. Highly recommend staying here.',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 5,
          },
          by: {
            _id: '622f3404e36c59e6164fb449',
            fullname: 'Tejovra',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/60.jpg',
          },
        },
        {
          id: 'NLZb5i',
          txt: 'Muito simpáticos e atenciosos. O apartamento é muito confortável e com pequenos detalhes que fazem a diferença. Muito perto do metro, o que é óptimo para deslocações necessárias.',
          rate: {
            cleanliness: 4.8,
            communication: 4.5,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3403e36c59e6164fafcc',
            fullname: 'Sara',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/41.jpg',
          },
        },
        {
          id: 'QQuq53',
          txt: "Bonjour, Notre séjour a été très agréable. Nous avons été très bien accueillies. Nuno nous a donné de nombreux conseils, lieux de visites... Le logement était également très bien. Nous avons vraiment pu profiter de Porto. Le métro est tout proche du logement. C'était vraiment un très bon séjour. Merci encore. ",
          rate: {
            cleanliness: 4.8,
            communication: 4.5,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3403e36c59e6164faf68',
            fullname: 'Jennifer',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/13.jpg',
          },
        },
        {
          id: 'qDoMdY',
          txt: "Our stay at Heroísmo IV was the perfect Airbnb experience. When we got there, Francisca was waiting for us. She was extremely nice and accommodating, she showed us the apartment and gave us a map of the city and plenty of tips about what to visit, where to eat, etc. The apartment is really small but has absolutely everything you need. It's clean, new, has a really nice kitchen, a very comfortable bed and is near the city center (we walked everyday). I highly recommend staying at Nuno's place. ¡Gracias por todo, Francisca! Porto is a beautiful city, we hope to come back soon!",
          rate: {
            cleanliness: 4.8,
            communication: 4.5,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3404e36c59e6164fb5b1',
            fullname: 'Irune',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/6.jpg',
          },
        },
        {
          id: 'I2lyxj',
          txt: 'A nice litte appartement. We arrived very late but were kindly greeted by the host. She showed us arround and gave us very useful tips (where to go/ where to eat/ etc.). The appartement is located directly to a metro station and has a Lidl and other grocery stores very near by.  It was a perfect stay!',
          rate: {
            cleanliness: 4.8,
            communication: 4.5,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3403e36c59e6164fb0c1',
            fullname: 'Marlene',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/36.jpg',
          },
        },
        {
          id: 'aFs6BG',
          txt: 'Квартира не большая и очень уютная. В ней есть все необходимое. Отличное расположение рядом с метро. Я получила много полезной информации при заселении. Во время сильного дождя в ней сыро, но это не испортило отдых.',
          rate: {
            cleanliness: 4.8,
            communication: 4.5,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.7,
          },
          by: {
            _id: '622f3402e36c59e6164fae67',
            fullname: 'Елизавета',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/73.jpg',
          },
        },
        {
          id: 'WHRtjg',
          txt: 'Desde o primeiro contacto, a comunicação foi muito fácil e clara. Colocaram à nossa disposição uma série de hipóteses de transporte a partir do aeroporto, bem como a possibilidade de termos em casa cabazes de alimentos. Assim que chegamos, com toda a sua simpatia, tinhamos a Mariana à nossa espera, recebeu-nos explicando os vários  pontos importantes para quem chega: locais a visitar, restaurantes, transportes...\r\nGostámos muito do espaço, do Porto, fazemos questão de voltar em breve. Local excelente!',
          rate: {
            cleanliness: 4.8,
            communication: 4.9,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.7,
          },
          by: {
            _id: '622f3404e36c59e6164fb3e7',
            fullname: 'Teresa',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/38.jpg',
          },
        },
        {
          id: 'Sb3g6t',
          txt: 'Francisca was very friendly and was waiting for us, she took the time to explain us everything about the flat, she even let us good adresses of restaurants, coffees and places to visit in Porto.\r\nThe flat is 10 minutes by foot from the center, with no stairs to climb, good for our heavy luggages! It is very calm and we even had a table outside where we took our breakfasts. The flat is tiny but very functional, clean, and well equipped.\r\nIt is perfect for a short time in Porto.',
          rate: {
            cleanliness: 4.8,
            communication: 4.9,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.7,
          },
          by: {
            _id: '622f3407e36c59e6164fbf5b',
            fullname: 'Joyce',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/11.jpg',
          },
        },
        {
          id: 'xijLKQ',
          txt: 'The apartment is great value for money and the location is fantastic. We arrived before the check in time but were greeted promptly and could leave our luggage to explore the city straight away. Francisca gave us a lot of good advice and recommendations for the city, which was very helpful. ',
          rate: {
            cleanliness: 4.8,
            communication: 4.9,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.7,
          },
          by: {
            _id: '622f3406e36c59e6164fbaad',
            fullname: 'Jess',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/72.jpg',
          },
        },
        {
          id: '5kOF6o',
          txt: 'Thank you for hosting us Nuno. Our trip was perfect. The host was very kind. And the apartment is beautiful, near the center and is well think : it has everything for a few days.',
          rate: {
            cleanliness: 4.8,
            communication: 4.9,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3402e36c59e6164faeed',
            fullname: 'Jennifer',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/56.jpg',
          },
        },
        {
          id: 'HzuUFw',
          txt: 'Estúdio muito simpático e limpo. Ideal para uma ou duas pessoas, para explorar o Porto durante um par de dias. Estação de metro à porta. Perto da zona histórica do Porto — faz-se bem a pé. Pastelaria ideal para pequeno almoço mesmo à porta.',
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3401e36c59e6164fab65',
            fullname: 'Joana',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/70.jpg',
          },
        },
        {
          id: 'DLz3a3',
          txt: "L'emplacement est parfait, dans un quartier calme et à proximité immédiate du métro et du centre-ville. Seul bémol: l'absence d'eau chaude à la douche (un seul ballon d'eau chaude disponible pour plusieurs appartements), franchement regrettable en plein coeur de l'hiver. Ce qui du coup entraîne un rapport qualité-prix un peu cher",
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.9,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3405e36c59e6164fb749',
            fullname: 'Nicolas',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/42.jpg',
          },
        },
        {
          id: 'UoZHrI',
          txt: 'El apartamento esta genial, es pequeño pero tiene todo lo necesario, cama super grande y cómoda, el apartamento está en general como nuevo y se ve exactamente como las fotos, estaba todo suuuuper limpio y tienen un radiador que calienta el habitáculo en muy poco tiempo. Nos recibió Rita, y de maravilla, nos dio un montón de información sobre Porto en un momento y nos dejó un montón de mapas e info útil. la zona es tranquila y tiene un montos de aparcamiento seguro en la misma calle. Aun que no está en el mismo centro de la ciudad se llega a el en un paseo de poco más de 10 mins, además en la misma puerta hay una parada de metro. Ha sido una experiencia genial quedarnos aquí para visitar la ciudad. Muchas gracias por la amabilidad, si volvemos a la ciudad no dudaríamos en volver a quedarnos aquí.',
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.9,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3403e36c59e6164fb10c',
            fullname: 'Marina',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/18.jpg',
          },
        },
        {
          id: '2rnYbC',
          txt: 'Gostamos muito do espaco, pequeno mas muito agradavel. Excelente para passar apenas uns dias. Obrigada ao Nuno que esperou por nos ate tarde e que ainda tirou um tempinho para nos explicar e dar umas dicas sobre a cidade! Aconselho!',
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.9,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3402e36c59e6164fad5b',
            fullname: 'Diogo',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/62.jpg',
          },
        },
        {
          id: 'AJ8QAt',
          txt: 'Небольшая, но очень уютная квартирка со всем необходимым! Завтракать на свежем воздухе очень приятно, в кухне можно приготовить все, что захочешь! Очень гостеприимная хозяйка, рассказала много интересного о местах поблизости и в городе!',
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.9,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3405e36c59e6164fb79e',
            fullname: 'Anastasia',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/40.jpg',
          },
        },
        {
          id: 'adooRM',
          txt: 'Excelente Studio, muito bem localizado e com todas as comodidades necessárias para uma pequena estadia.',
          rate: {
            cleanliness: 4.8,
            communication: 4.3,
            'check-in': 4.8,
            accuracy: 4.7,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3401e36c59e6164fab70',
            fullname: 'Raphael',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/1.jpg',
          },
        },
        {
          id: 'X26Fuw',
          txt: 'The flat is situated right next to a metro station. Also perfect, if you arrive by car - free parking just in front. 15 mins walk to downtown but lot of cheap cafes and restaurants full of locals around.\nThe check-in was perfect. We got lots of information, what to do/see/where to eat. Thanks for that. \nThe Apartement is very small but for a short city visit, big enough. If you stay for a week or so, I would recommend a larger Apartement.  ',
          rate: {
            cleanliness: 4.8,
            communication: 4.3,
            'check-in': 4.8,
            accuracy: 4.7,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3406e36c59e6164fbc99',
            fullname: 'Judith',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/69.jpg',
          },
        },
        {
          id: 'mcgeTU',
          txt: 'Fantástica estancia en Oporto. Apartamento pequeño pero suficiente para pasar unos días en  Oporto una pareja. Situado un poco a las afueras pero muy buena comunicación  con el centro (parada de metro y autobús enfrente del apartamento).\nAtención inmejorable del anfitrión, respondiendo muy rápido a nuestras consultas y gestionando nuestra llegada. El único fallo es que la lavadora no se podía utilizar. Muy recomendable para pasar unos días en Oporto relación calidad-precio.\n',
          rate: {
            cleanliness: 4.8,
            communication: 4.3,
            'check-in': 4.8,
            accuracy: 4.7,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3405e36c59e6164fb694',
            fullname: 'Marta',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/14.jpg',
          },
        },
        {
          id: '8rBdac',
          txt: "We had a very nice welcome where we received tips about the neighbourhood. Those we tried turned out excellent. It's a 15 to 20 minute walk to the centre, the room is small but it has everything you need and is well maintained. Very close to the subway, a small outdoor area where you can sit. \nTip: sandwiches (pork with cheese) from casa guedes",
          rate: {
            cleanliness: 4.8,
            communication: 4.3,
            'check-in': 4.8,
            accuracy: 4.7,
            location: 5,
            value: 4.9,
          },
          by: {
            _id: '622f3402e36c59e6164fadc4',
            fullname: 'Aron',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/60.jpg',
          },
        },
        {
          id: 'murZgt',
          txt: 'Excelente relação preço qualidade, muito boa comodidade e excelentes acessos. Muitas opções para as refeições por perto e metro à porta. Recomendo.',
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.7,
            location: 5,
            value: 4.9,
          },
          by: {
            _id: '622f3406e36c59e6164fba79',
            fullname: 'Márcio',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/71.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: '622f337a75c7d36e498aab00',
      name: 'Monte dos Burgos - Cosy Room',
      type: 'Private room',
      imgUrls: [
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436993/yzxnnw83e9qyas022au4.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436329/cvylwkta0uannbxm3zns.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437168/vbmfmdmwrxt7xfwbsw7c.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436821/b4ejulqdhsvyseyfnfr0.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436553/hbkx9lwxjd0wabqk0bmo.jpg',
      ],
      price: 26,
      details: {
        guests: '8',
        bedroom: '6',
        bed: '9',
        bath: '2',
      },
      summary:
        'The neighbourhood is a quiet, family residential area, 20 minutes by bus from the historic center of Porto and 20 minutes from the beach (Matosinhos - where you may eat very GOOD fish!). You will love to stay in a very spacious, familiar and bright room, where you can enjoy a large and flowery garden, comfortable kitchen and laundry with washer and dryer machine. My space is good for couples, solo adventures, and business travelers!',
      capacity: 2,
      amenities: [
        'Wifi',
        'Kitchen',
        'Free parking on premises',
        'Pets live on this property',
        'Cat(s)',
        'Washer',
        'Dryer',
        'First aid kit',
        'Fire extinguisher',
        'Essentials',
        'Shampoo',
        'Lock on bedroom door',
        'Hangers',
        'Hair dryer',
        'Iron',
        'Laptop friendly workspace',
      ],
      labels: ['ski', 'trending'],
      host: {
        _id: '622f3404e36c59e6164fb54f',
        fullname: 'Patrícia Sousa Casimiro',
        sortName: 'Casimiro',
        imgUrl:
          'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/12.jpg',
      },
      loc: {
        country: 'Portugal',
        countryCode: 'PT',
        city: 'Porto',
        address: 'Porto, Porto District, Portugal',
        lat: -8.63082,
        lng: 41.18075,
      },
      reviews: [
        {
          id: 'QXIhNJ',
          txt: 'We had a very nice stay in the house and felt at home. The room is big and light, we had a private bathroom, could use the kitchen and the nice garden. Patricia picked us up at the station of the metro, the bus is near. Patricia and Chris are very open and welcoming people, we talked about Portugal, Fado, Porto ... Also, they gave us several tips to see in Porto. When we are in Porto again we will come back!! We really recommand to stay here. Thanks Patricia and Casimiro!',
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.9,
          },
          by: {
            _id: '622f3402e36c59e6164fad68',
            fullname: 'Celeste',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/62.jpg',
          },
        },
        {
          id: 'TQF02Z',
          txt: 'Patricia and Chris has been wonderful hosts. They help us very much with all questions we had. We enjoyed our stay very much.',
          rate: {
            cleanliness: 4.8,
            communication: 4.8,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.9,
          },
          by: {
            _id: '622f3402e36c59e6164fadf0',
            fullname: 'Martin',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/24.jpg',
          },
        },
        {
          id: '5gUDGs',
          txt: 'Une chambre très spacieuse et une salle de bain privée : au top ! \r\nChristian et Patricia ont été très accueillants et nous nous sommes tout de suite sentis comme chez nous ! ',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3402e36c59e6164faedf',
            fullname: 'Sandra',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/57.jpg',
          },
        },
        {
          id: 'UDiBqQ',
          txt: "Des hôtes très accueillant et à l'écoute de leurs invités! De supers adresses à conseiller. \r\nUne maison décorée avec goût et avec une sublime salle de bain privée.\r\nLe centre est très facile d'accès en bus car inaccessible en voiture. \r\nTrès facile de se garer dans la rue de nos hôtes.\r\nUn excellent rapport qualité prix!",
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3404e36c59e6164fb3ed',
            fullname: 'Erika',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/67.jpg',
          },
        },
        {
          id: 'fcUqFs',
          txt: 'Patricia et Casimir ont été très accueillants et nous ont donné toutes les informations pratiques pour se rendre au centre de Porto en bus. La chambre est spacieuse et la salle de bain privée est juste à coté. Le quartier est très calme et le séjour était très agréable.',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3405e36c59e6164fb9bd',
            fullname: 'Guy',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/52.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: '622f337a75c7d36e498aab01',
      name: 'Nice Cosy Room In Taksim',
      type: 'Private room',
      imgUrls: [
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437241/wt0seud4ot4cmdrztdzz.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436867/yocip4igdbruuh2grzpf.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436460/qi3vkpts37b4k0dedosc.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436261/hwqt72njlhf9hkqou9ka.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437040/oarfkdxx7gyyvcynvwko.jpg',
      ],
      price: 105,
      details: {
        guests: '5',
        bedroom: '2',
        bed: '3',
        bath: '1',
      },
      summary:
        'Welcome if you want to stay at a cozy flat with local experience.:) It is in the center of Istanbul.The neighborhood is safe and close to attractions.Transportation is easy. I will help you always.',
      capacity: 2,
      amenities: [
        'TV',
        'Wifi',
        'Air conditioning',
        'Kitchen',
        'Heating',
        'Washer',
        'Essentials',
        'Shampoo',
      ],
      labels: ['islands', 'luxe', 'countryside'],
      host: {
        _id: '622f3402e36c59e6164fae4d',
        fullname: 'Nihat',
        sortName: 'Nihat',
        imgUrl:
          'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/13.jpg',
      },
      loc: {
        country: 'Turkey',
        countryCode: 'TR',
        city: 'Istanbul',
        address: 'Taksim, Cihangir, Istanbul , Beyoğlu, Turkey',
        lat: 28.98648,
        lng: 41.03376,
      },
      reviews: [
        {
          id: '1JRkOX',
          txt: 'I greatly appreciated both the location of the place (very central) and the appartment per se (clean and comfortable, with a very cosy room and with Wi-Fi). \r\n\r\nNihat was perfect host, quite welcoming and helpful about places to go (or avoid) and things to do in town. \r\n\r\nHosça kal!\r\n\r\n\r\n',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.5,
            location: 5,
            value: 4.4,
          },
          by: {
            _id: '622f3406e36c59e6164fbcc7',
            fullname: 'Quentin',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/28.jpg',
          },
        },
        {
          id: 'slkUbu',
          txt: 'Nice room in a flat well located. Nihat is very nce and helpful. Good experience.',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.5,
            location: 5,
            value: 4.4,
          },
          by: {
            _id: '622f3405e36c59e6164fb7f6',
            fullname: 'Steve',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/50.jpg',
          },
        },
        {
          id: 'vclaQK',
          txt: 'We had a fantastic stay in this charming apartment. The location was perfect and Nihat welcomed us even when we made a late reservation and arrived early. He works at a bar no far from there- a great place to have a drink after seeing the sites! I highly recommend this place!',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.5,
            location: 5,
            value: 4.4,
          },
          by: {
            _id: '622f3404e36c59e6164fb624',
            fullname: 'Jess',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/23.jpg',
          },
        },
        {
          id: '7X9gC4',
          txt: 'The flat is clean and and very good located, 3 minutes walk to Taksim Square. The bedroom is quiet at night, even though there is a crowded area next to the flat. Nihat was always extremely quick in answering our emails and let us feel comfortable. He is really kind and discrete, we met him few times cause he works in the evening. ',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.5,
            location: 5,
            value: 4.3,
          },
          by: {
            _id: '622f3406e36c59e6164fbcb6',
            fullname: 'Irina',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/35.jpg',
          },
        },
        {
          id: '1lFjc7',
          txt: 'Nihat went out of his way to accommodate our very early arrival and some unforeseeable challenges.  A great host!',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.3,
          },
          by: {
            _id: '622f3402e36c59e6164fae1a',
            fullname: 'Matthew',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/41.jpg',
          },
        },
        {
          id: 'stKwqh',
          txt: 'Nice place and host, very good location :)',
          rate: {
            cleanliness: 4.8,
            communication: 4.6,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 5,
          },
          by: {
            _id: '622f3407e36c59e6164fc03f',
            fullname: 'Valon',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/53.jpg',
          },
        },
        {
          id: 'ILr8L6',
          txt: 'Everything was great about the room and the location.',
          rate: {
            cleanliness: 4.8,
            communication: 4.3,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 5,
          },
          by: {
            _id: '622f3405e36c59e6164fb7a0',
            fullname: 'Amanda',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/57.jpg',
          },
        },
        {
          id: 'a9DE0v',
          txt: "The stay at Nihat's place was really pleasant. The apartment is very clean and confortable, and located in a very vibrant and animated neighborhood with many restaurants, cafes, bars, shops just nearby. Just a 5 min walk to the Taksim Metro station makes it easy to access any other parts of the city pretty quickly. Nihat was also a great and welcoming host. We totally recommend this place for your stay in Istanbul, especially if you want to experience the local life to the fullest ! ",
          rate: {
            cleanliness: 4.8,
            communication: 4.3,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 5,
          },
          by: {
            _id: '622f3404e36c59e6164fb3fe',
            fullname: 'Mathieu & Hilal',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/47.jpg',
          },
        },
        {
          id: 'wjYUWI',
          txt: 'The host canceled this reservation 30 days before arrival. This is an automated posting.',
          rate: {
            cleanliness: 4.8,
            communication: 4.3,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 5,
          },
          by: {
            _id: '622f3403e36c59e6164fb225',
            fullname: 'Christie',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/70.jpg',
          },
        },
        {
          id: 'phCCFu',
          txt: "I stayed at Nihat's for a week. It was exactly as the pics, very nice room. A little bit cold but he offers heating and AC. The apt is cozy and central, close to nice restaurants and bars. Have in mind is on the 4th fl no elevator. Nihat is a very easygoing guy who's open to help with any question or tip about the city. Totally recommend! thanks Nihat! ",
          rate: {
            cleanliness: 4.8,
            communication: 4.5,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3402e36c59e6164fad81',
            fullname: 'Vanessa',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/6.jpg',
          },
        },
        {
          id: 'p2ZMOU',
          txt: 'Nihat is a very nice host, he is very helpful and creates an agreeable atmosphere inside the flat. Thank you :)',
          rate: {
            cleanliness: 4.8,
            communication: 4.5,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3404e36c59e6164fb2d1',
            fullname: 'Florentin',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/53.jpg',
          },
        },
        {
          id: '6kgrZJ',
          txt: 'Nice cozy place very close to Taksim Square. Nihat is helpful and informative.',
          rate: {
            cleanliness: 4.8,
            communication: 4.4,
            'check-in': 4.8,
            accuracy: 4.8,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3402e36c59e6164fae29',
            fullname: 'Harshak',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/9.jpg',
          },
        },
        {
          id: '4Urv8z',
          txt: 'nice apartment with good location. the room was clean and neat. Nihat was helpful and supportive. totally recommend his accommodation',
          rate: {
            cleanliness: 4.8,
            communication: 4.4,
            'check-in': 4.8,
            accuracy: 5,
            location: 5,
            value: 4.3,
          },
          by: {
            _id: '622f3406e36c59e6164fbc70',
            fullname: 'Haytham',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/58.jpg',
          },
        },
        {
          id: 'CTBl84',
          txt: 'Nihat is a very friendly host and makes you really feel comfortable. I have had a great stay and recommend it to anyone who wants to stay very central (Cihangir), the hip and modern part of the city with cozy venues and great cafes just a 3min walk. The place is very close to Taksim Square, etc...everything as described in the prior conments. I will definitely come again! Cheers vural',
          rate: {
            cleanliness: 4.8,
            communication: 4.4,
            'check-in': 4.8,
            accuracy: 5,
            location: 5,
            value: 4.3,
          },
          by: {
            _id: '622f3404e36c59e6164fb5fd',
            fullname: 'Vural',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/49.jpg',
          },
        },
        {
          id: 'aXHGX5',
          txt: 'I totally recommend this place. Great experience staying at Nihat’s apartment. To start with, Nihat is a wonderful friendly person who I was happy to meet. He was very friendly at house, and we had the chance to spend time together outside. Staying with him reflects the true meaning of this website, which is living as a local with a local person. Thank you Nihat. \nRegarding the apartment, it is exactly as described. The room is nice and bed is comfortable. It was clean and well prepared for us. \nRegarding the neighborhood, it is very close to Taksim square and Istiklal Street with few minutes walk. As normal as it is in Istanbul, there is a short hill you need to walk to get to the square, which was totally fine with us. \n\nIn general, next time I visit Istanbul I would first check the availability with Nihat before searching others.',
          rate: {
            cleanliness: 4.8,
            communication: 4.4,
            'check-in': 4.8,
            accuracy: 4.4,
            location: 5,
            value: 4.2,
          },
          by: {
            _id: '622f3406e36c59e6164fba05',
            fullname: 'Wasseem',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/6.jpg',
          },
        },
        {
          id: 'aCDLmX',
          txt: "Nihat was an amazing host. He picked me up from the bus stop, gave me some great tips on what to do in Istanbul and just an all round great guy. If you're looking for somewhere close to Taksim then Nihat's place is great. Highly recommend him! Thanks Nihat.",
          rate: {
            cleanliness: 4.8,
            communication: 4.4,
            'check-in': 4.8,
            accuracy: 4.4,
            location: 5,
            value: 4.2,
          },
          by: {
            _id: '622f3402e36c59e6164fac4c',
            fullname: 'Mr Joseph',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/24.jpg',
          },
        },
        {
          id: 'aJGgB8',
          txt: "Nihat is so hospitable person. Me and My boyfriend stayed 6 days in Nihat's place and everything was perfect. Nihat is so tactful person despite he was working so hard, he all the time asked us 'do we need anything?' he was so clean and his house is exactly same with the pictures.\nI'm highly recommend his place! \nthank you Nihat!",
          rate: {
            cleanliness: 4.8,
            communication: 4.4,
            'check-in': 4.8,
            accuracy: 4.4,
            location: 5,
            value: 4.2,
          },
          by: {
            _id: '622f3405e36c59e6164fb8b8',
            fullname: 'Gökçe',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/53.jpg',
          },
        },
        {
          id: 'UYFoQD',
          txt: 'Very helping and welcoming host. Perfect location for a few days in Istanbul.',
          rate: {
            cleanliness: 4.8,
            communication: 4.4,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3405e36c59e6164fb952',
            fullname: 'Bruno',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/26.jpg',
          },
        },
        {
          id: 'yvG3Ng',
          txt: 'Nihat was very nice, polite and very helpful to us. He let us drop our baggages off in the morning and left them for a little longer when we checked out. The location is great as it is near Taksim Square. There are local grocery shops nearby if you want to buy some food or snacks.',
          rate: {
            cleanliness: 4.8,
            communication: 4.7,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.8,
          },
          by: {
            _id: '622f3405e36c59e6164fb73d',
            fullname: 'Vichapas',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/5.jpg',
          },
        },
        {
          id: 'yHpF2i',
          txt: 'Nihat is very nice host, and came to wait for me in the shuttle bus station near Taksim squre, His house is very convenient for travel. He is very experirenced and warm host, the room super clean and warm, and house has everything, next time i will choose his house again in istanbul. miss you nihat. see you next time.',
          rate: {
            cleanliness: 4.8,
            communication: 4.7,
            'check-in': 4.8,
            accuracy: 4.6,
            location: 5,
            value: 4.6,
          },
          by: {
            _id: '622f3403e36c59e6164fb0fe',
            fullname: 'Show',
            imgUrl:
              'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/33.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
  ]
  utilService.saveToStorage(STORAGE_KEY, JSON.parse(JSON.stringify(DEMO_STAYS)))
}

function _createStays() {
  let staysDB = utilService.loadFromStorage(STORAGE_KEY)
  if (!staysDB || !staysDB.length) {
    _createDemoStays()
  }
}
