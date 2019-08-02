let db = require('../models')
let models = db.models

// GET
const getCases = async (req, res) => {
  try {
    const cases = await models.Case.findAll()
    res.status(200).json(cases)
  } catch (error) {
    let err = { status: error.status || 500, message: error }
    next(err)
  }
}

const getCasesByUserId = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    let cases = await models.Case.findAll({ where: {userId: id} })
    res.status(200).json(cases)
  } catch (error) {
    let err = { status: error.status || 500, message: error }
    next(err)
  }
}

const getCasesByCaseId = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    let cases = await models.Case.findAll({ where: {id: id} })
    res.status(200).json(cases)
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
