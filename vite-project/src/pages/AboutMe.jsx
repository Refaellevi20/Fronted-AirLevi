import React, { useState } from 'react';
import { FaThumbsUp } from "react-icons/fa";
import { AppLogo } from '../cmps/app-logo';
import { NavMenu } from './nav-menu';
import { GradientFlash } from '../cmps/GradientFlash'

export function AboutMe() {
    const [count, setCount] = useState(10)
    const [clicked, setClicked] = useState(false)
    const [animationClass, setAnimationClass] = useState('')

    const userDetails = {
        name: 'Refael Levi',
        age: 19,
        picture: '/AboutMe.png',
        hobbies: ['Coding💗', 'surfing', 'Traveling', 'MMA'],
        bio: 'A passionate learner and developer who loves exploring new technologies.',
        contact: 'refael14levi@gmail.com',
        projectDetails: 'This project was built using React.js and a little bit type script and SCSS for styling. It showcases an interactive and dynamic personal profile.',
        github: 'https://github.com/Refaellevi20',
        Instagram: 'https://www.instagram.com/raf.levi9/?igsh=MThjY2twMWhuNzB5MQ%3D%3D',
    }
//! maybe later to the database
    function handleCountClick() { 
        setCount(count + 1)
        setAnimationClass('animate__bounce animate__animated')
        setTimeout(() => {
            setAnimationClass('')
        }, 1000)
    }

    return (
        <section>
            <header className='app-header header-container flex'>
                <div className='header-logo-container'>
                    <AppLogo />
                </div>
                <div className='spacer'></div>
                <div className='header-menu-container'>
                    <NavMenu />
                </div>
            </header>
            <div className="about-me__container">

                <div className="details-section">
                    <h1 className="user-name">{userDetails.name}</h1>
                    <p className="user-age">Age: {userDetails.age}</p>
                    <p className="user-bio">{userDetails.bio}</p>

                    <h3>Hobbies:</h3>
                    <div className='flex'>
                        <ul className="hobbies-list">
                            {userDetails.hobbies.map((hobby, idx) => (
                                <li key={idx}>{hobby}</li>
                            ))}
                        </ul>
                        <div className="image-section">
                            <a href={userDetails.github} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={userDetails.picture}
                                    alt={`${userDetails.name}'s picture`}
                                    className="user-picture"
                                />
                            </a>
                        </div>
                    </div>
                    <h3>Contact:</h3>
                    <p className="contact-info">{userDetails.contact}</p>

                    <h3>Project Details:</h3>
                    <p className="project-details">{userDetails.projectDetails}</p>

                    <div className="social-links">
                        <a href={userDetails.github} target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
                        <a href={userDetails.Instagram} target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
                    </div>
                    <div className="counter-section ">
                        <button
                            onClick={handleCountClick}
                            className={`counter-button ${animationClass}`}
                            style={{ cursor: 'pointer' }}
                        >
                            <FaThumbsUp /> {count}

                        </button>
                    </div>
                </div>
            </div>
            <GradientFlash />
        </section>
    )
}
