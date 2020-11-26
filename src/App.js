import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Provider } from 'mobx-react'

import store from './store'
import { logRoute } from './Authentication/routes'
import {
   projectsRoute,
   tasksRoute,
   createWorkFlowRoute,
   VideoPageOneRoute,
   videosPageFourRoute,
   videosPageThreeRoute,
   videosPageTwoRoute
} from './ProjecstManagement/routes'
import './App.css'
import { videosPageOne } from './ProjecstManagement/constants/RouteConstants'
import { getAccessToken, getUserId } from './Common/utils/StorageUtils'

class App extends React.Component {
   componentDidMount() {
      const accessToken = getAccessToken()
      if (accessToken !== undefined && accessToken !== '') {
         window.dataLayer.push({
            event: 'loginSuccess',
            userId: getUserId()
         })
      }
   }
   render() {
      return (
         <Provider {...store}>
            <Router basename={process.env.PUBLIC_URL}>
               <Switch>
                  {videosPageOne}
                  {videosPageTwoRoute}
                  {videosPageThreeRoute}
                  {videosPageFourRoute}
                  {tasksRoute}
                  {projectsRoute}
                  {createWorkFlowRoute}
                  {logRoute}
               </Switch>
            </Router>
         </Provider>
      )
   }
}

export default App
