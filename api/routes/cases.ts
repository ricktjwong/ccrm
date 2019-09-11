import express from 'express'
import { checkSchema } from 'express-validator'

const dbCases = require('../queries/cases')
import { getMessagesByCaseId, postMessageToCase }  from '../queries/timelines'

import { checkValidationPassed } from '../utils/express'

let router = express.Router()

router.get('/', dbCases.getCases)
router.get('/:id', dbCases.getCasesByCaseId)

// TODO: add endpoints that CRUD timeline events for a given case

const checkValidTimelineQuery = checkSchema({
  from: {
    in: ['query'],
    isInt: true,
    toInt: true,
    optional: { options: { nullable: true } },
  },
  to: {
    in: ['query'],
    isInt: true,
    toInt: true,
    optional: { options: { nullable: true } },
  },
  limit: {
    in: ['query'],
    isInt: { options: { max: 50 } },
    toInt: true,
    optional: { options: { nullable: true } },
  },
})

router.post('/:caseId/messages', postMessageToCase)
router.get(
  '/:caseId/messages',
  checkValidTimelineQuery,
  checkValidationPassed,
  getMessagesByCaseId
)

export default router
