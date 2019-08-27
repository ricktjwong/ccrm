import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Transition } from 'react-transition-group'

const duration = 200

const sidebarStyle = {
  transition: `width ${duration}ms`
}

const sidebarTransitionStyles = {
  entering: { width: 0 },
  entered: { width: '200px' },
  exiting: { width: '200px' },
  exited: { width: 0 }
}

const linkStyle = {
  transition: `opacity ${duration}ms`
}

const linkTransitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 }
}

class SidebarContent extends Component {

  constructor (props) {
    super(props)
    this.navTo = this.navTo.bind(this)
  }


  navTo(route) {
    this.props.history.push(route)
  }

  renderLinks = () => {
    return <Transition in={this.props.isOpen} timeout={duration}>
      {(state) => (
        <div style={{
          ...linkStyle,
          ...linkTransitionStyles[state]
        }}>
          <div onClick={() => this.navTo('/')} className="sidebar-link">My Workspace</div>
          <div className="sidebar-link">Inbox</div>
          <div onClick={() => this.navTo('/cases')} className="sidebar-link">Cases</div>
          <div className="sidebar-link">Reports</div>
          <div className="sidebar-link">Activity</div>
        </div>
      )}
    </Transition>
  }
  
  render() {
    return <Transition in={this.props.isOpen} timeout={duration}>
      {(state) => (
        <div className="sidebar" style={{
          ...sidebarStyle,
          ...sidebarTransitionStyles[state]
        }}>
          {this.renderLinks()}
        </div>
      )}
    </Transition>
  }
}

export default withRouter(SidebarContent)
