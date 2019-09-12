import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import './login.css'

interface LoginPageProps extends RouteComponentProps {
  signin: (props: LoginPageState) => Promise<any>
  authenticated: boolean
  errorMessage: string
}

interface LoginPageState {
  email: string
  password: string
  [key: string]: string
}

class LoginPage extends Component<LoginPageProps, LoginPageState> {
  constructor (props: LoginPageProps) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async login () {
    await this.props.signin(this.state)
    if (this.props.authenticated) {
      this.props.history.push('/')
    } else {
      console.error('login error')
    }
  }

  componentDidMount () {
    document.title = 'Login Page'
  }

  handleChange (event: any) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit () {
    this.login()
  }

  render () {
    return (
      <div className="login">

        <div id="logo-box">
          <div id="logo">C</div>
          <h1>CCRM</h1>
          <p>Sign in with your registered email</p>
        </div>

        <div id="login-box">
          <div className="input-label"> Your Email: </div>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/><br />
          <div className="input-label"> Enter password: </div>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/><br />
          <button id="login-button" onClick={this.handleSubmit} >Sign In</button>
        </div>
        <p>Don&apos;t have an account? Contact CCRM team</p>
      </div>
    )
  }
}

function mapStateToProps (state: any) {
  return {
    errorMessage: state.auth.errorMessage,
    authenticated: state.auth.authenticated,
  }
}

export default connect(mapStateToProps, actions)(LoginPage)
