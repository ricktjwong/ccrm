import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Sidebar } from 'components/Sidebar'
import { Case } from 'models/Case'
import { connect } from 'react-redux'
import Topbar from 'components/Topbar'
import * as actions from '../../redux/actions'
import './casesview.css'

interface Props extends RouteComponentProps {
  getCases: () => Promise<any>
  getPendingCases: () => Promise<any>
  acceptPendingCase: (caseId: number, details: any) => Promise<any>
  listItems: string[]
  authenticated: boolean
  data: any
}

interface CasesViewState {
  cases: Case[]
  pendingCases: Case[]
  caseId: number
  details: {
    userFrom: number
    userTo: number
    status: string
  }
}

class CasesViewPage extends Component<Props, CasesViewState> {
  constructor (props: Props) {
    super(props)

    this.state = {
      cases: [],
      pendingCases: [],
      caseId: 0,
      details: {
        userFrom: 0,
        userTo: 0,
        status: '',
      },
    }

    this.viewCase = this.viewCase.bind(this)
  }

  async callAPI () {
    await this.props.getCases()
    if (this.props.authenticated) {
      let cases = this.props.data.cases
      this.setState({ cases })
    }
    await this.props.getPendingCases()
    if (this.props.authenticated) {
      let pendingCases = this.props.data.pendingCases
      this.setState({ pendingCases })
    }
  }

  async acceptCase (caseId: number, details: any) {
    await this.props.acceptPendingCase(caseId, details)
    if (this.props.authenticated) {
      this.callAPI()
    }
  }

  componentDidMount () {
    this.callAPI()
    document.title = 'View Cases'
  }

  viewCase (caseId: number) {
    this.props.history.push({
      pathname: '/case',
      state: { caseId },
    })
  }

  render () {
    let listItems = this.state.cases.map((d: Case) =>
      <li key={d.id}> {d.client.name} | {d.caseDesc} |
        {d.user.agency} - {d.user.email} | {d.createdAt} |
        <button onClick={() => this.viewCase(d.id)}>View Case</button>
      </li>
    )

    let pendingItems = this.state.pendingCases.map((d: Case) =>
      <li key={d.id}> {d.client.name} | {d.caseDesc} |
        {d.user.agency} - {d.user.email} | {d.createdAt} |
        <button onClick={() => this.acceptCase(d.id, d.events[0].details)}>Accept Case</button>
      </li>
    )

    return (
      <div className="cases">
        <Topbar />
        <Sidebar />
        <div className="case-content">
          Cases:
          <p>{ listItems }</p>
          Pending Cases:
          <p>{ pendingItems }</p>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state: any) {
  return {
    authenticated: state.auth.authenticated,
    data: state.api.data,
  }
}

export default connect(mapStateToProps, actions)(CasesViewPage)
