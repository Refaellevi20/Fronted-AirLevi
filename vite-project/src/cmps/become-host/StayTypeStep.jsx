import { useState } from 'react'
import {
    FaHome, FaBuilding, FaHotel, FaWarehouse,
    FaCampground, FaUmbrellaBeach, FaTree
} from 'react-icons/fa'
import { MdApartment, MdCabin, MdHouseboat } from 'react-icons/md'
import { GiWindmill, GiCaveEntrance, GiFarmTractor } from 'react-icons/gi'
import { BsHouseDoor } from 'react-icons/bs'

export function StayTypeStep({ stayData, setStayData }) {
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedType, setSelectedType] = useState(stayData.propertyType || '')

    const propertyCategories = [
        {
            id: 'house',
            title: 'House',
            icon: <FaHome />,
            types: [
                { id: 'house', label: 'House' },
                { id: 'cottage', label: 'Cottage' },
                { id: 'villa', label: 'Villa' },
                { id: 'townhouse', label: 'Townhouse' }
            ]
        },
        {
            id: 'apartment',
            title: 'Apartment',
            icon: <MdApartment />,
            types: [
                { id: 'apartment', label: 'Apartment' },
                { id: 'condo', label: 'Condo' },
                { id: 'loft', label: 'Loft' },
                { id: 'serviced-apartment', label: 'Serviced apartment' }
            ]
        },
        {
            id: 'unique',
            title: 'Unique stays',
            icon: <GiWindmill />,
            types: [
                { id: 'treehouse', label: 'Treehouse' },
                { id: 'cabin', label: 'Cabin' },
                { id: 'boat', label: 'Boat' },
                { id: 'dome', label: 'Dome' },
                { id: 'windmill', label: 'Windmill' },
                { id: 'cave', label: 'Cave' }
            ]
        },
        {
            id: 'bnb',
            title: 'B&B',
            icon: <BsHouseDoor />,
            types: [
                { id: 'bnb', label: 'Bed & breakfast' },
                { id: 'boutique-hotel', label: 'Boutique hotel' },
                { id: 'guesthouse', label: 'Guesthouse' }
            ]
        }
    ]

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId)
    }

    const handleTypeSelect = (typeId) => {
        setSelectedType(typeId)
        setStayData({
            ...stayData,
            propertyType: typeId
        })
    }

    return (
        <div className="stay-type-step">
            <div className="stay-type-container">
                <h2>Which of these best describes your place?</h2>
                <p>Pick a category</p>

                <div className="categories-grid">
                    {propertyCategories.map((category) => (
                        <button
                            key={category.id}
                            className={`category-item ${selectedCategory === category.id ? 'selected' : ''}`}
                            onClick={() => handleCategorySelect(category.id)}
                        >
                            <div className="category-icon">
                                {category.icon}
                            </div>
                            <span>{category.title}</span>
                        </button>
                    ))}
                </div>

                {selectedCategory && (
                    <div className="property-types-container">
                        <h3>Property type</h3>
                        <div className="types-grid">
                            {propertyCategories
                                .find(cat => cat.id === selectedCategory)
                                ?.types.map((type) => (
                                    <button
                                        key={type.id}
                                        className={`type-item ${selectedType === type.id ? 'selected' : ''}`}
                                        onClick={() => handleTypeSelect(type.id)}
                                    >
                                        <span className="type-label">{type.label}</span>
                                    </button>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}