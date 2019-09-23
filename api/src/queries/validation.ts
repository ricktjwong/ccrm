import { Response, NextFunction } from 'express'

export const validateUserId = async (req: any, res: Response, next: NextFunction) => {
  if (parseInt(req.params.id) !== req.user.id) {
    const err = { status: 401 }
    next(err)
  } else {
    next()
  }
}
