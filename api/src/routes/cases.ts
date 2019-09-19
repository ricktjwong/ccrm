import express from 'express'
import { checkSchema } from 'express-validator'
import { getMessagesByCaseId, postMessageToCase, getEventsByCaseId, postEventToCase } from '../queries/timelines'

import { checkValidationPassed } from '../utils/express'

const dbCases = require('../queries/cases')

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

router.post('/:caseId/events', postEventToCase)
router.get(
  '/:caseId/events',
  checkValidTimelineQuery,
  checkValidationPassed,
  getEventsByCaseId
)

export default router
