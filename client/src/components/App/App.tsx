import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { PrivateRoute } from 'components/PrivateRoute'
import HomePage from 'components/HomePage/HomePage'
import LoginPage from 'components/LoginPage/LoginPage'
import { CreateUserPage } from 'components/CreateUserPage'
import { CasesViewPage } from 'components/CasesViewPage'
import { CaseViewPage } from 'components/CaseViewPage'
import { Provider } from 'react-redux'
import store from '../../redux/store'

const App = () =>
  <Provider store={store}>
    <Router>
      <PrivateRoute exact path="/" component={HomePage} />
      <PrivateRoute path="/create" component={CreateUserPage} />
      <Route path="/login" component={LoginPage} />
      <PrivateRoute path="/cases" component={CasesViewPage} />
      <PrivateRoute path="/case" component={CaseViewPage} />
    </Router>
  </Provider>

export default App
