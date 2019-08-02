import React, { Component } from 'react'
import './home.css'

class HomePage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      conversations: [],
    }

    this.logout = this.logout.bind(this)
  }

  callAPI () {
    fetch('http://localhost:9000/conversations')
      .then(res => res.json())
      .then(res => this.setState({ conversations: res }))
      .catch(err => err)
  }

  componentDidMount () {
    this.callAPI()
    document.title = 'Home Page'
  }

  logout () {
    sessionStorage.clear()
    this.props.history.push('/')
  }

  render () {
    this.listItems = this.state.conversations.map((d) =>
      <li key={d.id}> {d.message}: {d.from} | {d.createdAt}</li>
    )

    console.log(this.state.conversations)

    return (
      <div className="home">
        <p>Successfully logged in</p>
        <p>Conversations:</p>
        <p>{ this.listItems }</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    )
  }
}

export { HomePage }
