import React, { Component } from 'react'
import { Sidebar } from 'components/Sidebar'
import { Topbar } from 'components/Topbar'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import './home.css'

interface HomePageConnectedProps extends RouteComponentProps{
  logout: () => void
}

class HomePage extends Component<HomePageConnectedProps> {
  constructor (props: HomePageConnectedProps) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  componentDidMount () {
    document.title = 'Home Page'
  }

  logout () {
    this.props.logout()
    this.props.history.push('/login')
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

export default connect(null, actions)(HomePage)
