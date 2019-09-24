import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export const checkValidationPassed = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  } else {
    return next()
  }
}

export const validateUserId = async (req: Request, _res: Response, next: NextFunction) => {
  if (parseInt(req.params.id) !== req.user!.id) {
    const err = { status: 401 }
    next(err)
  } else {
    next()
  }
}
