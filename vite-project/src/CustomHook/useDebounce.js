import { useEffect, useState } from 'react'
import { debounce } from 'lodash' 

const YourComponent = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowWidth(window.innerWidth)
    }, 100) 

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    console.log('Window width updated:', windowWidth)
  }, [windowWidth])

  return (
    <div>
      <p>Current Window Width: {windowWidth}px</p>
    </div>
  )
}

export default YourComponent
