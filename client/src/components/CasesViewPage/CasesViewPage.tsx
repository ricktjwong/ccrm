import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Topbar } from 'components/Topbar'
import Sidebar from 'components/Sidebar'
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
    fetch('http://localhost:9000/cases/userId/' + id)
      .then(res => res.json())
      .then(res => this.setState({ cases: res }))
      .catch(err => err)
  }

  componentDidMount () {
    this.callAPI()
    document.title = 'View Cases'
  }

  viewCase (caseId: string) {
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
