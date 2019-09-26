let SequelizeMock = require('sequelize-mock')
let DBConnectionMock = new SequelizeMock()

let MessageMock = DBConnectionMock.define('messages', {
  text: 'Test message',
  caseId: 1,
})

export default MessageMock
