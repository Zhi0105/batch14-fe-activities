import React from 'react'

//COMPONENT
import Header from '../layout/Header'
import Footer from '../layout/Footer'

// import featureImage from '../img/login_attempt_feature_preview.gif'


const Features = () => {
    return (
        <>
            <div className="feature-header">< Header /></div>
            <div className="features-main">

                <div className="featDesc">
                    <h3>Login Attempt Feature 🕘</h3><br></br>
                    This feature adds a security component when a user fails to login thrice by means of delaying  the login attempt for 30 seconds.
                </div>

                <img className="featureImage" src="./img/features-img.gif" alt="featureImage"/>
            </div>
                <br></br><br></br><br></br><br></br><br></br>

            <div className="feature-footer">< Footer /></div>
        </>
    )
}

export default Features
