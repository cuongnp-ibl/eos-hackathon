import React, { Component } from 'react'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import Home from './screens/frontend/Home'
import About from './screens/frontend/About'
import Topics from './screens/frontend/Topics'
import KYBRegistration from './screens/frontend/KYBRegistration'
import Login from './screens/frontend/Login'

import AdminDonate from './screens/backend/AdminDonate'

import { MODULE_NAME as HOME_MODULE_NAME } from './modules/frontend/home/model'
import homeReducer from './modules/frontend/home/reducers'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})

const middleware = routerMiddleware(history)

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
)

const store = createStore(
  combineReducers({
    [HOME_MODULE_NAME]: homeReducer,
    router: routerReducer
  }),
  enhancer // applyMiddleware(middleware)
)

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/kyb-registration' component={KYBRegistration} />
            <Route path='/topics' component={Topics} />
            <Route path='/login' component={Login} />

            {/* TODO: Admin */}
            <Route path='/admin/donate-management' component={AdminDonate} />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App

// import logo from './logo.svg'
// import './App.css'

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }
