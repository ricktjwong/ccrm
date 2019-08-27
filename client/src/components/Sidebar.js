import React, { Component } from 'react'
import SidebarContent from './SidebarContent'
import SidebarIcon from './SidebarIcon'

class Sidebar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: true,
    }

    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  toggleSidebar () {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))
  }

  render () {
    return <div className="sidebar-container">
      <SidebarContent isOpen={this.state.isOpen} />
      <div className="sidebar-icon">
        <SidebarIcon isOpen={this.state.isOpen} handleClick={this.toggleSidebar} />
      </div>
    </div>
  }
}

export default Sidebar
