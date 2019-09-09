import express from 'express'
let router = express.Router()
const dbCases = require('../queries/cases')

router.get('/', dbCases.getCases)
router.get('/:id', dbCases.getCasesByCaseId)
router.get('/userId/:id', dbCases.getCasesByUserId)

export default router
