import React, { Component } from 'react'
import { Sidebar } from 'components/Sidebar'
import { Topbar } from 'components/Topbar'
import { RouteComponentProps } from 'react-router'
import { Case } from 'models/Case'
import { Message } from 'models/Message'
import { Event } from 'models/Event'
import './caseview.css'

interface Props extends RouteComponentProps {}

interface State {
  cases: Case[]
  caseId: number
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
    fetch('http://localhost:9000/cases/' + this.state.caseId, {
      method: 'GET',
      credentials: 'include',
    })
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
    let messages
    let events
    let client

    if (this.state.cases.length > 0) {
      caseItems = this.state.cases.map((x) =>
        <li key={x.id}> {x.agencyPoc}: {x.caseDesc} | {x.createdAt}</li>
      )
      messages = this.state.cases[0].messages.map((x: Message, idx: number) =>
        <li key={idx}> {x.userId} @ {x.createdAt} - {x.text}</li>
      )
      events = this.state.cases[0].events.map((x: Event, idx: number) =>
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
          Messages:
          <p>{ messages }</p>
          Client Details:
          <p>{ client }</p>
          Timeline:
          <p>{ events }</p>
        </div>
      </div>
    )
  }
}

export { CaseViewPage }
