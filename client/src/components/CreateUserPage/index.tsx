import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import './create.css'

interface Props extends RouteComponentProps {}

interface State {
  apiResponse: string
  name: string
  email: string
  [key: string]: string
}

class CreateUserPage extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      apiResponse: '',
      name: '',
      email: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  callAPI () {
    fetch(process.env.REACT_APP_API_URL + '/users')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err)
  }

  createUser () {
    fetch(process.env.REACT_APP_API_URL + '/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
      }),
    })
      .then(res => {
        res.text()
      })
      .catch(err => err)
  }

  componentDidMount () {
    this.callAPI()
    document.title = 'Create User Page'
  }

  handleChange (event: any) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit (event: any) {
    event.preventDefault()
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
          <input type="submit" />
          <p>{this.state.apiResponse}</p>
        </div>
      </form>
    )
  }
}

export default CreateUserPage
