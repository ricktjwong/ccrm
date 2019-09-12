import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Topbar } from 'components/Topbar'
import { Sidebar } from 'components/Sidebar'
import { Case } from 'models/Case'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import './casesview.css'

interface Props extends RouteComponentProps {
  getCases: () => Promise<any>
  listItems: string[]
  authenticated: boolean
  data: any
}

interface CasesViewState {
  cases: Case[]
}

class CasesViewPage extends Component<Props, CasesViewState> {
  constructor (props: Props) {
    super(props)

    this.state = {
      cases: [],
    }

    this.viewCase = this.viewCase.bind(this)
  }

  async callAPI () {
    await this.props.getCases()
    if (this.props.authenticated) {
      let cases = this.props.data
      this.setState({ cases })
    }
  }

  componentDidMount () {
    this.callAPI()
    document.title = 'View Cases'
  }

  viewCase (caseId: number) {
    this.props.history.push({
      pathname: '/case',
      state: { caseId: caseId },
    })
  }

  render () {
    let listItems = this.state.cases.map((d: Case) =>
      <li key={d.id}> {d.clientName} | {d.caseDesc} |
        {d.assignedAgency} - {d.agencyPoc} | {d.createdAt} |
        <button onClick={() => this.viewCase(d.id)}>View Case</button>
      </li>
    )

    return (
      <div className="cases">
        <Topbar />
        <Sidebar />
        <div className="case-content">
          Cases:
          <p>{ listItems }</p>
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
