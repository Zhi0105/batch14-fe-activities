import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {

    const navigate  = useNavigate()
    let [attempt, loginAttempt] = useState(2)
    let [count, setCount] = useState(30)
                    
    
        
    let storedUser = JSON.parse(localStorage.getItem('userRecord'))
    
    //FUNCTION NAVIGATE TO REGISTER PAGE
    const handleRegister = () => {
        navigate('/register')
    }

    //FUNCTION HANDLES LOGIN PROCESS
    const handleLogin = (e) => {
        e.preventDefault()
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
                    loginAttempt(attempt - 1)
                    // console.log(attempt,count)
                                    
                        if(attempt === 0){
                            document.querySelector(`.modal`).style.display = 'block'
                            let countdown =  setInterval(() => {
                                        count -= 1
                                        setCount(count)
                                        if(count < 0){
                                            clearInterval(countdown)
                                            loginAttempt(attempt = 2)
                                            // console.log(count, attempt)
                                            document.querySelector(`.modal`).style.display = 'none'
                                            setCount(count + 31)
                                        }
                            }, 1000)
                        }
                }
            } 
        
    }

    // return(
    //     <div className="home-main">
    //         <div className="container">
    //             <form>
    //                 <input type="text"  className="username" id="username" autoComplete="off" placeholder="email"/>
    //                 <input type="password"  className="password" id="password" autoComplete="off" placeholder="password"/>
    //             </form>
                
    //             <button id="btn-login" onClick={handleLogin}>Login</button>
    //             <button id="btn-register" onClick={handleRegister}>Sign up</button>
    //         </div>
    //     </div>
    // )


    return(
        <div className="home-main">
            <div className="login-container">
                <form className="login-form" id="login-form">
                    <span className="hand-waving-animated-emoji">👋</span>
                    <h2 className="greetings-home-page-text">great to see you again! </h2>
                    <h3 className="login-to-your-account-text">login to your account</h3>

                    <div className="login-form-row">
                        <input type="text" className="username" id="username" placeholder="your@email.com"/>
                        <input type="password" className="password" id="password" placeholder="password" />
                        
                        <button id="btn-login" className="btn-login" onClick={handleLogin}>
                            <span className="hover-underline-animation">login</span>
                            <svg id="arrow-horizontal" xmlns="http://www.w3.org/2000/svg" width="25" height="10" viewBox="0 0 46 16" fill="#f3c568">
                                <path id="Path_10" data-name="Path 10" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" transform="translate(30)"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="signup-container">
                        <h4 className="dont-have-account-text">don't have an account yet?</h4>
                        <button id="btn-register" className="btn-register" onClick={handleRegister}>register 🦅</button>
                    </div>
                </form>
            </div>

            {/* <!-- The Modal --> */}
            <div id="myModal" className="modal">
            {/* <!-- Modal content --> */}
            <div className="modal-content">
                <p>Login attempts reached, you won't be able to login for a while.</p><br></br>
                <span className="timer">{count}</span>
            </div>
            </div>

        </div>

    )

}

export default Home


