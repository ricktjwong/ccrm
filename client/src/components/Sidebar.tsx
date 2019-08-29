import React, { Component } from 'react'
import SidebarContent from './SidebarContent'
import { FaBars } from 'react-icons/fa'

interface State {
  isOpen: boolean
}

class Sidebar extends Component<{}, State> {
  constructor (props: any) {
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
        <div id="icon" onClick={this.toggleSidebar}><FaBars/></div>
      </div>
    </div>
  }
}

export default Sidebar
