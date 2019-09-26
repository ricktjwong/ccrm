let SequelizeMock = require('sequelize-mock')
let DBConnectionMock = new SequelizeMock()
let cases = require('../fixtures/cases.json')

let CaseMock = DBConnectionMock.define('cases', cases[0])
CaseMock.findByPk = (query: any) => CaseMock.findById(query)

export default CaseMock
