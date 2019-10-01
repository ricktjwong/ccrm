import express from 'express'
import { checkSchema } from 'express-validator'
import { getMessagesByCaseId, postMessageToCase, getEventsByCaseId, postEventToCase } from '../controllers/timelines'
import { getCases, getCasesByCaseId, updateCaseWithUserAndCreateEvent } from '../controllers/cases'
import { checkValidationPassed } from '../controllers/validation'

let router = express.Router()

router.get('/', getCases)
router.get('/:id', getCasesByCaseId)

router.post('/:id/transfer', postEventToCase)
router.put('/:id/transfer/accept', updateCaseWithUserAndCreateEvent)

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

router.post('/:id/messages', postMessageToCase)
router.get(
  '/:caseId/messages',
  checkValidTimelineQuery,
  checkValidationPassed,
  getMessagesByCaseId
)

router.post('/:id/events', postEventToCase)
router.get(
  '/:id/events',
  checkValidTimelineQuery,
  checkValidationPassed,
  getEventsByCaseId
)

export default router
