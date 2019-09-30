import { Request, Response, NextFunction } from 'express'
import { Case, Client, Message, Event, User } from '../models'

// GET
export const getCases = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cases = await Case.findAll()
    res.status(200).json(cases)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

export const getCasesByUserId = async (req: any, res: Response, next: NextFunction) => {
  const userId = parseInt(req.params.id)
  try {
    const cases = await Case.findAll({
      where: { userId },
      include: [ Client, User ],
    })

    res.status(200).json(cases)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

export const getPendingCases = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cases = await Case.findAll({
      include: [
        {
          model: Event,
          where: {
            details: {
              userTo: 1,
            },
          },
        },
        Client,
        User,
      ],
    })
    res.status(200).json(cases)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

export const getCasesByCaseId = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  try {
    const thisCase = await Case.findByPk(id, {
      include: [
        Client,
        User,
        {
          model: Event,
          include: [
            {
              model: User,
              attributes: [ 'name', 'email' ],
            },
          ],
          // TODO: limit retrieval to n latest events
        },
        {
          model: Message,
          include: [
            {
              model: User,
              attributes: [ 'name', 'email' ],
            },
          ],
          // TODO: limit retrieval to n latest messages
        },
      ],
    })

    res.status(200).json(thisCase)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

export const updateCaseWithNewUser = async (req: Request, res: Response, next: NextFunction) => {
  const caseId = parseInt(req.params.id)
  const user: any = req.user!
  const userId = Number(user.id)
  const { details } = req.body
  try {
    await Case.update({
      userId,
    }, { where: { id: caseId } })
    req.body = { subject: 'Transfer', details }
    next()
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}
