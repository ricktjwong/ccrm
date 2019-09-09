import express from 'express'
let router = express.Router()
const dbCases = require('../queries/cases')

router.get('/', dbCases.getCases)
router.get('/:id', dbCases.getCasesByCaseId)

// TODO: add endpoints that CRUD conversations 
// and timeline events for a given case

export default router
