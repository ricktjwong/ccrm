import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'

Modal.setAppElement('#root')

interface TopbarState {
  openCaseModal: boolean
  caseDesc: string
  clientId: number
  [key: string]: any
}

interface TopbarProps {
  createCase: (props: TopbarState) => Promise<any>
}

class Topbar extends Component<TopbarProps, TopbarState> {
  constructor (props: any) {
    super(props)

    this.state = {
      openCaseModal: false,
      caseDesc: '',
      clientId: 0,
    }

    this.openCaseModal = this.openCaseModal.bind(this)
    this.closeCaseModal = this.closeCaseModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event: any) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  async handleSubmit () {
    await this.props.createCase(this.state)
    this.closeCaseModal()
  }

  openCaseModal () {
    this.setState({ openCaseModal: true })
  }

  closeCaseModal () {
    this.setState({ openCaseModal: false })
  }

  render () {
    return (
      <div className="topbar">
        <div id="bar-text">CCRM</div>
        <div id="right" onClick={this.openCaseModal}>Create Case</div>
        <Modal
          isOpen={this.state.openCaseModal}
          contentLabel="Case Creation Modal"
        >
          <div className="input-label"> Case Description: </div>
          <input type="text" name="caseDesc" value={this.state.caseDesc} onChange={this.handleChange}/><br />

          <div className="input-label"> Client Id: </div>
          <input type="text" name="clientId" value={this.state.clientId} onChange={this.handleChange}/><br />

          <button onClick={this.handleSubmit}>Submit</button>
          <button onClick={this.closeCaseModal}>Close Modal</button>
        </Modal>
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

export default connect(mapStateToProps, actions)(Topbar)
