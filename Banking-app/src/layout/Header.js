import React from 'react'
import { useNavigate } from 'react-router-dom'

//CSS
import '../styles/header.css'

const Header = () => {

const navigate = useNavigate()
//FUNCTION TO NAVIGATE HOME
const handleHome = () => {
    navigate('/')
}

const handleAbout = () => {
    navigate('/about')
}

const handleFeatures = () => {
    navigate('/features')
}


const openNav = () => {
    document.getElementById("myNav").style.width = "100%";
}
const closeNav = () => {
    document.getElementById("myNav").style.width = "0%";
}

    return (
        <>
            <div className="header-main">
                <div className="logo">
                    <img src='./img/logo.png' alt="logo" />
                    <span>HARIBON DIGITAL BANK</span>
                </div>  
                <div className="nav">
                    <button onClick={handleHome} id="home">Home</button>
                    <button onClick={handleAbout} id="about">About</button>
                    <button onClick={handleFeatures} id="features">Features</button>

                </div>
                  {/* Navigation for mobile size screen */}
                <div className="topnav">
                    <div className="nav-icon">
                        <img src="./img/burger1.png" alt="icon-burger" onClick={openNav}/>
                    </div>

                    {/* OVERLAY NAV */}
                    <div id="myNav" className="overlay">
                        {/* <a href="#" className="closebtn" onClick={closeNav}>&times;</a> */}
                            <button className="closebtn" onClick={closeNav}>&times;</button>
                        <div className="overlay-content">
                            {/* <a href="#" onClick={handleHome}>Home</a>
                            <a href="#" onClick={handleAbout}>About</a>
                            <a href="#" onClick={handleFeatures}>Features</a>  */}
                            <button onClick={handleHome}>Home</button>
                            <button onClick={handleAbout}>About</button>
                            <button onClick={handleFeatures}>Features</button> 

                    
                        </div>  
                    </div>
                </div>
            </div>

        </>
    
    )
}

export default Header
