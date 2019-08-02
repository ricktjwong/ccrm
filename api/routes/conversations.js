var express = require('express')
var router = express.Router()
const dbConversations = require('../queries/conversations')

router.get('/', dbConversations.getConversations)

module.exports = router
