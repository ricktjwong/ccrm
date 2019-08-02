var express = require('express')
var router = express.Router()
const dbCases = require('../queries/cases')

router.get('/', dbCases.getCases)
router.get('/:id', dbCases.getCasesByCaseId)
router.get('/userId/:id', dbCases.getCasesByUserId)

module.exports = router
