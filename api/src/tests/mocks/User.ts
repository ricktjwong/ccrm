import DBConnectionMock from './Sequelize'

let users = require('../fixtures/users.json')
let UserMock = DBConnectionMock.define('users', users[0])

export default UserMock
