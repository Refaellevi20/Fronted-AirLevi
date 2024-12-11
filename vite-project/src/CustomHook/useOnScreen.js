import { useEffect, useState } from "react"

//CUSTOM HOOK: useOnScreen
//This hook is used to detect if an element is in the viewport

// ref: the ref of the element to be observed
// rootMargin: the margin around the viewport to be observed
// returns: a boolean value indicating if the element is in the viewport

//* The useOnScreen hook uses the Intersection Observer API to detect
//* when an element enters or exits the viewport.
//* It updates the isVisible state based on visibility changes.
//*  The hook allows for an optional rootMargin to customize the detection area.
//*  It's useful for lazy loading or triggering actions when an element comes into view.

export default function useOnScreen(ref, rootMargin = "0px" ) {
  const [isVisible, setIsVisible] = useState(true)


  useEffect(() => {
    if (ref.current == null) {
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin }
    )
    observer.observe(ref.current)
    return () => {
      if (ref.current == null) return
      observer.unobserve(ref.current)
    }
  }, [rootMargin,ref, ref.current])

  return isVisible
}