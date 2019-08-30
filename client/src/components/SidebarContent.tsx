import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Transition } from 'react-transition-group'

const duration = 200

const sidebarStyle = {
  transition: `width ${duration}ms`,
}

const sidebarTransitionStyles: {[key: string]: {[key: string]: string}} = {
  entering: { width: '0px' },
  entered: { width: '200px' },
  exiting: { width: '200px' },
  exited: { width: '0px' },
}

const linkStyle = {
  transition: `opacity ${duration}ms`,
}

const linkTransitionStyles: {[key: string]: {[key: string]: number}} = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
}

interface Props extends RouteComponentProps {
  isOpen: boolean
}

class SidebarContent extends Component<Props, {}> {
  constructor (props: Props) {
    super(props)
    this.navTo = this.navTo.bind(this)
  }

  navTo (route: string) {
    this.props.history.push(route)
  }

  renderLinks = () => {
    return <Transition in={this.props.isOpen} timeout={duration}>
      {(state: any) => (
        <div style={{
          ...linkStyle,
          ...linkTransitionStyles[state],
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

  render () {
    return (
      <Transition in={this.props.isOpen} timeout={duration}>
        {(state: any) => (
          <div className="sidebar" style={{
            ...sidebarStyle,
            ...sidebarTransitionStyles[state],
          }}>
            {this.renderLinks()}
          </div>
        )}
      </Transition>
    )
  }
}

export default withRouter(SidebarContent)
