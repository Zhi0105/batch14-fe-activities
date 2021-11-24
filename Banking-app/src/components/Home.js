import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {

    const navigate  = useNavigate()

    let storedUser = JSON.parse(localStorage.getItem('userRecord'))
    
    //FUNCTION NAVIGATE TO REGISTER PAGE
    const handleRegister = () => {
        navigate('/register')
    }

    //FUNCTION HANDLES LOGIN PROCESS
    const handleLogin = () => {

        let username = document.querySelector(`.username`).value
        let password = document.querySelector(`.password`).value
        let admin = 'Admin'

            if (username === "" || password === ""){
                alert(`Please complete your login credentail!`)
            }

            else if(    
                (username === admin || username === admin.toLowerCase() || username === admin.toUpperCase()) &&
                (password === admin || password === admin.toLowerCase() || password === admin.toUpperCase())
                
            ){  
                alert(`Logged as administrator!`)
                navigate('/admin')  
            }

            else if(storedUser){
                let ifLoginSuccess = 0

                storedUser.forEach(i => {
                    if(i.email === username && i.password === password){
                        ifLoginSuccess+=1
                    }
                })

                if(ifLoginSuccess === 1){
                    alert(`Login Successful!`)
                    navigate('/user')
                    
                } else {
                    alert(`User not found!`)
                }
            } 
            else {
                alert(`User not found!`)
            }
        

        
    }

    return(
        <div className="home-main">
            <div className="container">
                <form>
                    <input type="text"  className="username" id="username" autoComplete="off" placeholder="username"/>
                    <input type="password"  className="password" id="password" autoComplete="off" placeholder="password"/>
                </form>
                
                <button id="btn-login" onClick={handleLogin}>Login</button>
                <button id="btn-register" onClick={handleRegister}>Sign up</button>
            </div>
        </div>
    )
}

export default Home