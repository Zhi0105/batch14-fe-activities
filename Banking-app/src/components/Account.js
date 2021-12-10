import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

//CSS
import '../styles/admin.css';
import '../styles/account.css';



const Account = () => {
    
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
    
    //FUNCTION THAT NOT ALLOW TO INPUT SPECIAL CHARACTERS & NUMBERS
    const handleInput = (e) => {
        
        let regex = new RegExp("^[ A-Za-z0-9]$")
        let key = String.fromCharCode(!e.charCode ? e.which : e.charCode)
        if(!regex.test(key)){
            e.preventDefault()
            return false
        }
        
        if(e.charCode >= 48 && e.charCode <= 59 ){
            e.preventDefault()
            return false
        }
    }

    //FUNCTION NOT ALLOW SPECIAL CHARACTER
    const handleContact = (e) => {
        let regex = new RegExp("^[ A-Za-z0-9]$")
        let key = String.fromCharCode(!e.charCode ? e.which : e.charCode)
        if(!regex.test(key)){
            e.preventDefault()
            return false
        }
    
    }

    //OBJECT ORIENTED PROGRAMMING FOR STORING USER
    let accountList = []
    let storedUser = JSON.parse(localStorage.getItem(`accountRecord`))
    if(storedUser){
        accountList = [...storedUser]
    }

    class userRecord{
        constructor(firstname, lastname, email, password, contact, amount){
            this.firstname = firstname
            this.lastname = lastname
            this.email = email
            this.password = password
            this.contact = contact
            this.amount = amount
        }
        createUserRecord(){
            addUserRecord(this.firstname, this.lastname, this.email, this.password, this.contact, this.amount)
        }
    }


    const addUserRecord = (firstname, lastname, email, password, contact, amount) => {
        let userDetail = {
            // id : userID + 1,
            id : uuidv4(),
            firstname : firstname,
            lastname : lastname,
            email : email,
            password: password,
            contact: contact,
            amount: amount
        }
        accountList.push(userDetail)
    }

      //FUNCTION CAN HANDLE TO SUBMIT REGISTRATION FORM
    const submitInfo = (e) => {
        e.preventDefault()

        
        if(document.querySelector('.amount').value > 0){

            // console.log(storedUser)

            if(document.querySelector(`.regPassword`).value === document.querySelector(`.confirmPassword`).value){
                if(document.querySelector(`.contact`).value > 0){
                    let newUser = new userRecord(
                        document.querySelector(`.fname`).value, 
                        document.querySelector(`.lname`).value,
                        document.querySelector(`.email`).value,
                        document.querySelector(`.regPassword`).value,
                        document.querySelector(`.contact`).value,
                        document.querySelector(`.amount`).value
                    )     
                    newUser.createUserRecord()
                    localStorage.setItem(`accountRecord`, JSON.stringify(accountList))
    
                    document.querySelector('.userCreate-modal').style.display = 'block'
                    setTimeout(() => {
                        navigate('/admin/account-list')
                    }, 1500);
                } else {
                    // alert(`contact should be a number`)
                    document.querySelector('.errcontact-modal').style.display = 'block'
                    setTimeout(() => {
                        document.querySelector(`.errcontact-modal`).style.display = 'none'
                    }, 3000);
                }
            } else {
                document.querySelector(`.errPassword-modal`).style.display = 'block'
                setTimeout(() => {
                    document.querySelector(`.errPassword-modal`).style.display = 'none'
                }, 2000);
            }

        } else {
            // alert(`Initial Deposit should be not below or equal to 0 amount!`)

            document.querySelector('.errDeposit-modal').style.display = 'block'
            setTimeout(() => {
                document.querySelector('.errDeposit-modal').style.display = 'none'
            }, 3000);
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
                    <button className="active">➕Add account</button>
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
                                        <button>➕Add account</button>
                                        <button onClick={()=>{navigate('/admin/add-deposit-transaction')}}>💱Deposit transact</button>
                                        <button onClick={()=>{navigate('/admin/add-withdrawal-transaction')}}>💵Withdrawal</button>
                                        <button onClick={()=>{navigate('/admin/add-bank-transfer-transaction')}}>🏦Bank transfer</button>
                                        <button onClick={handleLogout}>🚪Logout</button>
                                    </div>  
                                </div>
                            </div>
                </div>

                <div className="main-dashboard-content">
                    <div className="account-main">
                        <div className="form-container">
                            <h1 className="signUp">✍️ create haribon account</h1>
                                {/* <form className="bank-form" onSubmit={submitInfo}>
                                     */}
                                <form className="bank-form" onSubmit={submitInfo}>
                                    <div className="form-detail">
                                        <input type="text" className="fname" placeholder="first name" maxLength="25" autoComplete="on" onKeyPress={handleInput} required/>
                                        <input type="text" className="lname"placeholder="last name" maxLength="25" autoComplete="on" onKeyPress={handleInput} required/>
                                        <input type="email" className="email" placeholder="email" maxLength="30" autoComplete="off" required/>
                                        <input type="password" className="regPassword" placeholder="password" maxLength="20" minLength="8" autoComplete="off" required/>
                                        <input type="password" className="confirmPassword" placeholder="confirm password" maxLength="20" minLength="8" autoComplete="off" required/>
                                        <input type="text" className="contact" placeholder="contact number" maxLength="11" minLength="11" autoComplete="off" onKeyPress={handleContact} required/>
                                        <input type="number" className="amount" placeholder="initial deposit" required/>
                                        
                                    </div>
                                    <div className="btnDiv">
                                    <center><input type="submit" id="btn-submit" value="🦅 submit" /></center>
                                    </div>
                                </form>
                        </div>
                    </div>
                    <div id="errPassowrd" className="errPassword-modal">
                        {/* <!-- Modal for mismatched password --> */}
                        <div className="errPassword-content">
                            <p><strong>WARNING!</strong> Password not matched!😐</p><br></br>
                        </div>
                    </div>

                    <div id="errContact" className="errcontact-modal">
                        {/* <!-- Modal for contact --> */}
                        <div className="errContact-content">
                            <p><strong>WARNING!</strong> Contact should be a number!😐</p><br></br>
                        </div>
                    </div>

                    <div id="errDeposit" className="errDeposit-modal">
                        {/* <!-- Modal for initial deposit --> */}
                        <div className="errDeposit-content">
                            <p><strong>WARNING!</strong> Initial Deposit should be not below or equal to 0 amount!😐</p><br></br>
                        </div>
                    </div>
                    <div id="userCreate" className="userCreate-modal">
                        {/* <!-- Modal for User successfully created --> */}
                        <div className="userCreate-content">
                            <p>User successfully created!💸</p><br></br>
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

export default Account
