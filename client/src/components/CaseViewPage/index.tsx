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
  case?: Case
  caseId: number
}

class CaseViewPage extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      case: undefined, // case id known, but yet to retrieve case
      caseId: this.props.location.state.caseId,
    }
  }

  callAPI () {
    fetch('http://localhost:9000/cases/' + this.state.caseId, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => this.setState({ case: res }))
      .catch(err => err)
  }

  componentDidMount () {
    this.callAPI()
    document.title = 'Case View'
  }

  render () {
    let caseDetails
    let messages
    let events
    let client

    if (this.state.case) {
      const { id, user, caseDesc, createdAt } = this.state.case
      caseDetails = <li key={id}> {user.agency}: {caseDesc} | {createdAt}</li>

      messages = this.state.case.messages.map((x: Message, idx: number) =>
        <li key={idx}> {x.userId} @ {x.createdAt} - {x.text}</li>
      )
      events = this.state.case.events.map((x: Event, idx: number) =>
        <li key={idx}> {x.subject} | {x.details} </li>
      )
      let clientData = this.state.case.client

      client = Object.entries(clientData).map((tuple: [string, string | number | Date], idx: number) => {
        const [key, value] = tuple
        return <li key={idx}> {key}: {value}</li>
      })
    }

    return (
      <div className="caseview">
        <Topbar />
        <Sidebar />
        <div className="content">
          Case:
          <p>{ caseDetails }</p>
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

export default CaseViewPage
