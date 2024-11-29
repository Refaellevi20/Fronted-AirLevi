import { Children, useEffect, useRef } from 'react'
import { cloneElement } from 'react'
import { useState } from 'react'
import classes from './slider.module.css'
import { useWindowSize } from '../../services/useWindowSize'

const LeftNavIcon = (
  <svg
    viewBox='0 0 18 18'
    role='img'
    aria-label='Previous'
    focusable='false'
    style={{
      height: '10px',
      width: '10px',
      display: 'block',
      fill: 'currentcolor',
    }}>
    <path
      d='m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z'
      fillRule='evenodd'></path>
  </svg>
)

const RightNavIcon = (
  <svg
    viewBox='0 0 18 18'
    role='img'
    aria-label='Next'
    focusable='false'
    style={{
      height: '10px',
      width: '10px',
      display: 'block',
      fill: 'currentcolor',
    }}>
    <path
      d='m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z'
      fillRule='evenodd'></path>
  </svg>
)

export function Slider({ children }) {
  const [page, setPage] = useState([])
  const [isAnimation, setIsAnimation] = useState(false)
  const [currPage, setCurrPage] = useState(0)
  const [winWidth, setWinWidth] = useState(0)
  const screenSize = useWindowSize()
  let containerEl = useRef()
  const leftNavRef = useRef()
  const rightNavRef = useRef()

  useEffect(() => {
    setWinWidth(containerEl.current.offsetWidth)

    setPage(
      Children.map(children, (child) => {
        return cloneElement(child, {
          style: {
            maxWidth: `100%`,
            minWidth: `100%`,
            height: `100%`,
          },
        })
      })
    )
  }, [children, screenSize])

  useEffect(() => {
    // correct offset
    setOffset((prev) => {
      const winWidth = containerEl.current.parentNode.offsetWidth
      const currItemIndex = Math.round(prev / winWidth)
      const correctContainerOffset = winWidth * currItemIndex

      return correctContainerOffset
    })
  }, [screenSize])

  // current offset
  const [offset, setOffset] = useState(0)

  function prevItems(ev) {
    ev.stopPropagation()
    setIsAnimation(true)
    setTimeout(() => {
      setIsAnimation(false)
    }, 500)

    rightNavRef.current.classList.remove(classes.hidden)

    setOffset((prev) => {
      if (prev + winWidth === 0) 
        leftNavRef.current.classList.add(classes.hidden)
      else leftNavRef.current.classList.remove(classes.hidden)

      const currItemIndex = Math.abs(
        Math.round(Math.min(prev + winWidth, 0) / winWidth)
      )
      setCurrPage(currItemIndex)
      return Math.min(prev + winWidth, 0)
    })
  }

  function nextItems(ev) {
    ev.stopPropagation()
    setIsAnimation(true)
    setTimeout(() => {
      setIsAnimation(false)
    }, 500)

    leftNavRef.current.classList.remove(classes.hidden)
    const maxOffset = -(winWidth * (children.length - 1))

    setOffset((prev) => {
      if (prev - winWidth === maxOffset)
        rightNavRef.current.classList.add(classes.hidden)
      else rightNavRef.current.classList.remove(classes.hidden)

      const currItemIndex = Math.abs(
        Math.round(Math.max(prev - winWidth, maxOffset) / winWidth)
      )
      setCurrPage(currItemIndex)
      return Math.max(prev - winWidth, maxOffset)
    })
  }

  const Pagination = (data, currPage) => {
    if (!data.length) return
    return (
      page && (
        <div className='slider-dots flex align-center'>
          {data.map((item, index) => (
            <span
              key={index}
              style={
                currPage === index
                  ? { color: 'white' }
                  : { color: '#ffffffb3' }
              }>
              {'•'}
            </span>
          ))}
        </div>
      )
    )
  }

  return (
    <div className={`${classes.carousel} slider-btns`}>
      {/* navigation */}

      <span
        ref={leftNavRef}
        onClick={prevItems}
        className={`slider-btn ${classes.hidden} ${classes.navIconLeft} ${classes.navIcon} `}>
        {LeftNavIcon}
      </span>

      <span
        ref={rightNavRef}
        onClick={nextItems}
        className={`slider-btn ${classes.navIconRight} ${classes.navIcon}`}>
        {RightNavIcon}
      </span>

      {Pagination(page, currPage)}

      <div className={classes.carouselWindow}>
        {/* items */}
        {!isAnimation && page[currPage]}

        <div
          ref={containerEl}
          style={{ transform: `translateX(${offset}px)` }}
          className={classes.carouselContainer}>
          {page}
        </div>
      </div>
    </div>
  )
}
