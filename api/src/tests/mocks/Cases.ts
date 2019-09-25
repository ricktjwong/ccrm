let SequelizeMock = require('sequelize-mock')
let DBConnectionMock = new SequelizeMock()
let cases = require('../fixtures/cases.json')

let CaseMock = DBConnectionMock.define('cases', cases[0])

export default CaseMock
