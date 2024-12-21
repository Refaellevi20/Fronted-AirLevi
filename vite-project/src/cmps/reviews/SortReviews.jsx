import React from 'react'

function SortReviews({ setFilteredReviews, reviews }) {
    const handleSortChange = (event) => {
        const sortOption = event.target.value
        let sortedReviews = [...reviews]


        switch (sortOption) {
            case 'mostRecent':
                sortedReviews = sortedReviews.sort((a, b) => b.createAt - a.createAt)
                break
            case 'highestRated':
                sortedReviews = sortedReviews.sort((a, b) =>
                    b.rate.cleanliness + b.rate.communication + b.rate['check-in'] + b.rate.accuracy + b.rate.location + b.rate.value -
                    (a.rate.cleanliness + a.rate.communication + a.rate['check-in'] + a.rate.accuracy + a.rate.location + a.rate.value)
                )
                break
            case 'lowestRated':
                sortedReviews = sortedReviews.sort((a, b) =>
                    (a.rate.cleanliness + a.rate.communication + a.rate['check-in'] + a.rate.accuracy + a.rate.location + a.rate.value) -
                    (b.rate.cleanliness + b.rate.communication + b.rate['check-in'] + b.rate.accuracy + b.rate.location + b.rate.value)
                )
                break
            default:
                break
        }

        setFilteredReviews(sortedReviews)
    }

    return (
        <section style={{padding:'20px 0', cursor:'pointer'}}>
        <div className="select-wrapper">
          <select id="sortReviews" className="sortReviews" onChange={handleSortChange}>
            <option className='pointer mostRecent sortSelected' value="mostRecent">
              <span className='sortSelected'>Most Recent</span>
            </option>
            <option className='pointer highestRated sortSelected' value="highestRated">Highest Rated</option>
            <option className='pointer lowestRated sortSelected' value="lowestRated">Lowest Rated</option>
          </select>
        </div>
      </section>
    )
}

export default SortReviews
