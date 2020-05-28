import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Provider } from 'mobx-react'

import store from './store'
import { logRoute } from './Authentication/routes'
import { projectsRoute } from './ProjecstManagement/routes'
import './App.css'

const App = () => {
   return (
      <Provider {...store}>
         <Router basename={process.env.PUBLIC_URL}>
            <Switch>
               <Route exact path='/admin' component={Admin} />
               <Route exact path='/member' component={Member} />
               {projectsRoute}
               {logRoute}
            </Switch>
         </Router>
      </Provider>
   )
}

function Admin() {
   return <h2>Admin</h2>
}

function Member() {
   return (
      <div>
         <h2>Member</h2>
         <button onClick={store.authenticationStore.userLogOut}>logout</button>
      </div>
   )
}
export default App
