import React, { Component } from 'react'
import './create.css'

class CreateUserPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      apiResponse: '',
      name: '',
      email: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  callAPI () {
    fetch('http://localhost:9000/users')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err)
  }

  createUser () {
    fetch('http://localhost:9000/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(res => {
        console.log(res.text())
      })
      .catch(err => err)
  }

  componentDidMount () {
    this.callAPI()
    document.title = 'Create User Page'
  }

  handleChange (event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit (event) {
    event.preventDefault()
    console.log(this.state)
    console.log('A name was submitted: ' + this.state)
    this.createUser()
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="login">
          <h1>Case Coordination and Referral Management</h1>
          Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/><br />
          Email:
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/><br />
          Password:
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/><br />
          <input type="submit" />
          <p>{this.state.apiResponse}</p>
        </div>
      </form>
    )
  }
}

export { CreateUserPage }
