import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const User = () => {
    

    const navigate = useNavigate()
    let userSession = JSON.parse(sessionStorage.getItem('usersession'))
    // let storedMember = JSON.parse(localStorage.getItem('userRecord'))


    //LOGIN SESSION OF ADMIN
    useEffect(()=>{
        if(!userSession){
            navigate('/')
        }
    } ,[navigate, userSession])

    let {fullname, amount} = userSession

    return (        
        <div>
            <span>Welcome  <strong>{fullname}</strong>, your current balance is <strong>{`₱${amount}.00`}</strong></span>
        </div>
    )
}

export default User
