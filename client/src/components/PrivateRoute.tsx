import React, { Component } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { connect } from 'react-redux'

interface PrivateRouteProps extends RouteProps {
  component: any
  authenticated: boolean
}

class PrivateRoute extends Component<PrivateRouteProps, {}> {
  render () {
    const { component: Component, ...rest } = this.props
    return (
      <Route {...rest} render={(routeProps) =>
        this.props.authenticated
          ? (<Component {...routeProps} />)
          : (<Redirect to={{ pathname: '/login', state: { from: routeProps.location } }}/>)}
      />
    )
  }
}

function mapStateToProps (state: any) {
  return {
    authenticated: state.auth.authenticated,
  }
}

export default connect(mapStateToProps, {})(PrivateRoute)
