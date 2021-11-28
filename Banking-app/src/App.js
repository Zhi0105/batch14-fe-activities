import React from 'react'
import {Routes, Route} from 'react-router-dom'

// Components
import Home from './components/Home'
import About from './components/About'
import Features from './components/Features'

import Admin from './components/Admin'
import Create from './components/Create'

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
                <Route path='/admin/create' element={<Create />} />
                
                {/* <Route path='/api' element={<Api />} /> */}
                </Routes>
            
            </div>
        </>
    
    ) 


}

export default App