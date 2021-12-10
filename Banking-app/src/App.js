import React from 'react'
import {Routes, Route} from 'react-router-dom'

// Components
import Home from './components/Home'
import About from './components/About'
import Features from './components/Features'

// ADMIN COMPONENTS
import Admin from './components/Admin'
import Account from './components/Account'
import Accountlist from './components/Accountlist'
import Transaction from './components/Transaction'
import Deposit from './components/Deposit'
import Withdraw from './components/Withdraw'
import Banktransfer from './components/Banktransfer'
import Transfertransact from './components/Transfertransact'


// USER COMPONENTS
import User from './components/User'
import Usertransaction from './components/Usertransaction'
import Usertransfer from './components/Usertransfer'
// import Create from './components/Create'



const App = () => {
    
    return (
        <>
            <div className="app-main">
                <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/about' element={<About />}/>
                <Route path='/features' element={<Features />}/>
                <Route path='/admin' element={<Admin />} />
                <Route path='/admin/create-account' element={<Account />} />
                <Route path='/admin/account-list' element={<Accountlist />} />
                <Route path='/admin/transactions' element={<Transaction />} />
                <Route path='/admin/add-deposit-transaction' element={<Deposit />} />
                <Route path='/admin/add-withdrawal-transaction' element={<Withdraw />} />
                <Route path='/admin/add-bank-transfer-transaction' element={<Banktransfer />} />
                <Route path='/admin/transfer-transaction' element={<Transfertransact />} />
                <Route path='/user' element={<User />} />
                <Route path='/user/transactions' element={<Usertransaction />} />
                <Route path='/user/transfer-transactions' element={<Usertransfer />} />
                </Routes>
            
            </div>
        </>
    
    ) 


}

export default App