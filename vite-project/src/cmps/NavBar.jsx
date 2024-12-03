import { useEffect, useRef, useState } from "react"
import { filterService } from "../services/filter.service"

export function NavBar() {
    const categories = filterService.getPopularCategories()
    const types = filterService.getTypes()
    // const [selectedType, setSelectedType] = useState(null)
    // const [location, setLocation] = useState({})
    const categoryListRef = useRef(null)
    const [selectedCategory, setSelectedCategory] = useState(null)

    function onSelectCategory(categoryUrl) {
        setSelectedCategory(categoryUrl)
    }

    function scrollLeft() {
        if (categoryListRef.current) {
            const scrollDistance = calculateScrollDistance()
            categoryListRef.current.scrollLeft -= scrollDistance
        }
    }

    function scrollRight() {
        if (categoryListRef.current) {
            const scrollDistance = calculateScrollDistance()
            categoryListRef.current.scrollLeft += scrollDistance
        }
    }

    function calculateScrollDistance() {
        if (!categoryListRef.current) return 400 //* default

        const containerWidth = categoryListRef.current.offsetWidth
        const totalCategories = categories.length
        const scrollDistance = containerWidth / totalCategories*50

        return scrollDistance
    }
    const LeftNavIcon = (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '24px',
                height: '24px',
                border: '1px solid rgb(0 0 0 / 0.3)',
                borderRadius: '50%',
                backgroundColor: 'white',
                zIndex: '5',
                cursor: "pointer",
            }}
            onClick={scrollLeft}
        >
            <svg
                viewBox="0 0 18 18"
                role="img"
                aria-label="Previous"
                focusable="false"
                style={{
                    width: '12px',
                    height: '12px',
                    fill: 'currentcolor',
                    cursor: 'pointer',
                }}
            >
                <path
                    d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"
                    fillRule="evenodd"
                ></path>
            </svg>
        </div>
    )

    const RightNavIcon = (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '24px',
                height: '24px',
                border: '1px solid rgb(0 0 0 / 0.3)',
                borderRadius: '50%',
                backgroundColor: 'white',
                zIndex: '5',
                cursor: "pointer",
            }}
            onClick={scrollRight}
        >
            <svg
                viewBox="0 0 18 18"
                role="img"
                aria-label="Next"
                focusable="false"
                style={{
                    width: '12px',
                    height: '12px',
                    fill: "currentcolor",
                    cursor: "pointer",
                }}
            >
                <path
                    d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"
                    fillRule="evenodd"
                ></path>
            </svg>
        </div>

    )

    return (
        <section className="flex sss main-layout">
            <span className="left-icon__list ">{LeftNavIcon}</span>
            <section className="category-list main-layout" ref={categoryListRef}>
                {categories.map((category) => (
                    <div
                        key={category.url}

                        className={`category-item ${category.url === selectedCategory ? 'selected' : ''}`}
                        onClick={() => onSelectCategory(category.url)}>
                        <img className="icon24  clr-secondary text-grey" src={`/img/categories/${category.url}.png`} alt={category.name} />
                        <p className="category-name fs12">{category.name}</p>

                    </div>
                ))}
            </section>
                <span className="right-icon__list">{RightNavIcon}</span>
        </section>
    )
}