import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//CSS
import '../styles/admin.css';
import '../styles/withraw.css';


const Withdraw = () => {
    
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
    let storedWithdrawTransaction = JSON.parse(localStorage.getItem("withdrawRecord"))
    let withdrawTransaction = []
    let withdrawDate = new Date()
    let withdrawCurrentYear = withdrawDate.getFullYear()
    let withdrawCurrentMonth = withdrawDate.getMonth()
    let withdrawCurrentDay = withdrawDate.getDate()
    let withdrawID = 0
    //INITIALIZING VARIABLES END

    // INITIALIZING WITHDRAW ID START
    if (!storedWithdrawTransaction) {
        withdrawID = 0
    }
    if (storedWithdrawTransaction) {
        withdrawTransaction = [...storedWithdrawTransaction]
        withdrawID = storedWithdrawTransaction[storedWithdrawTransaction.length - 1].id
    }
    // INITIALIZING WITHDRAW ID END

     //FUNCTION HANDLES WITHDRAW TRANSACTION START
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // CONDITION IF USER VALUE ON SELECT ELEMENT = '...'
        if (document.querySelector(`#withdraw`).value !== '...') {
            

            //DECLARATION OF OBJECT FOR WITHDRAW TRANSACTION RECORD START
            let withdrawObj = {
                id: withdrawID + 1,
                name: document.querySelector(`.userName`).value,
                amount: document.querySelector(`.amount`).value,
                date: `${withdrawCurrentMonth + 1}-${withdrawCurrentDay}-${withdrawCurrentYear}`,
                transaction: `withdrawal`,
            }
             //DECLARATION OF OBJECT FOR WITHDRAW TRANSACTION RECORD END
            
        
            
        // ITERATE STORED MEMBER TO COMPUTE OR MANIPULATE AMOUNT START
            storedMember.forEach(i => {
            if (`${i.firstname} ${i.lastname}` === document.querySelector(`.userName`).value) {

                    if (parseInt(i.amount) < parseInt(document.querySelector(`.amount`).value)) {
                        // alert(`Insufficient Balance!`)
                        document.querySelector('.errBalance-modal').style.display = 'block'
                        setTimeout(() => {
                            document.querySelector(`.errBalance-modal`).style.display = 'none'
                        }, 3000);
                    }

                    else {

                        // INSERTING WITHDRAW OBJECT TO WITHDRAW TRANSACTION ARRAY
                        withdrawTransaction.push(withdrawObj)
                        // SETTING RECORD OF LOCAL STORAGE FOR WITHDRAW TRANSACTION 
                        localStorage.setItem('withdrawRecord', JSON.stringify(withdrawTransaction))

                        i.amount = parseInt(i.amount) - parseInt(document.querySelector(`.amount`).value)
                        //DISPLAY MESSAGE FOR SUCCESSFULLY UPDATED RECORD AND NAVIGATE TO HOME ADMIN PANEL
                        // alert(`Account successfully updated!`)
                        // navigate(`/admin`)
                        document.querySelector('.withdraw-modal').style.display = 'block'
                        setTimeout(() => {
                            navigate('/admin/transactions')
                        }, 1500);
                    }
                }
            })
        // ITERATE STORED MEMBER TO COMPUTE OR MANIPULATE AMOUNT END

        // OVERRIDE OR UPDATE LOCAL STORAGE ACCOUNT RECORD
            localStorage.setItem('accountRecord', JSON.stringify(storedMember))


            
        } else {
            // alert(`invalid user!`)
            document.querySelector('.noName-modal').style.display = 'block'
            setTimeout(() => {
                document.querySelector(`.noName-modal`).style.display = 'none'
            }, 3000);

        }
    }
    //FUNCTION HANDLES WITHDRAW TRANSACTION END

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
                    <button className="active">💵Withdrawal</button>
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
                                        <button onClick={()=>{navigate('/admin/add-deposit-transaction')}}>💱Deposit transact</button>
                                        <button>💵Withdrawal</button>
                                        <button onClick={()=>{navigate('/admin/add-bank-transfer-transaction')}}>🏦Bank transfer</button>
                                        <button onClick={handleLogout}>🚪Logout</button>
                                    </div>  
                                </div>
                            </div>
                </div>

                <div className="main-dashboard-content">
                        <div className="withrawal-form-container">                  
                                <h1> ✍️ Withdrawal Transaction Form</h1>
                                    <form className="withrawal-form" onSubmit={handleSubmit}>
                                        <div className="withrawal-form-detail">
                                            <select name="username" className="userName" id="withdraw" required>
                                                <option value="...">...</option>
                                                {
                                                storedMember.length ? 
                                                storedMember.map((value, index) => {

                                                    const {firstname, lastname} = value

                                                    return (
                                                        <option key={index} value={`${firstname} ${lastname}`}>
                                                            {firstname} {lastname}                    
                                                        </option>
                                                        
                                                    ) 
                                                }) : <p>No Users found!</p>

                                                }
                                            </select>   
                                                <input type="number" min="1" className="amount" placeholder="amount" required/>                                                    
                                                <button>🦅 submit</button>
                                        </div>
                                    </form>
                        </div>
                        <div id="noName" className="noName-modal">
                            {/* <!-- Modal for invalid account name --> */}
                            <div className="noName-content">
                                <p><strong>WARNING!</strong> Invalid account name!😐</p><br></br>
                        </div>
                        </div>
                        <div id="errBalance" className="errBalance-modal">
                            {/* <!-- Modal for not enough balance --> */}
                            <div className="errBalance-content">
                                <p><strong>WARNING!</strong> Insufficient account balance!😐</p><br></br>
                        </div>
                        </div>
                        <div id="withdraw" className="withdraw-modal">
                            {/* <!-- Modal for account successfully updated --> */}
                            <div className="withdraw-content">
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

export default Withdraw
