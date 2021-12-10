import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//CSS
import '../styles/admin.css';
import '../styles/banktransfer.css';

const Banktransfer = () => {
    
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

    let storedMember = JSON.parse(localStorage.getItem('accountRecord'))
    if(!storedMember){

        setTimeout(() => {
            navigate('/admin')
        }, 1000);

        return(
            <span>No record found!</span>
        )
    }  

    // INITIALIZING FOR TRANSFER BANK ACCOUNT
    let storedTransferTransaction = JSON.parse(localStorage.getItem('transferRecord'))
    let transferTransact = []
    let date = new Date()
    let currentYear = date.getFullYear()
    let currentMonth = date.getMonth()
    let currentday = date.getDate()
    let transferID = 0

    if(!storedTransferTransaction){
        transferID = 0
    }
    if(storedTransferTransaction){
        transferTransact = [...storedTransferTransaction]
        transferID = storedTransferTransaction[storedTransferTransaction.length - 1].id
    }


    // FUNCTION HANDLES TRANSACTION FOR TRANSFER BANK ACCOUNT
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(document.querySelector(`#sender`).value  === document.querySelector(`#receiver`).value){
            // alert(`sender and receiver should not be the same!`)
            document.querySelector('.sameName-modal').style.display = 'block'
            setTimeout(() => {
                document.querySelector(`.sameName-modal`).style.display = 'none'
            }, 3000);
        } else {
            if(document.querySelector(`#sender`).value === '...' || document.querySelector(`#receiver`).value === '...'){
                // alert(`Select account name for receiver or sender!`)
                document.querySelector('.invName-modal').style.display = 'block'
                setTimeout(() => {
                    document.querySelector(`.invName-modal`).style.display = 'none'
                }, 3000);

            } else {
                
                let transferObj = {
                    id: transferID + 1,
                    sender : document.querySelector(`#sender`).value,
                    receiver : document.querySelector(`#receiver`).value,
                    date : `${currentMonth + 1}-${currentday}-${currentYear}`,
                    amount:  document.querySelector(`.amount`).value,
                    transaction : `bank transfer`
                }  

                storedMember.forEach(i => {
                    if(`${i.firstname} ${i.lastname}` === document.querySelector(`#sender`).value){
                        if (parseInt(i.amount) < parseInt(document.querySelector(`.amount`).value)) {
                            // alert(`Insufficient Balance!`)
                            document.querySelector('.invBalance-modal').style.display = 'block'
                            setTimeout(() => {
                                document.querySelector(`.invBalance-modal`).style.display = 'none'
                            }, 3000);
                        } else {
                            i.amount = parseInt(i.amount) - parseInt(document.querySelector(`.amount`).value)
                            transferTransact.push(transferObj)
                            localStorage.setItem('transferRecord', JSON.stringify(transferTransact))
                            // alert(`Account successfully updated!`)
                            // navigate(`/admin`)
                            document.querySelector('.transfer-modal').style.display = 'block'
                            setTimeout(() => {
                                navigate('/admin/transfer-transaction')
                            }, 1500);
                        }
                    }
                })

                storedMember.forEach(i => {
                    if(`${i.firstname} ${i.lastname}` === document.querySelector(`#receiver`).value){
                        if (parseInt(i.amount) < parseInt(document.querySelector(`.amount`).value)) {
                            console.log('Insufficient Balance!')
                        } else {
                            i.amount = parseInt(i.amount) + parseInt(document.querySelector(`.amount`).value)
                        }
                    }
                })

                localStorage.setItem('accountRecord', JSON.stringify(storedMember))
            }
        }

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
                    <button className="active">🏦Bank transfer</button>
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
                                    <img src="/img/burger.png" alt="icon-burger" onClick={openNav}/>
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
                                        <button>🏦Bank transfer</button>
                                        <button onClick={handleLogout}>🚪Logout</button>
                                    </div>  
                                </div>
                            </div>
                </div>

                <div className="main-dashboard-content">
                        <div className="transfer-main">
                                <div className="transferform-container">
                                    <h1 className="banktransfer">✍️ Bank transfer</h1>
                                        <form className="transfer-form" onSubmit={handleSubmit}>
                                            <div className="transferform-detail">

                                                <label>Transfer from:</label>
                                                <select id="sender" required>
                                                    <option value="...">...</option>
                                                    {
                                                    storedMember.length ? 
                                                    storedMember.map((value, index) => {

                                                        const { firstname, lastname} = value
                                                        
                                                        return (
                                                            <option key={index} value={`${firstname} ${lastname}`}>
                                                                {firstname} {lastname}                    
                                                            </option>
                                                            
                                                        ) 
                                                    }) : <p>No Users found!</p>

                                                    }
                                                        
                                                </select>
                                                
                                                <label>Transfer to:</label>
                                                <select id="receiver" required>
                                                    <option value="...">...</option>
                                                    {
                                                    storedMember.length ? 
                                                    storedMember.map((value, index) => {

                                                        const { firstname, lastname} = value
                                                        
                                                        return (
                                                            <option key={index} value={`${firstname} ${lastname}`}>
                                                                {firstname} {lastname}                    
                                                            </option>
                                                            
                                                        ) 
                                                    }) : <p>No Users found!</p>

                                                    }
                                                </select>

                                                <input type="number" min="1" className="amount" placeholder="amount" required/>
                                                
                                            </div>
                                            <div className="btnDiv">
                                            <center><input type="submit" id="btn-submit" value="🦅 submit" /></center>
                                            </div>
                                        </form>
                                </div>
                            </div>
                            <div id="sameName" className="sameName-modal">
                                {/* <!-- Modal for same name of sender and receiver --> */}
                                <div className="sameName-content">
                                    <p><strong>WARNING!</strong> Sender and receiver should not be the same!😐</p><br></br>
                                </div>
                            </div>
                            <div id="invName" className="invName-modal">
                                {/* <!-- Modal for invalid names --> */}
                                <div className="invName-content">
                                    <p><strong>WARNING!</strong> Select account name for receiver or sender!😐</p><br></br>
                            </div>
                            </div>
                            <div id="invBalance" className="invBalance-modal">
                                {/* <!-- Modal for not enough balance --> */}
                                <div className="invBalance-content">
                                    <p><strong>WARNING!</strong> Insufficient account balance!😐</p><br></br>
                            </div>
                            </div>
                            <div id="transfer" className="transfer-modal">
                                {/* <!-- Modal for account successfully updated --> */}
                                <div className="transfer-content">
                                    <p>Account successfully updated!💸</p><br></br>
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

export default Banktransfer
