import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'mobx-react'

import i18n from './Common/i18n'
import store from './store'
import { logRoute } from './Authentication/routes'
import { projectsRoute, tasksRoute } from './ProjectsManagement/routes'
import './App.css'

const App = () => {
   return (
      <Provider {...store}>
         <I18nextProvider i18n={i18n}>
            <Suspense fallback={<div />}>
               <Router basename={process.env.PUBLIC_URL}>
                  <Switch>
                     {tasksRoute}
                     {projectsRoute}
                     {logRoute}
                  </Switch>
               </Router>
            </Suspense>
         </I18nextProvider>
      </Provider>
   )
}

export default App
