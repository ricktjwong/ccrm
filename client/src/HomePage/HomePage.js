import React, { Component } from 'react'
import Sidebar from "react-sidebar"
import './home.css'

const mql = window.matchMedia(`(min-width: 800px)`)

class HomePage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      conversations: [],
      sidebarStyles: {
        sidebar: {
            width: '300px',
            paddingTop: '20px'
        }
      }
    }

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
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

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  componentDidMount () {
    this.callAPI()
    mql.addListener(this.mediaQueryChanged)
    document.title = 'Home Page'
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
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
          <Sidebar
            sidebar={
              <div>
                <li className='sidebar-element'>My Workspace</li>
                <li className='sidebar-element'>Inbox</li>
                <button className='nav-button' onClick={this.navToCases}><li className='sidebar-element'>Cases</li></button>
                <li className='sidebar-element'>Reports</li>
                <li className='sidebar-element'>Activity</li>
                <hr></hr>
                <li>Recent cases</li>
              </div>
            }
            open={this.state.sidebarOpen}
            docked={this.state.sidebarDocked}
            onSetOpen={this.onSetSidebarOpen}
            styles={this.state.sidebarStyles}
          >
          <div id='mainContent'>
            <p>My Workspace</p>
            <div id='textContent'>
              <p>Successfully logged in</p>
              <button onClick={this.logout}>Logout</button>
            </div>
          </div>
          </Sidebar>
        </div>
    )
  }
}

export { HomePage }
