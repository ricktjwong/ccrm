import DBConnectionMock from './Sequelize'
let cases = require('../fixtures/cases.json')

let CaseMock = DBConnectionMock.define('cases', cases[0])
CaseMock.findByPk = (query: any) => CaseMock.findById(query)

export default CaseMock
