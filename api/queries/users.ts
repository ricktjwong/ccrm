import jwt from 'jwt-simple'
import { Request, Response, NextFunction } from 'express'
import { jwtConfig } from '../config'
import { User } from '../models/User'
import { sendOTPViaEmail } from '../utils/mailer'

// GET
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  try {
    const user = await User.findAll({ where: {id} })
    res.status(200).json(user)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

// POST
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email } = req.body
  try {
    const user = await User.create({
      name: name,
      email: email,
    })
    res.status(201).send(`User added with ID: ${user.id}`)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

// PUT
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body
  try {
    await User.update({
      name,
      email,
    }, { where: {id} })
    res.status(200).send(`User modified with ID: ${id}`)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

// DELETE
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  try {
    await User.destroy({ where: {id} })
    res.status(200).send(`User deleted with ID: ${id}`)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

const genToken = (user: User) => {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, jwtConfig.secret)
}

const validateEmail = async (req: any, res: Response, next: NextFunction) => {
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

const sendAuthEmail = async (req: any, res: Response, next: NextFunction) => {
  let user = req.data.user
  let token = genToken(user)
  try {
    await sendOTPViaEmail(user.email, token)
    res.status(200).json(`Email sent`)
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

const validateJWT = async (req: any, res: Response, next: NextFunction) => {
  let data = req.body
  if (data.token) {
    try {
      jwt.decode(data.token, jwtConfig.secret)
      next()
    } catch (error) {
      const err = { status: error.status || 500, message: error }
      next(err)
    }
  }
}

const setCookieWithAuthToken = async (req: any, res: Response, next: NextFunction) => {
  let data = req.body
  try {
    if (data.token) {
      res.cookie(
        'jwt',
        data.token,
        {
          domain: jwtConfig.cookieDomain,
          path: '/',
          maxAge: parseInt(jwtConfig.maxAge),
          httpOnly: true,
          secure: jwtConfig.secure,
        }
      )
      res.status(200).send(`Cookie set`)
    }
  } catch (error) {
    const err = { status: error.status || 500, message: error }
    next(err)
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  validateEmail,
  sendAuthEmail,
  validateJWT,
  setCookieWithAuthToken,
}
