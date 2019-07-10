import React, { Component } from 'react'
import './home.css'

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout () {
    sessionStorage.clear()
    this.props.history.push('/')
  }

  render () {
    return (
      <div className="home">
        <p>Successfully logged in</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    )
  }
}

export { HomePage }
