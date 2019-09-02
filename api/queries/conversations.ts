import { Request, Response, NextFunction } from 'express'
import { Conversation } from '../models/Conversation'

// GET
const getConversations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conversations = await Conversation.findAll()
    res.status(200).json(conversations)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

module.exports = {
  getConversations,
}
