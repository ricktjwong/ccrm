import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { PrivateRoute } from '../components'
import { HomePage } from '../HomePage'
import { LoginPage } from '../LoginPage'
import { CreateUserPage } from '../CreateUserPage'
import { CasesViewPage } from '../CasesViewPage'
import { CaseViewPage } from '../CaseViewPage'

class App extends Component {
  render () {
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            <Router>
              <div>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route path="/create" component={CreateUserPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/cases" component={CasesViewPage} />
                <Route path="/case" component={CaseViewPage} />
              </div>
            </Router>
          </div>
        </div>
      </div>
    )
  }
}

export default App
