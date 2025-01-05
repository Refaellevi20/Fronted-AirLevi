import React from 'react'
import { SkillList } from './SkillList'

export function MyJourney() {
    return (
        <div className="my-journey-card">
            <h3>My Journey in Building the App</h3>
            <p>
                After three months of intensive training at the coding academy, I embarked on an ambitious project to build a fully functional web application from scratch. This journey was transformative and challenged me to grow both technically and personally. I learned not only the intricacies of coding but also the importance of time management and collaboration.
            </p>
            <h4>Development Process</h4>
            <p>
                I dedicated countless hours to coding, debugging, and refining my application. I designed the user interface to be intuitive and user-friendly, utilizing React for the frontend. The process involved wireframing, prototyping, and gathering feedback from peers, which significantly improved the final product.
            </p>
            <h4>Overcoming Challenges</h4>
            <p>
                I faced numerous challenges, from asynchronous programming to implementing authentication. Each obstacle taught me valuable lessons in problem-solving and persistence. For instance, debugging complex issues often required me to step back and rethink my approach, leading to more efficient solutions.
            </p>
            <h4>The Result</h4>
            <p>
                I successfully built a fully functional application featuring user authentication and a seamless booking process, enhancing the user experience. The project not only solidified my coding skills but also gave me a sense of accomplishment and confidence in my abilities as a developer.
            </p>
            <h4>What I know</h4>
            <SkillList />
            <h4>About Me</h4>
            <p>I am looking for a job as a web developer.
                my number is 0584368050 and my email is: <a href="mailto:refael14levi@gmail.com">refael14levi@gmail.com</a>
            </p>
        </div>
    )
}

