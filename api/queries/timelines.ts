import { Request, Response, NextFunction } from 'express'
import { Timeline } from '../models/Timeline'

// GET
const getTimelines = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const timelines = await Timeline.findAll()
    res.status(200).json(timelines)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

module.exports = {
  getTimelines,
}
