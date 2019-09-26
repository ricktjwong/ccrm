let SequelizeMock = require('sequelize-mock')
let DBConnectionMock = new SequelizeMock()

let EventMock = DBConnectionMock.define('events', {
  subject: 'Test event',
})

export default EventMock
