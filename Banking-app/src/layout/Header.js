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



    return (
        <>
            <div className="header-main">
                <div className="logo">
                    <img src='./img/logo.png' alt="logo" />
                </div>  
                <div className="nav">
                    <button onClick={handleHome}>Home</button>
                    <button onClick={handleAbout}>About</button>
                    <button onClick={handleFeatures}>Features</button>
                </div>
                  {/* Navigation for mobile size screen */}
            <div className="topnav">
                
            </div>
            </div>
        </>
    
    )
}

export default Header
