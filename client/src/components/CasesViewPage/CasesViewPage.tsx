import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Topbar } from 'components/Topbar'
import { Sidebar } from 'components/Sidebar'
import { Case } from 'models/Case'
import './casesview.css'

interface Props extends RouteComponentProps {
  listItems: string[]
}

interface State {
  cases: Case[]
}

class CasesViewPage extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      cases: [],
    }

    this.viewCase = this.viewCase.bind(this)
  }

  callAPI () {
    let id = 1
    fetch(`http://localhost:9000/users/${id}/cases`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(cases => this.setState({ cases }))
      .catch(err => err)
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

export { CasesViewPage }
