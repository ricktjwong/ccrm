let SequelizeMock = require('sequelize-mock')
let DBConnectionMock = new SequelizeMock()
let users = require('../fixtures/users.json')

let UserMock = DBConnectionMock.define('users', users[0])

export default UserMock
