import React from 'react'

//COMPONENT
import Header from '../layout/Header'
import Footer from '../layout/Footer'

const About = () => {


    
    return (
        <>
            {/* HEADER */}
            <div className="about-header">< Header /></div> 

                    {/* ABOUT PAGE CONTAINER */}
                    <div className="aboutPage">

                        {/* IMAGE FOR ABOUT PAGE */}
                        <img className="aboutImage" src="./img/bank.png" alt="black-credit-card"/>

                        {/* VISION AND MISSION CONTAINER */}
                        <div className="about-main">

                            {/* VISION CONTAINER */}
                            <div className="vision-section">
                            <h1 className="vision-header">Vision</h1>
                                <p className="vision-statement">To be the clients’ best choice through offering an integrated and distinctive bundle of digital banking services.</p>
                            </div>

                            {/* MISSION CONTAINER */}
                            <div className="mission-section">
                            <h1 className="mission-header">Mission</h1>
                                <p className="mission-statement">To provide advanced and creative digital banking products and services for all our clients, both locally and internationally, through a successful team and using advanced programs, techniques and tools that keep up with the advancements in today’s world, in an effort to fulfill the aspirations of our clients, shareholders and employees,  and to reflect our values of social responsibility</p>
                            </div>
                        </div>
                    </div>
                <div className="about-footer">< Footer /></div>

                
                        
        
        </>
    )
}

export default About
