import { Request, Response, NextFunction } from 'express'
import { Model, Op } from 'sequelize'

import { Message } from '../models/Message'
import { Event } from '../models/Event'
import { User } from '../models/User'

import { IFindAll, ICreate } from '../types'

// GET
const getTimelineItemsByCaseId = <T extends Model<T>>(MType: IFindAll<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { from = 0, to = Date.now(), limit = 20 } = req.query
      const caseId = Number(req.params.caseId)
      const items = await MType.findAll({
        where: {
          caseId,
          createdAt: { [Op.between]: [ new Date(from), new Date(to) ] },
        },
        include: [
          {
            model: User,
            attributes: [ 'name', 'email' ],
          },
        ],
        order: [
          ['createdAt', 'DESC'],
        ],
        limit,
      })
      res.status(200).json(items)
    } catch (error) {
      console.error(error)
      const err = { status: error.status || 500, message: error }
      next(err)
    }
  }

const postTimelineItemToCase = <T extends Model<T>>(MType: ICreate<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const caseId = Number(req.params.caseId)
      const user: any = req.user!
      const userId = Number(user.id)
      const payload = req.body
      const item = await MType.create({
        ...payload,
        userId,
        caseId,
      })
      res.status(201).json(item)
    } catch (error) {
      console.error(error)
      const err = { status: error.status || 500, message: error }
      next(err)
    }
  }

export const getMessagesByCaseId = getTimelineItemsByCaseId(Message)
export const postMessageToCase = postTimelineItemToCase(Message)

export const getEventsByCaseId = getTimelineItemsByCaseId(Event)
export const postEventToCase = postTimelineItemToCase(Event)
