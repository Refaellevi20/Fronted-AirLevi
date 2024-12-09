import Airconditioning from '/img/amenities/air-conditioning.svg'
import Balcony from '/img/amenities/balcony.svg'
import Beachfront from '/img/amenities/beachfront.svg'
import Bedlinens from '/img/amenities/bed-linens.svg'
import Blender from '/img/amenities/blender.svg'
import BoardGames from '/img/amenities/board-games.svg'
import Bodysoap from '/img/amenities/body-soap.svg'
import Buildingstaff from '/img/amenities/building-staff.svg'
import Carbonmonoxidedetector from '/img/amenities/carbon-monoxide-detector.svg'
import Cityskylineview from '/img/amenities/city-skyline-view.svg'
import Cleaningproducts from '/img/amenities/cleaning- products.svg'
import Coffeemaker from '/img/amenities/coffee-maker.svg'
import Cookingbasics from '/img/amenities/cooking-basics.svg'
import Crib from '/img/amenities/Crib.svg'
import Diningtable from '/img/amenities/dining-table.svg'
import Dishesandsilverware from '/img/amenities/dishes-and-silverware.svg'
import Dishwasher from '/img/amenities/dishwasher.svg'
import Doorman from '/img/amenities/doorman.svg'
import Dryer from '/img/amenities/dryer.svg'
import Elevator from '/img/amenities/elevator.svg'
import Essentials from '/img/amenities/essentials.svg'
import Ethernetconnection from '/img/amenities/ethernet-connection.svg'
import Extrapillowsandblankets from '/img/amenities/extra-pillows-and-blankets.svg'
import Fireextinguisher from '/img/amenities/fire-extinguisher.svg'
import Firepit from '/img/amenities/fire-pit.svg'
import Firstaidkit from '/img/amenities/first-aid-kit.svg'
import Freeparkingonpremises from '/img/amenities/free-parking-on-premises.svg'
import Freestreetparking from '/img/amenities/free-street-parking.svg'
import Gym from '/img/amenities/gym.svg'
import Hairdryer from '/img/amenities/hair-dryer.svg'
import Hangers from '/img/amenities/hangers.svg'
import Heating from '/img/amenities/heating.svg'
import HighChair from '/img/amenities/high-chair.svg'
import Hostgreetsyou from '/img/amenities/host-greets-you.svg'
import Hottub from '/img/amenities/hot-tub.svg'
import Hotwater from '/img/amenities/hot-water-kettle.svg'
import Hotwaterkettle from '/img/amenities/hot-water.svg'
import Iron from '/img/amenities/iron.svg'
import Kitchen from '/img/amenities/kitchen.svg'
import Laptopfriendlyworkspace from '/img/amenities/laptop-friendly-workspace.svg'
import Lockbox from '/img/amenities/lockbox.svg'
import Longtermstaysallowed from '/img/amenities/long-term-stays-allowed.svg'
import Microwave from '/img/amenities/Microwave.svg'
import Mountainview from '/img/amenities/mountain-view.svg'
import Oven from '/img/amenities/oven.svg'
import Paidparkingoffpremises from '/img/amenities/paid-parking-off-premises.svg'
import Paidparkingonpremises from '/img/amenities/paid-parking-on-premises.svg'
import Parkview from '/img/amenities/park-view.svg'
import Parking from '/img/amenities/parking.svg'
import Patioorbalcony from '/img/amenities/patio-or-balcony.svg'
import Petsallowed from '/img/amenities/pets-allowed.svg'
import Pool from '/img/amenities/pool.svg'
import Privateentrance from '/img/amenities/private-entrance.svg'
import Refrigerator from '/img/amenities/refrigerator.svg'
import Roomdarkeningshades from '/img/amenities/room-darkening-shades.svg'
import Safe from '/img/amenities/Safe.svg'
import Securitycameras from '/img/amenities/security-cameras.svg'
import Selfcheckin from '/img/amenities/self-check-in.svg'
import Shampoo from '/img/amenities/shampoo.svg'
import Singlelevelhome from '/img/amenities/Single level home.svg'
import Smokedetector from '/img/amenities/smoke-detector.svg'
import Smokingallowed from '/img/amenities/smoking-allowed.svg'
import Stepfreeaccess from '/img/amenities/step-free-access.svg'
import Stove from '/img/amenities/stove.svg'
import Suitableforevents from '/img/amenities/suitable-for-events.svg'
import Toaster from '/img/amenities/toaster.svg'
import TV from '/img/amenities/tv.svg'
import Valleyview from '/img/amenities/valley-view.svg'
import Wardrobe from '/img/amenities/wardrobe.svg'
import Washer from '/img/amenities/washer.svg'
import Waterfront from '/img/amenities/waterfront.svg'
import Wifi from '/img/amenities/wifi.svg'

export function StayAmenity({ amenity }) {

    const amenityMap = {
        "Air conditioning": Airconditioning,
        "Balcony": Balcony,
        "Beachfront": Beachfront,
        "Bed linens": Bedlinens,
        "Blender": Blender,
        "Board Games": BoardGames,
        "Body soap": Bodysoap,
        "Building staff": Buildingstaff,
        "Carbon monoxide detector": Carbonmonoxidedetector,
        "City skyline view": Cityskylineview,
        "Cleaning products": Cleaningproducts,
        "Coffee maker": Coffeemaker,
        "Cooking basics": Cookingbasics,
        "Crib": Crib,
        "Dining table": Diningtable,
        "Dishes and silverware": Dishesandsilverware,
        "Dishwasher": Dishwasher,
        "Doorman": Doorman,
        "Dryer": Dryer,
        "Elevator": Elevator,
        "Essentials": Essentials,
        "Ethernet connection": Ethernetconnection,
        "Extra pillows and blankets": Extrapillowsandblankets,
        "Fire extinguisher": Fireextinguisher,
        "Fire pit": Firepit,
        "First aid kit": Firstaidkit,
        "Free parking on premises": Freeparkingonpremises,
        "Free street parking": Freestreetparking,
        "Gym": Gym,
        "Hair dryer": Hairdryer,
        "Hangers": Hangers,
        "Heating": Heating,
        "High Chair": HighChair,
        "Host greets you": Hostgreetsyou,
        "Hot tub": Hottub,
        "Hot water": Hotwater,
        "Hot water kettle": Hotwaterkettle,
        "Iron": Iron,
        "Kitchen": Kitchen,
        "Laptop friendly workspace": Laptopfriendlyworkspace,
        "Lockbox": Lockbox,
        "Long term stays allowed": Longtermstaysallowed,
        "Microwave": Microwave,
        "Mountain view": Mountainview,
        "Oven": Oven,
        "Paid parking off premises": Paidparkingoffpremises,
        "Paid parking on premises": Paidparkingonpremises,
        "Park view": Parkview,
        "Parking": Parking,
        "Patio or balcony": Patioorbalcony,
        "Pets allowed": Petsallowed,
        "Pool": Pool,
        "Private entrance": Privateentrance,
        "Refrigerator": Refrigerator,
        "Room-darkening shades": Roomdarkeningshades,
        "Safe": Safe,
        "Security cameras": Securitycameras,
        "Self check-in": Selfcheckin,
        "Shampoo": Shampoo,
        "Single level home": Singlelevelhome,
        "Smoke detector": Smokedetector,
        "Smoking allowed": Smokingallowed,
        "Step-free access": Stepfreeaccess,
        "Stove": Stove,
        "Suitable for events": Suitableforevents,
        "Toaster": Toaster,
        "TV": TV,
        "Valley view": Valleyview,
        "Wardrobe": Wardrobe,
        "Washer": Washer,
        "Waterfront": Waterfront,
        "Wifi": Wifi,
    }

    return (
        <>
            <img src={amenityMap[amenity]} className="amenity-img" alt="amenityImg" />
        </>
    )
}