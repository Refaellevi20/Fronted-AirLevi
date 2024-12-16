import { useState } from 'react';
import Player from 'lottie-react';
import drivingAnimation from '../../animations/loading-trunk.json'
import loadingAnimation from '../../animations/driving-truck.json'
import classes from './btn-truck-animation.module.scss';

export function BtnTruckAnimation({ children, ...props }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStage, setAnimationStage] = useState('idle'); // 'idle', 'loading', 'driving'

  const handleClick = () => {
    setIsAnimating(true);
    setAnimationStage('loading');

    // Simulate the loading and driving sequence
    setTimeout(() => setAnimationStage('driving'), 3000); // Start driving after 3 seconds
    setTimeout(() => {
      setIsAnimating(false);
      setAnimationStage('idle');
    }, 6000); // Reset after 6 seconds
  };

  return (
    <div className={classes.parentContainer}>
      {isAnimating ? (
        <Player
          autoplay
          loop={animationStage === 'loading'} // Loop only for the loading animation
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
  );
}
