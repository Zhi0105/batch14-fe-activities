import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {
    TextField,
    Button,
} from '@mui/material'



const Register = () => {
    const navigate = useNavigate()
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [contact, setContact] = useState('')
    const [validate, setValidate] = useState(false)
    
    
    const handleSubmit = () => {
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        let nameformat = /^[a-zA-Z ]*$/
        let validateEmail = email.trim()
        
        !email || !firstname || !lastname || !email || !password || !confirmPassword || !contact ? alert(`Kindly fill up all fields!`)
            : !firstname.match(nameformat) || !lastname.match(nameformat) ?  alert(`Invalid name!`)
                : !validateEmail.match(mailformat) ?  alert(`Invalid email!`)
                    : password !== confirmPassword ? alert(`Password should matched!`)
                        : contact.length !== 11 ? alert(`contact should be 11 digit!`)
                            :setValidate(true)

    } 
    
    useEffect(() => {

        if(validate === true){
            alert(`account successfully created!`)
            navigate(`/`)
        }
    
    }, [validate, navigate])


    return (
        <div className="register-main">
            <div className='form-container'>
                <form>
                    <div className="register-form-header"><h1>Sign up</h1></div>
                        <div className="register-form-content">
                            <span>Name:</span>
                            <div className="name">
                                <TextField type="text" label="firstname" variant="outlined" onChange={(e) => setFirstname(e.target.value)} value={firstname} autoComplete='off'/>
                                <TextField type="text" label="surname" variant="outlined" onChange={(e) => setLastname(e.target.value)} value={lastname} autoComplete='off'/>    
                            </div>
                            <span>Email:</span>
                            <TextField type="emaii" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} value={email} autoComplete='off'/>
                            <span>Password:</span>
                            <TextField type="password" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete='off'/>
                            <TextField type="password" label="Retype-password" variant="outlined" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} autoComplete='off'/>
                            <span>Contact:</span>
                            <TextField type="number" label="Contact number" variant="outlined" onChange={(e) => setContact(e.target.value)} value={contact} autoComplete='off'/>
                            
                        </div>
                        <div className="register-form-footer">
                            <Button className="button" color="success" variant="contained" onClick={handleSubmit}>Submit</Button>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default Register
