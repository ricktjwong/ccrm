import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

interface PrivateRouteProps extends RouteProps {
  component: any
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props

  return (
    <Route {...rest} render={(routeProps) =>
      sessionStorage.getItem('user')
        ? (<Component {...routeProps} />)
        : (<Redirect to={{ pathname: '/login', state: { from: routeProps.location } }}/>)}
    />
  )
}
