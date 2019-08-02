let db = require('../models')
let models = db.models

// GET
const getConversations = async (req, res) => {
  try {
    const conversations = await models.Conversation.findAll()
    res.status(200).json(conversations)
  } catch (error) {
    let err = { status: error.status || 500, message: error }
    next(err)
  }
}

module.exports = {
  getConversations,
}
