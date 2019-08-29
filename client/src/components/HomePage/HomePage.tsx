import React, { Component } from 'react'
import Sidebar from 'components/Sidebar'
import { Topbar } from 'components/Topbar'
import { RouteComponentProps } from 'react-router'
import './home.css'

class HomePage extends Component<RouteComponentProps> {
  constructor (props: RouteComponentProps) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  componentDidMount () {
    document.title = 'Home Page'
  }

  logout () {
    sessionStorage.clear()
    this.props.history.push('/')
  }

  render () {
    return (
      <div className="home">
        <Topbar />
        <Sidebar />
        <div id="mainContent">
          Successfully logged in
          <button onClick={this.logout}>Logout</button>
        </div>
      </div>
    )
  }
}

export { HomePage }
