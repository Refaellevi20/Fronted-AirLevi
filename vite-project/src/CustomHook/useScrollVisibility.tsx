// import { useState, useEffect } from 'react'

// export function useScrollVisibility(threshold = 50) {
//   const [isVisible, setIsVisible] = useState(true)
//   const [lastScrollY, setLastScrollY] = useState(0)

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > lastScrollY && window.scrollY > threshold) {
//         setIsVisible(false)
//       } else {
//         setIsVisible(true)
//       }
//       setLastScrollY(window.scrollY)
//     }

//     window.addEventListener('scroll', handleScroll)
//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//     }
//   }, [lastScrollY, threshold])

//   return isVisible
// }

import { useState, useEffect } from 'react'

export function useScrollVisibility(threshold: number = 50): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [lastScrollY, setLastScrollY] = useState<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > threshold) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY, threshold])

  return isVisible
}