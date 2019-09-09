import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { PrivateRoute } from 'components/PrivateRoute'
import { HomePage } from 'components/HomePage'
import { LoginPage } from 'components/LoginPage'
import { CreateUserPage } from 'components/CreateUserPage'
import { CasesViewPage } from 'components/CasesViewPage'
import { CaseViewPage } from 'components/CaseViewPage'

const App = () =>
  <Router>
    <PrivateRoute exact path="/" component={HomePage} />
    <PrivateRoute path="/create" component={CreateUserPage} />
    <Route path="/login" component={LoginPage} />
    <PrivateRoute path="/cases" component={CasesViewPage} />
    <PrivateRoute path="/case" component={CaseViewPage} />
  </Router>

export default App