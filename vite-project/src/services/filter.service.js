export const filterService = {
  getCategories,
  getDefaultFilter,
  getPopularCategories,
  getTypes,
}

function getDefaultFilter() {
  return { destination: '' }
}

function getTypes() {
  const types = [
    {
      name: 'An entire place',
      desc: 'Guests have the whole place to themselves.',
      url: 'entire-place',
    },
    {
      name: 'A private room',
      desc: 'Guests sleep in a private room but some areas may be shared with you and others.',
      url: 'private-room',
    },
    {
      name: 'A shared room',
      desc: 'Guests sleep in a room or common area that may be shared with you and others.',
      url: 'shared-room',
    },
  ]
  return types
}

function getPopularCategories() {
  const categories = [
    {
      name: 'Amazing views',
      url: 'amazing-view',
    },
    {
      name: "Chief's kitchens",
      url: 'chiefs-kitchen',
    },
    {
      name: 'Luxe',
      url: 'luxe',
    },
    {
      name: 'Ski-in/out',
      url: 'ski',
    },
    {
      name: 'Private rooms',
      url: 'private-rooms',
    },
    {
      name: 'Cabins',
      url: 'cabins',
    },
    {
      name: 'Countryside',
      url: 'countryside',
    },
    {
      name: 'Farms',
      url: 'farms',
    },
    {
      name: 'Lakefront',
      url: 'lakefront',
    },
    {
      name: 'Tiny homes',
      url: 'tiny-homes',
    },
    {
      name: 'Off-the-grid',
      url: 'off-the-grid',
    },
    {
      name: 'Beach',
      url: 'beach',
    },
    {
      name: 'Beachfront',
      url: 'beach-front',
    },
    {
      name: 'Tropical',
      url: 'tropical',
    },
    {
      name: 'Lake',
      url: 'lake',
    },
    {
      name: 'National parks',
      url: 'national-parks',
    },
    {
      name: 'Creative spaces',
      url: 'creative-spaces',
    },
    {
      name: 'Desert',
      url: 'desert',
    },
    {
      name: 'Caves',
      url: 'caves',
    },
    {
      name: 'Camping',
      url: 'campings',
    },
    {
      name: 'A-frames',
      url: 'a-frame',
    },
    {
      name: 'Surfing',
      url: 'surfing',
    },
    {
      name: 'Containers',
      url: 'containers',
    },
    {
      name: 'Domes',
      url: 'domes',
    },
    {
      name: 'Windmills',
      url: 'windmills',
    },
    {
      name: 'Barns',
      url: 'barns',
    },
    {
      name: 'Towers',
      url: 'towers',
    },
    {
      name: "Shepherd's hut",
      url: 'shepherds-huts',
    },
    {
      name: 'Campers',
      url: 'campers',
    },
    {
      name: 'Skiing',
      url: 'skiing',
    },
  ]

  return categories
}

function getCategories() {
  const categories = [
    {
      name: 'OMG!',
      url: 'omg',
    },
    {
      name: 'Amazing views',
      url: 'amazing-view',
    },
    {
      name: 'Trending',
      url: 'trending',
    },
    {
      name: 'Bed & breakfasts',
      url: 'bed-and-breakfast',
    },
    {
      name: "Chief's kitchens",
      url: 'chiefs-kitchen',
    },
    {
      name: 'Luxe',
      url: 'luxe',
    },
    {
      name: 'Mansions',
      url: 'mansions',
    },
    {
      name: 'Ski-in/out',
      url: 'ski',
    },
    {
      name: 'Private rooms',
      url: 'private-rooms',
    },
    {
      name: 'Boats',
      url: 'boats',
    },
    {
      name: 'Castles',
      url: 'castles',
    },
    {
      name: 'Cabins',
      url: 'cabins',
    },
    {
      name: 'Amazing pools',
      url: 'amazing-pools',
    },
    {
      name: 'Design',
      url: 'design',
    },
    {
      name: 'Countryside',
      url: 'countryside',
    },
    {
      name: 'Farms',
      url: 'farms',
    },
    {
      name: 'Lakefront',
      url: 'lakefront',
    },
    {
      name: 'Tiny homes',
      url: 'tiny-homes',
    },
    {
      name: 'Off-the-grid',
      url: 'off-the-grid',
    },
    {
      name: 'Beach',
      url: 'beach',
    },
    {
      name: 'Beachfront',
      url: 'beach-front',
    },
    {
      name: 'Tropical',
      url: 'tropical',
    },
    {
      name: 'Lake',
      url: 'lake',
    },
    {
      name: 'Iconic cities',
      url: 'iconic-cities',
    },
    {
      name: 'Historical homes',
      url: 'historical-homes',
    },
    {
      name: 'National parks',
      url: 'national-parks',
    },
    {
      name: 'Play',
      url: 'play',
    },
    {
      name: 'Creative spaces',
      url: 'creative-spaces',
    },
    {
      name: 'Desert',
      url: 'desert',
    },
    {
      name: 'Yurts',
      url: 'yurts',
    },
    {
      name: 'Arctic',
      url: 'arctic',
    },
    {
      name: 'New',
      url: 'new',
    },
    {
      name: 'Vineyards',
      url: 'vineyards',
    },
    {
      name: 'Caves',
      url: 'caves',
    },
    {
      name: 'Earth homes',
      url: 'earth-homes',
    },
    {
      name: 'Treehouses',
      url: 'tree-houses',
    },
    {
      name: 'Houseboats',
      url: 'house-boats',
    },
    {
      name: 'Camping',
      url: 'campings',
    },
    {
      name: 'Top of the world',
      url: 'top-of-the-world',
    },
    {
      name: 'Grand pianos',
      url: 'grand-pianos',
    },
    {
      name: 'A-frames',
      url: 'a-frame',
    },
    {
      name: 'Cycladic homes',
      url: 'cycladic-homes',
    },
    {
      name: 'Surfing',
      url: 'surfing',
    },
    {
      name: 'Containers',
      url: 'containers',
    },
    {
      name: 'Domes',
      url: 'domes',
    },
    {
      name: 'Windmills',
      url: 'windmills',
    },
    {
      name: 'Trulli',
      url: 'trulli',
    },
    {
      name: 'Golfing',
      url: 'golfing',
    },
    {
      name: 'Barns',
      url: 'barns',
    },
    {
      name: 'Towers',
      url: 'towers',
    },
    {
      name: 'Ryokans',
      url: 'ryokans',
    },
    {
      name: 'Adapted',
      url: 'adapted',
    },
    {
      name: 'Riads',
      url: 'riads',
    },
    {
      name: "Shepherd's hut",
      url: 'shepherds-huts',
    },
    {
      name: 'Hanoks',
      url: 'hanoks',
    },
    {
      name: 'Dammusi',
      url: 'dammusi',
    },
    {
      name: 'Casas particulares',
      url: 'casas',
    },
    {
      name: 'Minsus',
      url: 'minsus',
    },
    {
      name: 'Campers',
      url: 'campers',
    },
    {
      name: 'Skiing',
      url: 'skiing',
    },
  ]

  return categories
}
