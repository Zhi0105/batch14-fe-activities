import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// CSS
import '../styles/admin.css'
import '../styles/user.css'

const User = () => {
    

    const navigate = useNavigate()
    let userSession = JSON.parse(sessionStorage.getItem('usersession'))
    let fullname = ''
    let accountNo = ''
    let amount = 0
    
    if(userSession){
        fullname = userSession.fullname
        accountNo = userSession.id
        amount = userSession.amount

    }

    //LOGIN SESSION OF ADMIN
    useEffect(()=>{
        if(!userSession){
            navigate('/')
        }
    } ,[navigate, userSession])

     //FUNCTION HANDLLES LOG OUT BUTTON
    const handleLogout = () => {
        sessionStorage.clear()
        navigate('/')
    }

//FUNCTION HANDLES HOME DASHBOARD
    const handleDashboardHome = () => {
        navigate('/user');
    }
    
    
 //FUNCTION FOR MOBILE VIEW
    const openNav = () => {
        document.getElementById("Nav").style.width = "100%";
    }
    const closeNav = () => {
        document.getElementById("Nav").style.width = "0%";
    }

    const handleClickDeposit = () => {
        document.querySelector(`.deposit-modal`).style.display = 'block'
    }

    const handleClickWithdraw = () => {
        document.querySelector(`.withdraw-modal`).style.display = 'block'
    }
    const handleClickTransfer = () => {
        document.querySelector(`.transfer-modal`).style.display = 'block'
        
    }
    const handleClickExpense = () => {
        document.querySelector(`.expense-modal`).style.display = 'block'
    }
    const handleClose = () => {
        document.querySelector(`.deposit-modal`).style.display = 'none'
        document.querySelector(`.withdraw-modal`).style.display = 'none'
        document.querySelector(`.transfer-modal`).style.display = 'none'
        document.querySelector(`.expense-modal`).style.display = 'none'
        
    }

    return (        
        <div className="admin-main">
        <div className="sidebar">
            <div className="sidebar-header">
                <span onClick={handleDashboardHome}>🦅 MENU</span>
            </div>
            <div className="sidebar-menu">
                <button onClick={()=>{navigate('/user/transactions')}}>🧾Transaction records</button>
                <button onClick={()=>{navigate('/user/transfer-transactions')}}>📜Transfer records</button>
                <button onClick={handleLogout}>🚪Logout</button>

            </div>
        </div>
        <div className="main-dashboard">

            <div className="main-dashboard-header">
                <div>
                    <h3>Haribon Digital Bank</h3>
                    <small>Banking app panel</small>
                    
                    {/* <h1>{`₱ ${amount}.00`}</h1>
                    <small>{accountNo}</small> */}
                    
                    
                </div>
                <div className="greet">
                    <span>👋</span>&nbsp;&nbsp;<strong>Welcome, {fullname.toLocaleUpperCase()}</strong>
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
                                    <button onClick={()=>{navigate('/user/transactions')}}>🧾Transaction records</button>
                                    <button onClick={()=>{navigate('/user/transfer-transactions')}}>📜Transfer records</button>
                                    <button onClick={handleLogout}>🚪Logout</button>

                                </div>  
                            </div>
                        </div>
            </div>

            <div className="main-dashboard-content">
                <div className="dashboard-content-detail">
                    <div className="user-description">
                            <span className="amount">👛<strong>{`₱${amount}.00`}</strong></span>
                            <span>{accountNo}</span>
                            <small>Account number</small>
                                        
                    </div>
                    <div className="user-main-dashboard-content-transactions-container">

                        {/* withdraw card */}
                        <div className="withdraw-item" onClick={handleClickWithdraw}>
                                <img src="/img/withdraw.png" className="withdraw-illustration-photo" alt="withdraw-illustration" />
                            <header className="withdraw-header-text">withdraw</header>
                        </div>

                        {/* deposit card */}
                        <div className="deposit-item" onClick={handleClickDeposit}>
                                <img src="/img/deposit.png" className="deposit-illustration-photo" alt="deposit-illustration" />
                            <header className="deposit-header-text">deposit</header>
                        </div>

                        {/* bank transfer card */}
                        <div className="bank-transfer-item" onClick={handleClickTransfer}>
                                <img src="/img/banktransfer.png" className="bank-transfer-illustration-photo" alt="withdraw-illustration" />
                            <header className="bank-transfer-header-text">send money</header>
                        </div>

                        {/* expenses transfer card */}
                        <div className="expenses-item"  onClick={handleClickExpense}>
                                <img src="/img/expenses.png" className="expenses-illustration-photo" alt="expenses-illustration" />
                            <header className="expenses-header-text">expenses</header>
                        </div>
                    </div>
                </div>
                    {/* <!-- The Modal --> */}
                    <div id="deposit" className="deposit-modal">
                        <div className="deposit-content">
                            <span className="close" onClick={handleClose}>&times;</span>
                            <div className="container">
                                <span>Deposit form goes here!</span>
                            </div> 
                        </div>
                    </div>
                    <div id="withdraw" className="withdraw-modal">
                        <div className="withdraw-content">
                            <span className="close" onClick={handleClose}>&times;</span>
                            <div className="container">
                                <span>Withdraw form goes here!</span>
                            </div> 
                        </div>
                    </div>
                    <div id="transfer" className="transfer-modal">
                        <div className="transfer-content">
                            <span className="close" onClick={handleClose}>&times;</span>
                            <div className="container">
                                <span>Send money form goes here!</span>
                            </div> 
                        </div>
                    </div>
                    <div id="expense" className="expense-modal">
                        <div className="expense-content">
                            <span className="close" onClick={handleClose}>&times;</span>
                            <div className="container">
                                <span>Expense form goes here!</span>
                            </div> 
                        </div>
                    </div>
                    

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

export default User
