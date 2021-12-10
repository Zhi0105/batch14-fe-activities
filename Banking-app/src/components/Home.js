import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

//COMPONENT
import Header from '../layout/Header' // HEADER
import Footer from '../layout/Footer' // FOOTER


const Home = () => {


    //INITIALIZATION OF VARIABLE START
    const navigate  = useNavigate()
    let [attempt, loginAttempt] = useState(2)
    let [count, setCount] = useState(30)  
    let adminSession = sessionStorage.getItem('adminsession')
    let userSession = sessionStorage.getItem('usersession')
    
    let user = JSON.parse(localStorage.getItem('accountRecord'))
    if(!user){
        user = []
    }
    //INITIALIZATION OF VARIABLE END
    

    //LOGIN SESSIONS START
    useEffect(()=>{
        if(adminSession){
            navigate('/admin')
        }
    } ,[navigate, adminSession])

    useEffect(()=>{
        if(userSession){
            navigate('/user')
        }
    } ,[navigate, userSession])
    //LOGIN SESSIONS END


    const handleLogin = (e) => {
        e.preventDefault()

        //INITIALIZATION FOR LOGIN PROCESS START
        let username = document.querySelector(`.username`).value
        let loginPassword = document.querySelector(`.password`).value
        let admin = 'Admin'
        //INITIALIZATION FOR LOGIN PROCESS END


        if(    
            (username === admin || username === admin.toLowerCase() || username === admin.toUpperCase()) &&
            (loginPassword === admin || loginPassword === admin.toLowerCase() || loginPassword === admin.toUpperCase())


        ){  
            
            document.querySelector('.loginSuccess-modal').style.display = 'block' 
            setTimeout(() => {
                sessionStorage.setItem('adminsession', 'login')
                navigate('/admin') 
                
            },1000);
        } 

        else if(
            (username === admin || username === admin.toLowerCase() || username === admin.toUpperCase()) &&
            (loginPassword !== admin || loginPassword !== admin.toLowerCase() || loginPassword !== admin.toUpperCase())
        ) {
                loginAttempt(attempt - 1)
                // console.log(attempt,count)

                    if(attempt !== 0){
                        document.querySelector('.xLogin-modal').style.display = 'block'

                        setTimeout(() => {
                            document.querySelector('.xLogin-modal').style.display = 'none'    
                        }, 1000);
                    }
                                
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
        else {

            let isEmail = 0
            user.forEach(i => {
                if(i.email === username){
                    isEmail = 1
                }
            })
            if(isEmail !== 1){
                alert(`User doesn't exist`)
            } else{
                
                if (username === "" || loginPassword === ""){
                    document.querySelector(`.incLogin-modal`).style.display = 'block'
                    
                    setTimeout(() => {
                        document.querySelector(`.incLogin-modal`).style.display = 'none'
                    }, 1000);
                }
    
                else {
                    // console.log(user)
                    let ifLoginSuccess = false
                    let userFullname = ''
                    let accountBalance = ''
                    let accountNumber = ''
                    
        
                    
                    user.forEach(i => {
                        let {id, firstname, lastname, amount, email, password} = i
                        if(username === email && loginPassword === password){
                            ifLoginSuccess = true
                            userFullname = `${firstname} ${lastname}`
                            accountBalance = amount
                            accountNumber = id
                        } 
                    })
    
                    if(ifLoginSuccess === true){
                        
                        document.querySelector('.loginSuccess-modal').style.display = 'block'
                        setTimeout(() => {
                            sessionStorage.setItem('usersession', JSON.stringify({id: accountNumber, fullname : userFullname, amount : accountBalance}))
                            navigate('/user') 
                            
                        },1000);
                        
                    } else {
                    
                        loginAttempt(attempt - 1)
                        // console.log(attempt,count)
    
                            if(attempt !== 0){
                                document.querySelector('.xLogin-modal').style.display = 'block'
    
                                setTimeout(() => {
                                    document.querySelector('.xLogin-modal').style.display = 'none'    
                                }, 1000);
                            }
                                        
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


        }
        
    }


    return(
        <>
        <div className="home-header">< Header /></div>
        <div className="home-main">
            <div className="background-img">
                <img src="./img/home.png" alt="backround-img"/>
                <center><h1>Make banking easier!</h1></center>
            </div>

            {/* LOGIN */}
            <div className="login-container">
                <form className="login-form" id="login-form">
                    <span className="hand-waving-animated-emoji">👋</span>
                    <h2 className="greetings-home-page-text">great to see you here! </h2>
                    <h3 className="login-to-your-account-text">login to your account</h3>

                    <div className="login-form-row">
                        <input type="text" className="username" id="username" placeholder="username"/>
                        <input type="password" className="password" id="password" autoComplete="off" placeholder="password" />
                        
                        <button id="btn-login" className="btn-login" onClick={handleLogin}>
                            <span className="hover-underline-animation">login</span>
                            <svg id="arrow-horizontal" xmlns="http://www.w3.org/2000/svg" width="25" height="10" viewBox="0 0 46 16" fill="#f3c568">
                                <path id="Path_10" data-name="Path 10" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" transform="translate(30)"></path>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>

            {/* <!-- The Modal --> */}
            <div id="myModal" className="modal">
            {/* <!-- Modal content --> */}
                <div className="modal-content">
                    <p>You've reached the maximum login attempts, please try again in a few seconds... 🦕</p><br></br>
                    <span className="timer">{count}</span>
                </div>
            </div>

            <div id="incLogin" className="incLogin-modal">
            {/* <!-- Modal for incomplete login credential --> */}
                <div className="incLogin-content">
                    <p><strong>WARNING!</strong> Incomplete Login Credential!😐</p><br></br>
                </div>
            </div>
            
            <div id="xLogin" className="xLogin-modal">
            {/* <!-- Modal for incorrect login credential --> */}
                <div className="xLogin-content">
                    <p><strong>DANGER!</strong> Incorrect username or password!❌</p><br></br>
                </div>
            </div>

            <div id="loginSuccess" className="loginSuccess-modal">
            {/* <!-- Modal for login successful --> */}
                <div className="loginSuccess-content">
                    <p><strong>SUCCESS!💸</strong></p><br></br>
                </div>
            </div>

        </div>
        <div className="home-footer">< Footer /></div>
        </>
    )

}

export default Home


