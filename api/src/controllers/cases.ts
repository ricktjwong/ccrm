import { Request, Response, NextFunction } from 'express'
import { Case, Client, Message, Event, User } from '../models'
import { sequelize } from '../sequelize'

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

// This sequelize query gets all cases containing events with subject `Transfer` where userTo matches
// the current userId making the query. We then filter the cases to only get `Pending` cases, removing the
// cases where details.status is `Accept`
export const getPendingCases = async (req: Request, res: Response, next: NextFunction) => {
  const user: any = req.user!
  const userId = Number(user.id)
  try {
    const cases = await Case.findAll({
      include: [
        {
          model: Event,
          where: {
            details: {
              userTo: userId,
            },
          },
        },
        Client,
        User,
      ],
    })
    const pendingCases = cases.filter((thisCase: Case) =>
      thisCase.events[thisCase.events.length - 1].details.status === 'Pending'
    )
    res.status(200).json(pendingCases)
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

export const createCase = async (req: Request, res: Response, next: NextFunction) => {
  const userId = Number(req.params.id)
  const data = req.body
  const payload = { subject: 'Created', details: { userId } }
  data.collaborators = [userId]
  let transaction
  try {
    transaction = await sequelize.transaction()
    const thisCase: Case = await Case.create({
      caseDesc: data.caseDesc,
      clientId: data.clientId,
      collaborators: data.collaborators,
      userId,
    })
    await Event.create(
      { ...payload, userId, caseId: thisCase.id },
      { transaction }
    )
    await transaction.commit()
    res.status(201).json('Case transaction complete')
  } catch (error) {
    if (transaction) await transaction.rollback()
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

export const updateCaseWithUserAndCreateEvent = async (req: Request, res: Response, next: NextFunction) => {
  const caseId = parseInt(req.params.id)
  const user: any = req.user!
  const userId = Number(user.id)
  const { details } = req.body
  const payload = { subject: 'Transfer', details }
  let transaction
  try {
    transaction = await sequelize.transaction()
    await Case.update(
      { userId },
      { where: { id: caseId }, transaction }
    )
    await Event.create(
      { ...payload, userId, caseId },
      { transaction }
    )
    await transaction.commit()
    res.status(200).json('Transaction complete')
  } catch (error) {
    if (transaction) await transaction.rollback()
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}
