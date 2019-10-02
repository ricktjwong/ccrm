import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'

import { Sidebar } from 'components/Sidebar'
import { Case } from 'models/Case'
import { Message } from 'models/Message'
import Topbar from 'components/Topbar'

import * as actions from '../../redux/actions'
import './caseview.css'

interface Props extends RouteComponentProps {
  transferCaseToUser: (caseId: number, details: any) => Promise<any>,
  authenticated: boolean
}

interface State {
  case?: Case
  userTo: string
  caseId: number
}

class CaseViewPage extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      case: undefined, // case id known, but yet to retrieve case
      userTo: '',
      caseId: this.props.location.state.caseId,
    }

    this.setUserTo = this.setUserTo.bind(this)
  }

  setUserTo (event: any) {
    this.setState({ userTo: event.target.value })
  }

  async transferCase () {
    const userTo = Number(this.state.userTo)
    if (userTo) {
      await this.props.transferCaseToUser(this.state.caseId, userTo)
      if (this.props.authenticated) {
        this.fetchCaseInformation()
      }
    }
  }

  fetchCaseInformation () {
    fetch(process.env.REACT_APP_API_URL + '/cases/' + this.state.caseId, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => this.setState({ case: res }))
      .catch(err => err)
  }

  componentDidMount () {
    this.fetchCaseInformation()
    document.title = 'Case View'
  }

  render () {
    let caseDetails
    let messages
    let client

    if (this.state.case) {
      const { id, user, caseDesc, createdAt } = this.state.case
      caseDetails = <li key={id}> {user.agency}: {caseDesc} | {createdAt}</li>

      messages = this.state.case.messages.map((x: Message, idx: number) =>
        <li key={idx}> {x.userId} @ {x.createdAt} - {x.text}</li>
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
        <div className="transfer">
          Transfer to: <input value={this.state.userTo} onChange={this.setUserTo} />
          <button onClick={() => this.transferCase()}>Transfer</button>
        </div>
        <div className="content">
          Case:
          <p>{ caseDetails }</p>
          Messages:
          <p>{ messages }</p>
          Client Details:
          <p>{ client }</p>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state: any) {
  return {
    authenticated: state.auth.authenticated,
  }
}

export default connect(mapStateToProps, actions)(CaseViewPage)
