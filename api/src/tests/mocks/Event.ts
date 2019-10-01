import DBConnectionMock from './Sequelize'

let EventMock = DBConnectionMock.define('events', {
  subject: 'Test event',
})

export default EventMock
