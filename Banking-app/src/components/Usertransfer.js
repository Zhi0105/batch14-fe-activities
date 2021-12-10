import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// CSS
import '../styles/admin.css'

const Usertransfer = () => {
    

    const navigate = useNavigate()
    let userSession = JSON.parse(sessionStorage.getItem('usersession'))
    let fullname = ''
    
    if(userSession){
        fullname = userSession.fullname
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

    
    let transferRecord = JSON.parse(localStorage.getItem('transferRecord'))
    let Transactions = []

    
    if(transferRecord){
        if(transferRecord){
            transferRecord.forEach(i => {
                if(`${i.sender}` === fullname.toLowerCase()){
                    Transactions.push(i)
                }
            })
        }
    }
    
    if(!Transactions){

        setTimeout(() => {
            navigate('/admin')
        }, 1000);

        return(
            <span>No record found!</span>
        )
    }  


    return (        
        <div className="admin-main">
        <div className="sidebar">
            <div className="sidebar-header">
                <span onClick={handleDashboardHome}>🦅 MENU</span>
            </div>
            <div className="sidebar-menu">
                <button onClick={()=>{navigate('/user/transactions')}}>🧾Transaction records</button>
                <button className="active">📜Transfer records</button>
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
                                <img src="/img/burger.png" alt="icon-burger" onClick={openNav}/>
                            </div>

                            {/* OVERLAY NAV */}
                            <div id="Nav" className="navOverlay">
                                {/* <a href="#" className="closebtn" onClick={closeNav}>&times;</a>
                                 */}
                                <button className="closebtn" onClick={closeNav}>&times;</button>
                                <div className="navOverlay-content">
                                    <button onClick={handleDashboardHome}>🏠Home</button>
                                    <button onClick={()=>{navigate('/user/transactions')}}>🧾Transaction records</button>
                                    <button>📜Transfer records</button>
                                    <button onClick={handleLogout}>🚪Logout</button>

                                </div>  
                            </div>
                        </div>
            </div>

            <div className="main-dashboard-content">
                    <table>
                            <thead>
                                <tr>
                                    <td>Transfer from</td>
                                    <td>Transfer to</td>
                                    <td>Transaction Amount</td>
                                    <td>Transaction type</td>
                                    <td>Date</td>    
                                    
                                </tr>
                            </thead>
                            <tbody id="transfer-info">
                                {
                                    Transactions.length ? 
                                    Transactions.map((value, index) => {

                                        const {sender,receiver, amount, date, transaction} = value

                                        return (
                                            <tr key={index}>
                                                <td>{sender}</td>
                                                <td>{receiver}</td>
                                                <td>{`₱ ${amount}.00`}</td>
                                                <td>{transaction}</td>
                                                <td>{date}</td>
                                                                        
                                            </tr>
                                        ) 
                                    }) : <tr><td colSpan="5">No transaction found!</td></tr>

                                }
                            </tbody>
                    </table>
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

export default Usertransfer
