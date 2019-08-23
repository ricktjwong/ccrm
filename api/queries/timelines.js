let db = require('../models')
let models = db.models

// GET
const getTimelines = async (req, res) => {
  try {
    const timelines = await models.Timeline.findAll()
    res.status(200).json(timelines)
  } catch (error) {
    let err = { status: error.status || 500, message: error }
    next(err)
  }
}

module.exports = {
    getTimelines,
}
