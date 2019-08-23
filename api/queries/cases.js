let db = require('../models')
let models = db.models

// GET
const getCases = async (req, res, next) => {
  try {
    const cases = await models.Case.findAll()
    res.status(200).json(cases)
  } catch (error) {
    let err = { status: error.status || 500, message: error }
    next(err)
  }
}

const getCasesByUserId = async (req, res, next) => {
  const id = parseInt(req.params.id)
  try {
    let cases = await models.Case.findAll({ where: {userId: id} })
    res.status(200).json(cases)
  } catch (error) {
    let err = { status: error.status || 500, message: error }
    next(err)
  }
}

const getCasesByCaseId = async (req, res, next) => {
  const id = parseInt(req.params.id)
  try {
    let msfCase = await models.Case.findAll({
      include: [models.Client,
                models.Conversation,
                models.Timeline],
                where: {id: id} })

    res.status(200).json(msfCase)
  } catch (error) {
    let err = { status: error.status || 500, message: error }
    next(err)
  }
}

module.exports = {
  getCases,
  getCasesByUserId,
  getCasesByCaseId,
}
