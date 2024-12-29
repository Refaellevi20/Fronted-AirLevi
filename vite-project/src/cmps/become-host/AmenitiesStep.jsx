import { useState } from 'react'
import {
    FaWifi, FaTv, FaParking, FaSwimmingPool, FaHotTub,  FaDumbbell,
    FaBabyCarriage, FaWheelchair, FaSnowflake, FaDesktop, FaSun, FaUmbrella,
    FaKey, FaChair, FaWind, FaWater
} from 'react-icons/fa'
import {
    MdKitchen, MdPets, MdSecurity,
    MdWorkspaces, MdLocalLaundryService, MdBalcony, MdOutdoorGrill,
    MdElevator, MdMicrowave, MdCoffeeMaker, MdBeachAccess, MdChildCare, MdCleaningServices
} from 'react-icons/md'
import {
     
    GiThermometerHot, GiTowel, GiWashingMachine
} from 'react-icons/gi'
import { TbAirConditioning, TbIroning } from 'react-icons/tb'

export function AmenitiesStep({ stayData, setStayData }) {
    const [selectedAmenities, setSelectedAmenities] = useState(stayData.amenities || [])

    const amenityCategories = [
        {
            title: 'Popular',
            items: [
                { id: 'Wifi', label: 'Wifi', icon: <FaWifi /> },
                { id: 'TV', label: 'TV', icon: <FaTv /> },
                { id: 'Kitchen', label: 'Kitchen', icon: <MdKitchen /> },
                { id: 'Washer', label: 'Washer', icon: <MdLocalLaundryService /> },
                { id: 'Free parking', label: 'Free parking', icon: <FaParking /> },
                { id: 'Air conditioning', label: 'Air conditioning', icon: <TbAirConditioning /> },
                { id: 'Workspace', label: 'Workspace', icon: <MdWorkspaces /> },
                { id: 'Pool', label: 'Pool', icon: <FaSwimmingPool /> }
            ]
        },
        {
            title: 'Standout amenities',
            items: [
                { id: 'Hot tub', label: 'Hot tub', icon: <FaHotTub /> },
                { id: 'Balcony', label: 'Balcony', icon: <MdBalcony /> },
                { id: 'BBQ grill', label: 'BBQ grill', icon: <MdOutdoorGrill /> },
               
                { id: 'Exercise equipment', label: 'Exercise equipment', icon: <FaDumbbell /> }
            ]
        },
        {
            title: 'Interior',
            items: [
                { id: 'Heating', label: 'Heating', icon: <GiThermometerHot /> },
                { id: 'Ceiling fan', label: 'Ceiling fan', icon: <FaWind /> },
                { id: 'Iron', label: 'Iron', icon: <TbIroning /> },
            ]
        },
        {
            title: 'Family',
            items: [
                { id: 'Crib', label: 'Crib', icon: <FaBabyCarriage /> },
                { id: 'High chair', label: 'High chair', icon: <FaChair /> },
                { id: 'Children\'s toys', label: 'Children\'s toys', icon: <MdChildCare /> },
                { id: 'Babysitter services', label: 'Babysitter services', icon: <MdChildCare /> }
            ]
        },
        {
            title: 'Location features',
            items: [
                { id: 'Beachfront', label: 'Beachfront', icon: <MdBeachAccess /> },
                { id: 'Waterfront', label: 'Waterfront', icon: <FaWater /> },
                { id: 'Ski-in/Ski-out', label: 'Ski-in/Ski-out', icon: <FaSnowflake /> },
                { id: 'Mountain view', label: 'Mountain view', icon: <FaSun /> }
            ]
        },
        {
            title: 'Safety features',
            items: [
                { id: 'Fire extinguisher', label: 'Fire extinguisher', icon: <GiTowel /> },
                { id: 'CCTV cameras', label: 'CCTV cameras', icon: <MdSecurity /> }
            ]
        }
    ]

    const toggleAmenity = (amenityId) => {
        const updatedAmenities = selectedAmenities.includes(amenityId)
            ? selectedAmenities.filter(id => id !== amenityId)
            : [...selectedAmenities, amenityId]

        setStayData({
            ...stayData,
            amenities: updatedAmenities
        })
        setSelectedAmenities(updatedAmenities)
    }

    return (
        <div className="amenities-step">
            <div className="amenities-container">
                <h2>Let guests know what your place offers</h2>
                <p>You can add more amenities after you publish your listing.</p>

                {amenityCategories.map((category) => (
                    <div key={category.title} className="amenity-category">
                        <h3>{category.title}</h3>
                        <div className="amenities-grid">
                            {category.items.map((amenity) => (
                                <button
                                    key={amenity.id}
                                    className={`amenity-item ${selectedAmenities.includes(amenity.id) ? 'selected' : ''}`}
                                    onClick={() => toggleAmenity(amenity.id)}
                                    type="button"
                                >
                                    <div className="amenity-icon">
                                        {amenity.icon}
                                    </div>
                                    <div className="amenity-label">
                                        {amenity.label}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
