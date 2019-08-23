var express = require('express')
var router = express.Router()
const dbConversations = require('../queries/timelines')

router.get('/', dbConversations.getTimelines)

module.exports = router
