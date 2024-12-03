import { useEffect, useState } from "react"
import { filterService } from "../services/filter.service"

export function NavBar() {
    const categories = filterService.getPopularCategories();
    const types = filterService.getTypes()
    const [selectedType, setSelectedType] = useState(null)
    const [location, setLocation] = useState({})
    const [selectedCategory, setSelectedCategory] = useState(null)

    function onSelectCategory(categoryUrl) {
        setSelectedCategory(categoryUrl)
    }

    function onSelectType(type) {
        setSelectedType(type)
    }

    useEffect(() => { //! maybe by locations not sure
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            },
            (error) => {
                console.log(error)
            }
        )
    }, [])

    return (
        <section className="category-list">
            {categories.map((category) => (
                <div
                    key={category.url}
                    className={`category-item ${category.url === selectedCategory ? 'selected' : ''}`}
                    onClick={() => onSelectCategory(category.url)}>
                    <img className="icon24 clr-secondary" src={`/img/categories/${category.url}.png`} alt={category.name} />
                    <p className="category-name">{category.name}</p>
                </div>
            ))}
        </section>
    )
}