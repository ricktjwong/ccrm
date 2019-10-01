import DBConnectionMock from './Sequelize'

let MessageMock = DBConnectionMock.define('messages', {
  text: 'Test message',
  caseId: 1,
})

export default MessageMock
