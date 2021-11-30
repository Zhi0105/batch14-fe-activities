import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


//CSS
import '../styles/admin.css';

const Admin = () => {

    
    const navigate = useNavigate()
    let adminSession = sessionStorage.getItem('adminsession')
    // let storedMember = JSON.parse(localStorage.getItem('userRecord'))


    //LOGIN SESSION OF ADMIN
    useEffect(()=>{
        if(!adminSession){
            navigate('/')
        }
    } ,[navigate, adminSession])

    //FUNCTION HANDLLES LOG OUT BUTTON
    const handleLogout = () => {
        sessionStorage.clear()
        navigate('/')
    }
    
    
    return (
    
        <div className="admin-main">
            <div className="sidebar">
                <button className="btn-logout" onClick={handleLogout}>logout</button>
            </div>
            <div className="main-dashboard">
                <div className="main-dashboard-header"></div>
                <div className="main-dashboard-content">

                    

                </div>
                <div className="main-dashboard-footer"></div>
            </div>
        </div>
    )
    
}

    {/* <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Email</td>    
                        <td>Password</td>    
                        
                    </tr>
                </thead>
                <tbody id="member-info">
                    {
                        
                        storedMember.length ? 
                        storedMember.map((value, index) => {

                            const {id, firstname, lastname, email, password} = value

                            return (
                                <tr key={index}>
                                    <td>{id}</td>
                                    <td>{firstname}</td>
                                    <td>{lastname}</td>
                                    <td>{email}</td>
                                    <td>{password}</td>
                                    
                                </tr>
                            ) 
                        }) : <p>No Users found!</p>

                    }
                
                </tbody>
            </table> */}

export default Admin