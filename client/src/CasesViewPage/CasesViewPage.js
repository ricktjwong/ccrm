import React, { Component } from 'react'
import './casesview.css'

class CasesViewPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cases: [],
    }

    this.logout = this.logout.bind(this)
  }

  callAPI () {
    let id = 1
    fetch('http://localhost:9000/cases/userId/' + id)
      .then(res => res.json())
      .then(res => this.setState({ cases: res }))
      .catch(err => err)
  }

  componentDidMount () {
    this.callAPI()
    document.title = 'View Cases'
  }

  logout () {
    sessionStorage.clear()
    this.props.history.push('/')
  }

  render () {
    this.listItems = this.state.cases.map((d) =>
      <li key={d.id}> {d.clientName} | {d.createdAt}</li>
    )

    console.log(this.state.cases)

    return (
      <div className="cases">
        <p>Cases:</p>
        <p>{ this.listItems }</p>
      </div>
    )
  }
}

export { CasesViewPage }
