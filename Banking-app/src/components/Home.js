import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {

    //FUNCTION NAVIGATE TO REGISTER PAGE
    const navigate  = useNavigate()
    const handleRegister = () => {
        navigate('/register')
    }

    return(
        <div className="home-main">
            <div className="container">
                <input type="text"  className="username" id="username" placeholder="username"/>
                <input type="text"  className="password" id="password" placeholder="password"/>
                <button id="btn-login">Login</button>
                <button id="btn-register" onClick={handleRegister}>Sign up</button>
            </div>
        </div>
    )
}

export default Home