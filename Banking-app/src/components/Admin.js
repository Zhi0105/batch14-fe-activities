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

    //FUNCTION HANDLES HOME DASHBOARD
    const handleDashboardHome = () => {
        navigate('/admin');
    }
    
    //FUNCTION FOR MOBILE VIEW
    const openNav = () => {
        document.getElementById("Nav").style.width = "100%";
    }
    const closeNav = () => {
        document.getElementById("Nav").style.width = "0%";
    }

    return (
    
        <div className="admin-main">
            <div className="sidebar">
                <div className="sidebar-header">
                    <span onClick={handleDashboardHome}>🦅 MENU</span>
                </div>
                <div className="sidebar-menu">
                    <button className="btn-account-list">👥Account lists</button>
                    <button className="btn-add">➕Add account</button>
                    <button className="btn-debit">💱Debit transact</button>
                    <button className="btn-withdraw">💵Withdrawal</button>
                    <button className="btn-transfer">🏦Bank transfer</button>
                    <button className="btn-logout" onClick={handleLogout}>🚪Logout</button>
                </div>
            </div>
            <div className="main-dashboard">

                <div className="main-dashboard-header">
                    <div>
                        <h3>Dashboard</h3>
                        <small>Banking app panel</small>    
                    </div>
                    <div className="greet">
                        <span>👋</span>&nbsp;&nbsp;<strong>Welcome Admin!</strong>
                    </div>
                    
                            {/* Navigation for mobile size screen */}
                            <div className="top-admin-nav">
                                <div className="nav-icon">
                                    <img src="./img/burger.png" alt="icon-burger" onClick={openNav}/>
                                </div>

                                {/* OVERLAY NAV */}
                                <div id="Nav" className="navOverlay">
                                    <a href="#" className="closebtn" onClick={closeNav}>&times;</a>
                                    <div className="navOverlay-content">
                                        <a href="#">🏠Home</a>
                                        <a href="#">👥Account lists</a>
                                        <a href="#">➕Add account</a>
                                        <a href="#">💱Debit transact</a>
                                        <a href="#">💵Withdrawal</a>
                                        <a href="#">🏦Bank transfer</a>
                                        <a href="#" onClick={handleLogout}>🚪Logout</a>
                                        
                                        
                                    </div>  
                                </div>
                            </div>
                </div>

                <div className="main-dashboard-content">
                    <img src="./img/logo.png" alt="Logo"/>
                </div>
                <div className="main-dashboard-footer">
                    <div>
                        <span>&copy; 2021 Haribon Digital Banking Application | All Rights Reserved.</span>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

    /* <table>
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
            </table> */

export default Admin