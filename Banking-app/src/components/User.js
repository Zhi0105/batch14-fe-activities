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


    // MODAL FUNCTIONS START
    const handleClickDeposit = () => {
        document.querySelector(`.deposit-modal`).style.display = 'block'
    }

    const handleClickWithdraw = () => {
        document.querySelector(`.withdrawal-modal`).style.display = 'block'
    }
    const handleClickTransfer = () => {
        document.querySelector(`.user-transfer-modal`).style.display = 'block'
        
    }
    const handleClickExpense = () => {
        document.querySelector(`.expense-modal`).style.display = 'block'
    }
    const handleClose = () => {
        document.querySelector(`.deposit-modal`).style.display = 'none'
        document.querySelector(`.withdrawal-modal`).style.display = 'none'
        document.querySelector(`.user-transfer-modal`).style.display = 'none'
        document.querySelector(`.expense-modal`).style.display = 'none'
        
    }
    // MODAL FUNCTIONS END

    // INITIALIZATION FOR FUNCTIONALITY OF USER PAGE START
    let storedMember = JSON.parse(localStorage.getItem('accountRecord'))
    let storedDepositTransaction = JSON.parse(localStorage.getItem('debitRecord'))
    let storedWithdrawTransaction = JSON.parse(localStorage.getItem("withdrawRecord"))
    let storedTransferTransaction = JSON.parse(localStorage.getItem('transferRecord'))
    let storedExpenseTransaction = JSON.parse(localStorage.getItem('expenseRecord'))
    let depositTransaction = []
    let withdrawTransaction = []
    let transferTransact = []
    let expenseTransaction = []
    let date = new Date()
    let currentYear = date.getFullYear()
    let currentMonth = date.getMonth()
    let currentday = date.getDate()
    let depositID = 0
    let withdrawID = 0
    let transferID = 0
    let expenseID = 0

    if(!storedDepositTransaction){
        depositID = 0
    }
    if(storedDepositTransaction){
        depositTransaction = [...storedDepositTransaction]
        depositID = storedDepositTransaction[storedDepositTransaction.length - 1].id
    }
    if(!storedWithdrawTransaction){
        withdrawID = 0
    }
    if(storedWithdrawTransaction){
        withdrawTransaction = [...storedWithdrawTransaction]
        withdrawID = storedWithdrawTransaction[storedWithdrawTransaction.length - 1].id
    }

    if(!storedTransferTransaction){
        transferID = 0
    }
    if(storedTransferTransaction){
        transferTransact = [...storedTransferTransaction]
        transferID = storedTransferTransaction[storedTransferTransaction.length - 1].id
    }

    if(!storedExpenseTransaction){
        expenseID = 0
    }
    if(storedExpenseTransaction){
        expenseTransaction = [...storedExpenseTransaction]
        expenseID = storedExpenseTransaction[storedExpenseTransaction.length - 1].id
    }
    
    // INITIALIZATION FOR FUNCTIONALITY OF USER PAGE END
    

    //FUNCTION HANDLES DEPOSIT START
    const handleDeposit = (e) => {
        e.preventDefault()
        
        // UPDATING DEPOSIT TRANSACTION RECORD START
        let depositObj = {
            id : depositID + 1,
            name : fullname.toLowerCase(),
            amount : document.querySelector(`.user-deposit-amount`).value,
            date : `${currentMonth + 1}-${currentday}-${currentYear}`,
            transaction : `deposit`
        }
        depositTransaction.push(depositObj)
        localStorage.setItem('debitRecord', JSON.stringify(depositTransaction))
        // UPDATING DEPOSIT TRANSACTION RECORD END
        // UPDATING ACCOUNT RECORD START
        storedMember.forEach(i => {
            if(`${i.firstname} ${i.lastname}` === fullname.toLowerCase()){
                i.amount = parseInt(i.amount) + parseInt(document.querySelector(`.user-deposit-amount`).value)
            }
        })
        localStorage.setItem('accountRecord', JSON.stringify(storedMember))
        // UPDATING ACCOUNT RECORD START END

        alert("Your account successfully updated, please relogin to see changes!");
        sessionStorage.clear()
        navigate('/')

    }
    //FUNCTION HANDLES DEPOSIT END
    // FUNCTION HANDLES WITHDRAW START
    const handleWithdraw = (e) => {
        e.preventDefault()

        let withdrawObj = {
            id: withdrawID + 1,
            name: fullname.toLowerCase(),
            amount: document.querySelector(`.user-withdraw-amount`).value,
            date : `${currentMonth + 1}-${currentday}-${currentYear}`,
            transaction: `withdrawal`,
        }

        storedMember.forEach(i => {
            if(`${i.firstname} ${i.lastname}` === fullname.toLowerCase()){
                if(parseInt(i.amount) < parseInt(document.querySelector(`.user-withdraw-amount`).value)){
                    alert(`Insufficient Balance!`)
                } else {
                    withdrawTransaction.push(withdrawObj)
                    localStorage.setItem('withdrawRecord', JSON.stringify(withdrawTransaction))
                    i.amount = parseInt(i.amount) - parseInt(document.querySelector(`.user-withdraw-amount`).value)
                    
                    alert("Your account successfully updated, please relogin to see changes!");
                    sessionStorage.clear()
                    navigate('/')
        
                }
            }
        })
        localStorage.setItem('accountRecord', JSON.stringify(storedMember))
            
    }
    // FUNCTION HANDLES WITHDRAW END

    // FUNCTIONS HANDLE TRANSFER START
    const handleChange = () => {

        storedMember.forEach(i => {
            if(i.id !== document.querySelector(`.account-number`).value){
                document.querySelector(`.user-fullname`).value = ''
            } 
        })

        storedMember.forEach(i => {
            if(i.id === document.querySelector(`.account-number`).value){
                document.querySelector(`.user-fullname`).value = `${i.firstname} ${i.lastname}`
            } 
        })

    }

    const handleSend = (e) => {
        e.preventDefault()
        if(document.querySelector(`.user-fullname`).value === ''){
            alert(`Account number doesn't exist!`)
        } else {
            if(document.querySelector(`.user-fullname`).value === fullname){
                alert(`Can't transfer money on yourself!`)
            } else {
                
                let transferObj = {
                    id: transferID + 1,
                    sender : fullname.toLowerCase(),
                    receiver :document.querySelector(`.user-fullname`).value,
                    date : `${currentMonth + 1}-${currentday}-${currentYear}`,
                    amount:  document.querySelector(`.bank-transfer-amount`).value,
                    transaction : `bank transfer`
                }
                
                storedMember.forEach(i => {
                    if(`${i.firstname} ${i.lastname}` === fullname.toLowerCase()){
                        if(parseInt(i.amount) < parseInt(document.querySelector(`.bank-transfer-amount`).value)){
                            alert(`Insufficient Balance!`)
                        } else {
                            i.amount = parseInt(i.amount) - parseInt(document.querySelector(`.bank-transfer-amount`).value)
                            transferTransact.push(transferObj)
                            localStorage.setItem('transferRecord', JSON.stringify(transferTransact))
                            alert("Transfer successful, please relogin to see changes!");
                            sessionStorage.clear()
                            navigate('/')
                        }
                    }
                })
                storedMember.forEach(i => {
                    if(`${i.firstname} ${i.lastname}` === document.querySelector(`.user-fullname`).value){
                        if(parseInt(i.amount) < parseInt(document.querySelector(`.bank-transfer-amount`).value)){
                            console.log('Insufficient Balance!')
                        } else {
                            i.amount = parseInt(i.amount) + parseInt(document.querySelector(`.bank-transfer-amount`).value)
                        }
                    }
                })
                
                localStorage.setItem('accountRecord', JSON.stringify(storedMember))

            }
        }
    }
    // FUNCTIONS HANDLE TRANSFER END
    // FUNCTION HANDLE EXPENSE START
    const handleExpense = (e) => {
        e.preventDefault()
        if(document.querySelector(`.expense-type`).value === '...'){
            alert(`Select payment type!`)
        } else {

            let expenseObj = {
                id: expenseID + 1,
                name: fullname.toLowerCase(),
                amount: document.querySelector(`.user-expense-amount`).value,
                date : `${currentMonth + 1}-${currentday}-${currentYear}`,
                transaction: document.querySelector(`.expense-type`).value
            }

            storedMember.forEach(i => {
                if(`${i.firstname} ${i.lastname}` === fullname.toLowerCase()){
                    if(parseInt(i.amount) < parseInt(document.querySelector(`.user-expense-amount`).value)){
                        alert(`Insufficient Balance!`)
                    } else {
                        expenseTransaction.push(expenseObj)
                        localStorage.setItem('expenseRecord', JSON.stringify(expenseTransaction))
                        i.amount = parseInt(i.amount) - parseInt(document.querySelector(`.user-expense-amount`).value)
                        
                        alert("Payment successful, please relogin to see changes!");
                        sessionStorage.clear()
                        navigate('/')
                    }
                }
            })

            localStorage.setItem('accountRecord', JSON.stringify(storedMember))

        }
    }
    
    // FUNCTION HANDLE EXPENSE END
    



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
                                <h1>✍️ Deposit Transaction </h1>
                                    <form className="user-deposit-form" onSubmit={handleDeposit}>
                                        <div className="user-deposit-form-detail">
                                            <input type="number" min="1" className="user-deposit-amount" placeholder="amount" required />
                                            <input type="submit" value="🦅 submit" className="user-button-submit"/>
                                        </div>
                                    </form>
                            </div> 
                        </div>
                    </div>
                    <div id="withdrawal" className="withdrawal-modal">
                        <div className="withdrawal-content">
                            <span className="close" onClick={handleClose}>&times;</span>
                            <div className="container">
                                <h1> ✍️ Withdrawal Transaction </h1>
                                    <form className="user-withdraw-form" onSubmit={handleWithdraw}>
                                        <div className="user-withdraw-form-detail">
                                            <input type="number" min="1" className="user-withdraw-amount" placeholder="amount" required />
                                            <input type="submit" value="🦅 submit" className="user-button-submit"/>
                                        </div>
                                    </form>
                            </div> 
                        </div>
                    </div>
                    <div id="user-transfer" className="user-transfer-modal">
                        <div className="user-transfer-content">
                            <span className="close" onClick={handleClose}>&times;</span>
                            <div className="container">
                                <h1> ✍️ Send Money </h1>
                                    <form className="user-bank-transfer-form" onSubmit={handleSend}>
                                        <div className="user-bank-transfer-form-detail">
                                            <input type="text" className="user-fullname" disabled />
                                            <input type="text" className="account-number" placeholder="Account Number" onChange={handleChange} required />
                                            <input type="number" min="1" className="bank-transfer-amount" placeholder="amount" required />
                                            <input type="submit" value="🦅 submit" className="user-button-submit"/>
                                        </div>
                                    </form>
                            </div> 
                        </div>
                    </div>
                    <div id="expense" className="expense-modal">
                        <div className="expense-content">
                            <span className="close" onClick={handleClose}>&times;</span>
                            <div className="container">
                                <h1> ✍️ Fill up for your expense</h1>
                                    <form className="user-expenses-form" onSubmit={handleExpense}>
                                        <div className="user-expenses-form-detail">
                                            <select className="expense-type" required>
                                                <option value="...">...</option>
                                                <option value="electric-bill">⚡Electric Bill</option>
                                                <option value="water-bill">💧Water Bill</option>
                                                <option value="internet-bill">🌐Internet Bill</option>
                                            </select>
                                            <input type="number" min="1" className="user-expense-amount" placeholder="amount" required />
                                            <input type="submit" value="🦅 submit" className="user-button-submit"/>
                                        </div>
                                    </form>
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
