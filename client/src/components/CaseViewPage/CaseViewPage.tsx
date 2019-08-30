import React, { Component } from 'react'
import Sidebar from 'components/Sidebar'
import { Topbar } from 'components/Topbar'
import { RouteComponentProps } from 'react-router'
import { Case } from 'models/Case'
import { Conversation } from 'models/Conversation'
import { Timeline } from 'models/Timeline'
import './caseview.css'

interface Props extends RouteComponentProps {}

interface State {
  cases: Case[]
    caseId: string;
}

class CaseViewPage extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      cases: [],
      caseId: this.props.location.state.caseId,
    }
  }

  callAPI () {
    fetch('http://localhost:9000/cases/' + this.state.caseId)
      .then(res => res.json())
      .then(res => this.setState({ cases: res }))
      .catch(err => err)
  }

  componentDidMount () {
    this.callAPI()
    document.title = 'Case View'
  }

  render () {
    let caseItems
    let conversations
    let timelines
    let client

    if (this.state.cases.length > 0) {
      caseItems = this.state.cases.map((x) =>
        <li key={x.id}> {x.agencyPoc}: {x.caseDesc} | {x.createdAt}</li>
      )
      conversations = this.state.cases[0].conversations.map((x: Conversation, idx: number) =>
        <li key={idx}> {x.message} </li>
      )
      timelines = this.state.cases[0].timelines.map((x: Timeline, idx: number) =>
        <li key={idx}> {x.subject} | {x.details} </li>
      )
      let clientData = this.state.cases[0].client
      client = Object.keys(clientData).map((key: string, idx: number) =>
        <li key={idx}> {key}: {clientData[key]}</li>
      )
    }

    return (
      <div className="caseview">
        <Topbar />
        <Sidebar />
        <div className="content">
          Case:
          <p>{ caseItems }</p>
          Conversations:
          <p>{ conversations }</p>
          Client Details:
          <p>{ client }</p>
          Timelines:
          <p>{ timelines }</p>
        </div>
      </div>
    )
  }
}

export { CaseViewPage }
