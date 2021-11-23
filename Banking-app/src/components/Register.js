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
        
        let regex = new RegExp("[a-zA-Z0-9]+$")
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

    //FUNCTION CAN HANDLE TO SUBMIT REGISTRATION FORM
    const submitInfo = (e) => {
        e.preventDefault()
        alert(`Form Submitted!`)
    }


    return(

        <div className="register-main">
            <h1>Sign Up</h1>
            <div className="form-container">
                <form className="bank-form" onSubmit={submitInfo}>
                    <div className="form-detail">
                        <i className="fa">&#xf406;</i><input type="text" placeholder="First Name" maxLength="25" autoComplete="on" onKeyPress={handleInput} required/>
                        <i className="fa">&#xf406;</i><input type="text" placeholder="Last Name" maxLength="25" autoComplete="on" onKeyPress={handleInput} required/>
                        <i className="fa">&#xf0e0;</i><input type="email" placeholder="Email" maxLength="30" autoComplete="off" required/>
                        <i className='fa'>&#xf3c1;</i><input type="password" placeholder="Password" maxLength="20" minLength="8" autoComplete="off" required/>
                        <i className='fa'>&#xf3c1;</i><input type="password" placeholder="Confirm Password" maxLength="20" minLength="8" autoComplete="off" required/>
                    </div>
                    <input type="submit" id="btn-submit" value="Sign up" />
                    <button className="backHome" onClick={handleBackToHome}>back</button>
                </form>
            </div>
        </div>
    )
}

export default Register