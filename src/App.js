import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Provider } from 'mobx-react'

import store from './store'
import { logRoute } from './Authentication/routes'
import {
   projectsRoute,
   tasksRoute,
   createWorkFlowRoute
} from './ProjecstManagement/routes'
import './App.css'

const App = () => {
   return (
      <Provider {...store}>
         <Router basename={process.env.PUBLIC_URL}>
            <Switch>
               {/* {tasksRoute}
               {projectsRoute}
               {createWorkFlowRoute} */}

               {logRoute}
            </Switch>
         </Router>
      </Provider>
   )
}

export default App
