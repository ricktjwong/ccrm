import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import queryString from 'query-string'
import * as actions from '../../redux/actions'
import './login.css'

interface LoginPageProps extends RouteComponentProps {
  validateEmailAndSendAuthToken: (props: LoginPageState) => Promise<any>
  validateJWTAndSetCookie: (token: string) => Promise<any>
  authenticated: boolean
  errorMessage: string
  emailValid: boolean
}

interface LoginPageState {
  email: string
  [key: string]: string
}

class LoginPage extends Component<LoginPageProps, LoginPageState> {
  constructor (props: LoginPageProps) {
    super(props)

    this.state = {
      email: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async getQueryString () {
    let qs = queryString.parse(this.props.location.search)
    if (Object.keys(qs).length === 1 && Object.keys(qs)[0] === 'token') {
      let token = qs['token'] as string
      await this.props.validateJWTAndSetCookie(token)
      if (this.props.authenticated) {
        this.props.history.push('/')
      } else {
        console.error('Login error')
        console.error(this.props.errorMessage)
      }
    }
  }

  async submitEmail () {
    try {
      await this.props.validateEmailAndSendAuthToken(this.state)
    } catch (error) {
      console.error(error)
    }
  }

  componentDidMount () {
    document.title = 'Login Page'
    try {
      this.getQueryString()
    } catch (e) {
      console.error(e)
    }
  }

  handleChange (event: any) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit () {
    this.submitEmail()
  }

  render () {
    let emailStatus
    if (this.props.emailValid) {
      emailStatus = <p id='email-status'>Sign in link has been sent to email!</p>
    }
    return (
      <div className="login">

        <div id="logo-box">
          <div id="logo">C</div>
          <h1>CCRM</h1>
          <p>Enter your email to get a sign in link</p>
        </div>

        <div id="login-box">
          <div className="input-label"> Your Email: </div>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/><br />
          <button id="login-button" onClick={this.handleSubmit} >Get Link</button>
        </div>

        <p>Don&apos;t have an account? Contact CCRM team</p>
        { emailStatus }
      </div>
    )
  }
}

function mapStateToProps (state: any) {
  return {
    errorMessage: state.auth.errorMessage,
    authenticated: state.auth.authenticated,
    emailValid: state.email.emailValid,
  }
}

export default connect(mapStateToProps, actions)(LoginPage)
