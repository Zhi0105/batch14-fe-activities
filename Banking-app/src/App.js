import React from 'react'
import { Router ,Switch ,Route } from 'react-router-dom'

// Components
import Home from './components/Home'
import Register from './components/Register'

const App = () => {
    
    return (
        <div className="app-main">
            <Router>
                <Switch>
                    <Route path='/home' component={Home} />
                    <Route path='/register' component={Register} />
                </Switch>
            </Router>
            
        </div>
    ) 
}

export default App