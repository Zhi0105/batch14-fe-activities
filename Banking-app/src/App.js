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

// import Create from './components/Create'


// //ACTIVITY
// import Api from './components/Api'

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
                
                {/* <Route path='/api' element={<Api />} /> */}
                </Routes>
            
            </div>
        </>
    
    ) 


}

export default App