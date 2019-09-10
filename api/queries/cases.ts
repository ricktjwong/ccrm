import { Request, Response, NextFunction } from 'express'
import { Case } from '../models/Case'
import { Client } from '../models/Client'
import { Message } from '../models/Message'
import { Timeline } from '../models/Timeline'
import { User } from '../models/User'

// GET
const getCases = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cases = await Case.findAll()
    res.status(200).json(cases)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

const getCasesByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  try {
    const cases = await Case.findAll({ where: {userId: id} })
    res.status(200).json(cases)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

const getCasesByCaseId = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  try {
    const msfCase = await Case.findAll({
      include: [
        Client,
        Timeline,
        {
          model: Message,
          include: [
            {
              model: User,
              attributes: [ 'name', 'email' ],
            }
          ],
          // TODO: limit retrieval to n latest messages
        },
      ],
      where: { id } 
    })

    res.status(200).json(msfCase)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

module.exports = {
  getCases,
  getCasesByUserId,
  getCasesByCaseId,
}
