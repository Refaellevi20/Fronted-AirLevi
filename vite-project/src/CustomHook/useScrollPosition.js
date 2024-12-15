import { useEffect, useState } from "react"

export function useScrollPosition(scrollThreshold = 500) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    };

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrollThreshold])

  return scrolled
}
