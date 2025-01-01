import React, { useEffect, useState } from 'react';
import { FaThumbsUp } from "react-icons/fa";
import { AppLogo } from '../cmps/app-logo';
import { NavMenu } from './nav-menu';
import { GradientFlash } from '../cmps/GradientFlash'
import { userService } from '../services/user.service'
import { UserCounts } from '../cmps/UserCounts';
import { Hidden } from '@mui/material';
import { showSuccessMsg } from '../services/event-bus.service';
import { MyJourney } from '../cmps/MyJourney';

export function AboutMe() {
    const [count, setCount] = useState(10)
    const [hasCounted, setHasCounted] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [animationClass, setAnimationClass] = useState('')
    const [totalCount, setTotalCount] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    // useEffect(() => {
    //     async function fetchTotalCount() {
    //         const count = await getTotalCount()
    //         setTotalCount(count)
    //     }
    //     fetchTotalCount()
    // }, [])

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

    useEffect(() => {
        const loggedInUser = userService.getLoggedinUser();
        if (loggedInUser) {
            setCount(Number(loggedInUser.count) || 0)
        }
    }, [])

    useEffect(() => {
        const loggedInUser = userService.getLoggedinUser()
        if (loggedInUser) {
            const userCounted = sessionStorage.getItem(`counted_${loggedInUser._id}`);
            if (userCounted) {
                setHasCounted(true)
            } else {
                setHasCounted(false)
            }
        }
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 5000)

        return () => clearTimeout(timer)
    }, [])

    async function handleCountClick() {
        const loggedInUser = userService.getLoggedinUser()

        if (!loggedInUser) {
            showSuccessMsg('You need to log in to like!')
            return
        }

        if (hasCounted) {
            showSuccessMsg('You already like! You cannot like again. Thank you!')
            return
        }

        setCount(count + 1)
        setAnimationClass('animate__bounce animate__animated')
        setTimeout(() => {
            setAnimationClass('')
        }, 1000)

        sessionStorage.setItem(`counted_${loggedInUser._id}`, 'true')
        setHasCounted(true)

        try {
            await userService.updateUserCount(loggedInUser._id)
        } catch (error) {
            console.error('Failed to update user count:', error)
        }
    }

    // async function getTotalCount() {
    //     try {
    //         const users = await userService.getAllUsers()
    //         const totalCount = users.reduce((acc, user) => acc + user.count, 0)
    //         console.log('Total count of all users:', totalCount)
    //         return totalCount
    //     } catch (error) {
    //         console.error('Failed to get total count:', error)
    //         return 0
    //     }
    // }

    return (
        <section>
            <header className='app-header header-container flex main-layout'>
                <div className='header-logo-container'>
                    <AppLogo />
                </div>
                <div className='spacer'></div>
                <div className='header-menu-container'>
                    <NavMenu />
                </div>
            </header>
            <div className="about-me__container">

                <div className={`details-section`}>
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
                    <p>0584368050</p>
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
                            {/* {totalCount} */}
                            {/* <UserCounts />  */}
                        </button>
                        {/* <div className={`border-animation ${isVisible ? '' : 'hidden'}`}></div> */}
                    </div>
                </div>
                {/* <div> */}
                <MyJourney />
                {/* </div> */}
            </div>
            {/* <GradientFlash /> */}
        </section>
    )
}
