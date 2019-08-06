import React, { Component } from 'react'
import './caseview.css'

class CaseViewPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      case: [],
    }

    this.caseId = this.props.location.state.caseId
  }

  callAPI () {
    fetch('http://localhost:9000/cases/' + this.caseId)
      .then(res => res.json())
      .then(res => this.setState({ case: res }))
      .catch(err => err)
  }

  componentDidMount () {
    this.callAPI()
    document.title = 'Case View'
  }

  render () {
    if (this.state.case.length > 0) {
      this.caseItems = this.state.case.map((x) =>
        <li key={x.id}> {x.agencyPoc}: {x.caseDesc} | {x.createdAt}</li>
      )
      this.conversations = this.state.case[0].conversations.map((x, idx) =>
        <li key={idx}> {x.message} </li>
      )
      this.client = Object.keys(this.state.case[0].client).map((key, idx) =>
        <li key={idx}> {key}: {this.state.case[0].client[key]}</li>
      )
    }

    return (
      <div className="caseview">
        <p>Successfully logged in</p>
        <p>Case:</p>
        <p>{ this.caseItems }</p>
        Conversations:
        <p>{ this.conversations }</p>
        Client Details:
        <p>{ this.client }</p>
      </div>
    )
  }
}

export { CaseViewPage }
