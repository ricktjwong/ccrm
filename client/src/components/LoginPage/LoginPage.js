import React, { Component } from 'react'
import './login.css'

class LoginPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  login () {
    fetch('http://localhost:9000/users/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.isValid) {
          sessionStorage.setItem('user', JSON.stringify('user'))
          this.props.history.push('/')
        } else {
          console.error('Error: ', res)
        }
      })
      .catch(function (err) {
        console.error('Login Error: ', err)
      })
  }

  componentDidMount () {
    document.title = 'Login Page'
  }

  handleChange (event) {
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
          <button id="login-button" onClick={this.handleSubmit}>Sign In</button>
        </div>
        <p>Don't have an account? Contact CCRM team</p>
      </div>
    )
  }
}

export { LoginPage }
