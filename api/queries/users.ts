import * as bcrypt from 'bcrypt'
import jwt from 'jwt-simple'
import { Request, Response, NextFunction } from 'express'
import { jwtConfig } from '../config'
import { User } from '../models/User'

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

const getUserByEmail = async (req: any, res: Response, next: NextFunction) => {
  const data = req.body
  if (!data.email || !data.password) {
    const err = { status: 400, message: 'Email and/or password missing' }
    next(err)
  } else {
    try {
      const user = await User.findOne({
        where: { email: data.email },
      })
      if (user) {
        req.data = { password: data.password, user }
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

// POST
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body
  try {
    const user = await User.create({
      name: name,
      email: email,
      password: password,
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

const verifyPassword = (req: any, res: Response, next: NextFunction) => {
  const data = req.data
  try {
    const isValid = bcrypt.compareSync(data.password, data.user.password)
    if (isValid) {
      res.cookie(
        'jwt',
        genToken(data.user),
        {
          domain: jwtConfig.cookieDomain,
          path: '/',
          maxAge: parseInt(jwtConfig.maxAge),
          httpOnly: true,
          secure: jwtConfig.secure,
        }
      )
    }
    res.status(isValid ? 200 : 403).send({ isValid, id: data.user.id })
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
  getUserByEmail,
  verifyPassword,
}
