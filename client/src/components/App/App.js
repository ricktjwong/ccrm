import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { PrivateRoute } from 'components/PrivateRoute'
import { HomePage } from 'components/HomePage'
import { LoginPage } from 'components/LoginPage'
import { CreateUserPage } from 'components/CreateUserPage'
import { CasesViewPage } from 'components/CasesViewPage'
import { CaseViewPage } from 'components/CaseViewPage'

class App extends Component {
  render () {
    return (
      <div>
        <Router>
          <div>
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/create" component={CreateUserPage} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/cases" component={CasesViewPage} />
            <PrivateRoute path="/case" component={CaseViewPage} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
