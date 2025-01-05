import { useState, useEffect, useRef } from 'react'

export function ScrollButton() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isAtBottom, setIsAtBottom] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY
      const progress = (scrollPosition / totalHeight) * 100

      setScrollProgress(progress)

      const isBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 1
      setIsAtBottom(isBottom)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function handleScrollClick() {
    if (isAtBottom) {
      // Scroll up when at the bottom
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Scroll down to the bottom when not at the bottom
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleScrollClick}
      className="scroll-button__container"
      style={{
        position: 'fixed',
        bottom: '70px',
        right: '50%',
        padding: '10px 20px',
        fontSize: '16px',
        // backgroundColor: isAtBottom ? '#fff' : '#000',
        // color: isAtBottom ? '#000' : '#fff', 
        // border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        width: '60px',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '20px',
      }}
    >
      <div
        className="progress-ring"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '8px solid transparent',
          borderTop: '8px solid',
          borderTopColor: isAtBottom ? '#000' : '#fff', 
          animation: 'rotate 1.5s linear infinite',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={isAtBottom ? '#000' : '#fff'} 
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={isAtBottom ? '#fff' : '#000'} 
            strokeWidth="10"
            fill="none"
            strokeDasharray="282.743" 
            strokeDashoffset={(282.743 * (100 - scrollProgress)) / 100} 
            style={{
              transition: 'stroke-dashoffset 0.2s ease-out',
            }}
          />
        </svg>
      </div>
      <span
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {isAtBottom ? '↑' : '↓'}
      </span>
    </button>
  )
}