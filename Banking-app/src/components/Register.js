import React from 'react'
import {useNavigate} from 'react-router-dom'


const Register = () => {

    //FUNCTION NAVIGATE TO HOME PAGE
    const navigate = useNavigate()
    const handleBackToHome = () => {
        navigate('/')
    }

    //FUNCTION THAT NOT ALLOW TO INPUT SPECIAL CHARACTERS & NUMBERS
    const handleInput = (e) => {
        
        let regex = new RegExp("^[ A-Za-z0-9]$")
        let key = String.fromCharCode(!e.charCode ? e.which : e.charCode)
        if(!regex.test(key)){
            e.preventDefault()
            return false
        }
        
        if(e.charCode >= 48 && e.charCode <= 59 ){
            e.preventDefault()
            return false
        }
    }

    //OBJECT ORIENTED PROGRAMMING FOR STORING USER
    let user = []
    let storedUser = JSON.parse(localStorage.getItem(`userRecord`))
    if(storedUser){
        user = [...storedUser]
    }

    let userID = 0     
    if(!storedUser){
            userID = 0
        }
    if(storedUser){
        userID = storedUser[storedUser.length - 1].id
    }
    
    class userRecord{
        constructor(firstname, lastname, email, password){
            this.firstname = firstname
            this.lastname = lastname
            this.email = email
            this.password = password
        }
        createUserRecord(){
            addUserRecord(this.firstname, this.lastname, this.email, this.password)
        }
    }


    const addUserRecord = (firstname, lastname, email, password) => {
        let userDetail = {
            id : userID + 1,
            firstname : firstname,
            lastname : lastname,
            email : email,
            password: password
        }
        user.push(userDetail)
    }



    //FUNCTION CAN HANDLE TO SUBMIT REGISTRATION FORM
    const submitInfo = (e) => {
        e.preventDefault()

        if(document.querySelector(`.regPassword`).value === document.querySelector(`.confirmPassword`).value){
            let newUser = new userRecord(
                document.querySelector(`.fname`).value, 
                document.querySelector(`.lname`).value,
                document.querySelector(`.email`).value,
                document.querySelector(`.regPassword`).value
            )     
            newUser.createUserRecord()
            localStorage.setItem(`userRecord`, JSON.stringify(user))
            alert(`User successfully created!`)
            handleBackToHome()
        } else {
            alert(`Please make sure your password matched!`)
        }
    }
    
    return(
        <div className="register-main">
            <div className="form-container">
            <h1 className="signUp">✍️ create your haribon account</h1>
                <form className="bank-form" onSubmit={submitInfo}>
                    <div className="form-detail">
                        <input type="text" className="fname" placeholder="first name" maxLength="25" autoComplete="on" onKeyPress={handleInput} required/>
                        <input type="text" className="lname"placeholder="last name" maxLength="25" autoComplete="on" onKeyPress={handleInput} required/>
                        <input type="email" className="email" placeholder="email" maxLength="30" autoComplete="off" required/>
                        <input type="password" className="regPassword" placeholder="password" maxLength="20" minLength="8" autoComplete="off" required/>
                        <input type="password" className="confirmPassword" placeholder="confirm password" maxLength="20" minLength="8" autoComplete="off" required/>
                    </div>
                    <div className="bttnDiv">
                    <input type="submit" id="btn-submit" value="🦅create" />
                    <button className="backHome" onClick={handleBackToHome}>👈 go back to home page</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register