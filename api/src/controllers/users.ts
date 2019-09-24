import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { jwtConfig, cookieConfig } from '../config'
import { User } from '../models'
import { sendOTPViaEmail } from '../utils/mailer'

// GET
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  try {
    const user = await User.findOne({ where: {id} })
    res.status(200).json(user)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

// POST
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email } = req.body
  try {
    const user = await User.create({
      name: name,
      email: email,
    })
    res.status(201).json(user)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

// PUT
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body
  try {
    await User.update({
      name,
      email,
    }, { where: {id} })
    const user = await User.findOne({ where: {id} })
    res.status(200).json(user)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

// DELETE
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  try {
    await User.destroy({ where: {id} })
    res.status(200).json(`User deleted with ID: ${id}`)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

const genToken = (user: User) => {
  return jwt.sign({ sub: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiry })
}

export const validateEmail = async (req: any, res: Response, next: NextFunction) => {
  const data = req.body
  if (!data.email) {
    const err = { status: 400, message: 'Email missing' }
    next(err)
  } else {
    try {
      const user = await User.findOne({
        where: { email: data.email },
      })
      if (user) {
        req.data = { user }
        next()
      } else {
        const err = { status: 404, message: 'No user found' }
        next(err)
      }
    } catch (error) {
      const err = { status: error.status || 500, message: error }
      next(err)
    }
  }
}

export const sendAuthEmail = async (req: any, res: Response, next: NextFunction) => {
  let user = req.data.user
  let token = genToken(user)
  try {
    await sendOTPViaEmail(user.email, token)
    res.status(200).json({ id: user.id })
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

export const validateJWT = async (req: any, res: Response, next: NextFunction) => {
  let data = req.body
  if (data.token) {
    try {
      jwt.verify(data.token, jwtConfig.secret)
      next()
    } catch (error) {
      const err = { status: error.status || 500, message: error }
      next(err)
    }
  }
}

export const setCookieWithAuthToken = async (req: any, res: Response, next: NextFunction) => {
  let data = req.body
  try {
    if (data.token) {
      res.cookie(
        'jwt',
        data.token,
        {
          domain: cookieConfig.domain,
          path: '/',
          maxAge: parseInt(cookieConfig.expiry),
          httpOnly: true,
          secure: cookieConfig.secure,
        }
      )
      res.status(200).json(`Cookie set`)
    }
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}
