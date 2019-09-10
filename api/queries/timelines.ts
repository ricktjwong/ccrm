import { Request, Response, NextFunction } from 'express'
import { Model, Op } from 'sequelize'

import { Timeline } from '../models/Timeline'
import { Message } from '../models/Message'

import { IFindAll, ICreate } from '../utils/types'


// GET
export const getTimelines = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const timelines = await Timeline.findAll()
    res.status(200).json(timelines)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

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
        order: [
          ['createdAt', 'DESC']
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
      res.status(200).json(item)
    } catch (error) {
      console.error(error)
      const err = { status: error.status || 500, message: error }
      next(err)
    }
  }

export const getMessagesByCaseId = getTimelineItemsByCaseId(Message)
export const postMessageToCase = postTimelineItemToCase(Message)
