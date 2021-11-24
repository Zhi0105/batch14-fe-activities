import React from 'react'
import {Routes, Route} from 'react-router-dom'

// Components
import Home from './components/Home'
import Register from './components/Register'
import User from './components/User'
import Admin from './components/Admin'



const App = () => {
    
    return (
        <div className="app-main">
            <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/user' element={<User />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/' element={<Home />} />
            </Routes>  
        </div>
    ) 
}

export default App