import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//CSS
import '../styles/admin.css';
import '../styles/deposit.css';


const Deposit = () => {
    
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


    //INITIALIZING VARIABLES START
    let storedDebitTransaction = JSON.parse(localStorage.getItem('debitRecord'))
    let debitTransaction = []
    let date = new Date()
    let currentYear = date.getFullYear()
    let currentMonth = date.getMonth()
    let currentday = date.getDate()
    let debitID = 0
    //INITIALIZING VARIABLES END
    

    // INITIALIZING DEBIT ID START
    if(!storedDebitTransaction){
        debitID = 0
    }
    if(storedDebitTransaction){
        debitTransaction = [...storedDebitTransaction]
        debitID = storedDebitTransaction[storedDebitTransaction.length - 1].id
    }
    // INITIALIZING DEBIT ID END
    
    
    // FUNCTION HANDLES DEBIT TRANSACTION START
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // CONDITION IF USER VALUE ON SELECT ELEMENT = '...'
        if(document.querySelector(`#user`).value !== '...'){

            //DECLARATION OF OBJECT FOR DEBIT TRANSACTION RECORD START
            let debitObj = {
                id : debitID + 1,
                name : document.querySelector(`#user`).value,
                amount : document.querySelector(`#amount`).value,
                date : `${currentMonth + 1}-${currentday}-${currentYear}`,
                transaction : `deposit`
            }  
        //DECLARATION OF OBJECT FOR DEBIT TRANSACTION RECORD END
            
        // INSERTING DEBIT OBJECT TO DEBIT TRANSACTION ARRAY
        debitTransaction.push(debitObj)
        // SETTING RECORD OF LOCAL STORAGE FOR DEBIT TRANSACTION 
        localStorage.setItem('debitRecord', JSON.stringify(debitTransaction))

        // ITERATE STORED MEMBER TO COMPUTE OR MANIPUATE AMOUNT START
        storedMember.forEach(i => {
            if(`${i.firstname} ${i.lastname}` === document.querySelector(`#user`).value){
                i.amount = parseInt(i.amount) + parseInt(document.querySelector(`#amount`).value)
            }
        })
        // ITERATE STORED MEMBER TO COMPUTE OR MANIPUATE AMOUNT END
        
        // OVERWRIDE OR UPDATE LOCAL STORAGE ACCOUNT RECORD
        localStorage.setItem('accountRecord', JSON.stringify(storedMember))
        
        //DISPLAY MESSAGE FOR SUCCESSFULLY UPDATED RECORD AND NAVIGATE TO HOME ADMIN PANEL 
        // alert(`Account successfully updated!`)
        document.querySelector('.accountUpdate-modal').style.display = 'block'
        setTimeout(() => {
            navigate('/admin/transactions')
        }, 1500);
        

        } else {
            // alert(`Invalid account name!`)
            document.querySelector('.errName-modal').style.display = 'block'
            setTimeout(() => {
                document.querySelector(`.errName-modal`).style.display = 'none'
            }, 3000);

        }
        
    
    }
    // FUNCTION HANDLES DEBIT TRANSACTION END

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
                    <button className="active">💱Deposit transact</button>
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
                                        <button>💱Deposit transact</button>
                                        <button onClick={()=>{navigate('/admin/add-withdrawal-transaction')}}>💵Withdrawal</button>
                                        <button onClick={()=>{navigate('/admin/add-bank-transfer-transaction')}}>🏦Bank transfer</button>
                                        <button onClick={handleLogout}>🚪Logout</button>
                                    </div>  
                                </div>
                            </div>
                </div>

                <div className="main-dashboard-content">
                    <div className="debit-transaction-main">
                            <div className="debit-transaction-form-container">
                                <h1 className="debit-transaction-header"><span>✍️</span>Deposit Transaction Form</h1>

                                <form className="debit-transaction-form" onSubmit={handleSubmit}>
                                    <div className="debit-transaction-form-detail">
                                        <select className="choose-debit-transaction-username" id="user" required>
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
                                            <input type="number" id="amount" className="debit-transaction-amount" placeholder="amount" min="1" required/>
                                    </div>

                                    <div className="debit-transaction-form-button">
                                        <center>
                                            <input type="submit" id="debit-transaction-submit-button" value="🦅 submit"/>
                                        </center>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div id="errName" className="errName-modal">
                            {/* <!-- Modal for invalid account name --> */}
                            <div className="errName-content">
                                <p><strong>WARNING!</strong> Invalid account name!😐</p><br></br>
                        </div>
                        </div>
                        <div id="accountUpdate" className="accountUpdate-modal">
                            {/* <!-- Modal for User successfully updated --> */}
                            <div className="accountUpdate-content">
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

export default Deposit
