import React, { Component } from 'react'
import Sidebar from "components/Sidebar"
import Topbar from "components/Topbar"
import './home.css'

class HomePage extends Component {
  constructor (props) {
    super(props)

    this.state = { 
      conversations: [],
    }

    this.navToCases = this.navToCases.bind(this)
    this.logout = this.logout.bind(this)
  }

  callAPI () {
    fetch('http://localhost:9000/conversations')
      .then(res => res.json())
      .then(res => this.setState({ conversations: res }))
      .catch(err => err)
  }

  navToCases() {
    this.props.history.push('/cases')
  }

  componentDidMount () {
    this.callAPI()
    document.title = 'Home Page'
  }

  logout () {
    sessionStorage.clear()
    this.props.history.push('/')
  }

  render () {
    this.listItems = this.state.conversations.map((d) =>
      <li key={d.id}> {d.message}: {d.from} | {d.createdAt}</li>
    )

    console.log(this.state.conversations)

    return (
        <div className='home'>
          <Topbar />
          <Sidebar />
          <div id="mainContent">
            Successfully logged in
            <button onClick={this.logout}>Logout</button>
          </div>
          {/* <div id='mainContent'>
            <p>My Workspace</p>
            <div id='textContent'>
              <p>Successfully logged in</p>
              <button onClick={this.logout}>Logout</button>
            </div>
          </div>*/}
        </div>
    )
  }
}

export { HomePage }
