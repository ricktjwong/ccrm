import express from 'express'
let router = express.Router()
const dbConversations = require('../queries/timelines')

router.get('/', dbConversations.getTimelines)

export default router
