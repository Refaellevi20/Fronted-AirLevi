import { useState } from 'react';
import Player from 'lottie-react';
import drivingAnimation from '../../animations/loading-trunk.json'
import loadingAnimation from '../../animations/driving-truck.json'
import classes from './btn-truck-animation.module.scss'

export function BtnTruckAnimation({ children, ...props }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationStage, setAnimationStage] = useState('idle')

  function handleClick(){
    setIsAnimating(true)
    setAnimationStage('loading')

    setTimeout(() => setAnimationStage('driving'), 3000)
    setTimeout(() => {
      setIsAnimating(false)
      setAnimationStage('idle')
    }, 6000)
  }

  return (
    <div className={classes.parentContainer}>
      {isAnimating ? (
        <Player
          autoplay
          loop={animationStage === 'loading'} 
          src={animationStage === 'loading' ? loadingAnimation : drivingAnimation}
          style={{ height: '300px', width: '300px' }}
        />
      ) : (
        <button
          {...props}
          onClick={handleClick}
          className={`${classes.btnTruckAnimation} pointer`}
        >
          {children || 'Load Truck'}
        </button>
      )}
    </div>
  )
}
