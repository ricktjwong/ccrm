import React, { Component } from 'react'
import './caseview.css'
import Sidebar from 'components/Sidebar';
import Topbar from 'components/Topbar';

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
      console.log(this.state.case)
      this.caseItems = this.state.case.map((x) =>
        <li key={x.id}> {x.agencyPoc}: {x.caseDesc} | {x.createdAt}</li>
      )
      this.conversations = this.state.case[0].conversations.map((x, idx) =>
        <li key={idx}> {x.message} </li>
      )
      this.timelines = this.state.case[0].timelines.map((x, idx) =>
        <li key={idx}> {x.subject} | {x.details} </li>
      )
      this.client = Object.keys(this.state.case[0].client).map((key, idx) =>
        <li key={idx}> {key}: {this.state.case[0].client[key]}</li>
      )
    }

    return (
      <div className="caseview">
        <Topbar />
        <Sidebar />
        <div className="content">
          Case:
          <p>{ this.caseItems }</p>
          Conversations:
          <p>{ this.conversations }</p>
          Client Details:
          <p>{ this.client }</p>
          Timelines:
          <p>{ this.timelines }</p>
        </div>
      </div>
    )
  }
}

export { CaseViewPage }
