import React, { Component } from 'react'
import './casesview.css'

class CasesViewPage extends Component {
  constructor (props) {
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

  viewCase (caseId) {
    console.log('caseid: ' + caseId)
    this.props.history.push({
      pathname: '/case',
      state: { caseId: caseId },
    })
  }

  render () {
    this.listItems = this.state.cases.map((d) =>
      <li key={d.id}> {d.clientName} | {d.caseDesc} |
        {d.assignedAgency} - {d.agencyPoc} | {d.createdAt} |
        <button onClick={() => this.viewCase(d.id)}>View Case</button>
      </li>
    )

    return (
      <div className="cases">
        <p>Cases:</p>
        <p>{ this.listItems }</p>
      </div>
    )
  }
}

export { CasesViewPage }
