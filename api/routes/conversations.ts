import express from 'express'
let router = express.Router()
const dbConversations = require('../queries/conversations')

router.get('/', dbConversations.getConversations)

export default router
