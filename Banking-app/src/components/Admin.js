import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


//CSS
import '../styles/admin.css';


const Admin = () => {

    
    const navigate = useNavigate()
    let adminSession = sessionStorage.getItem('adminsession')

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
                    <button onClick={()=>{navigate('/admin/transactions')}}>🧾Withraw/deposit records</button>
                    <button onClick={()=>{navigate('/admin/transfer-transaction')}}>📜Bank transfer records</button>
                    <button onClick={()=>{navigate('/admin/account-list')}}>👥Account lists</button>
                    <button onClick={()=>{navigate('/admin/create-account')}}>➕Add account</button>
                    <button onClick={()=>{navigate('/admin/add-deposit-transaction')}}>💱Deposit transact</button>
                    <button onClick={()=>{navigate('/admin/add-withdrawal-transaction')}}>💵Withdrawal</button>
                    <button onClick={()=>{navigate('/admin/add-bank-transfer-transaction')}}>🏦Bank transfer</button>
                    <button onClick={handleLogout}>🚪Logout</button>
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
                                    {/* <a href="#" className="closebtn" onClick={closeNav}>&times;</a>
                                     */}
                                    <button className="closebtn" onClick={closeNav}>&times;</button>
                                    <div className="navOverlay-content">
                                        <button onClick={handleDashboardHome}>🏠Home</button>
                                        <button onClick={()=>{navigate('/admin/transactions')}}>🧾Withraw/deposit records</button>
                                        <button onClick={()=>{navigate('/admin/transfer-transaction')}}>📜Bank transfer records</button>
                                        <button onClick={()=>{navigate('/admin/account-list')}}>👥Account lists</button>
                                        <button onClick={()=>{navigate('/admin/create-account')}}>➕Add account</button>
                                        <button onClick={()=>{navigate('/admin/add-deposit-transaction')}}>💱Deposit transact</button>
                                        <button onClick={()=>{navigate('/admin/add-withdrawal-transaction')}}>💵Withdrawal</button>
                                        <button onClick={()=>{navigate('/admin/add-bank-transfer-transaction')}}>🏦Bank transfer</button>
                                        <button onClick={handleLogout}>🚪Logout</button>

                                    </div>  
                                </div>
                            </div>
                </div>

                <div className="main-dashboard-content">
                    <img src="/img/logo.png" alt="Logo"/>
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

export default Admin