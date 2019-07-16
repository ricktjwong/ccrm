var bcrypt = require('bcrypt')
let db = require('../models')
let models = db.models

// GET
const getUsers = async (req, res) => {
  try {
    const users = await models.User.findAll()
    res.status(200).json(users)
  } catch (error) {
    let err = { status: error.status || 500, message: error }
    next(err)
  }
}

const getUserByEmail = async (req, res, next) => {
  const data = req.body
  if (!data.email || !data.password) {
    let err = { status: 400, message: 'Email and/or password missing' }
    next(err)
  } else {
    try {
      let user = await models.User.findOne({
        where: { email: data.email }
      })
      if (user) {
        req.data = { password: data.password, user: user }
        next()
      } else {
        let err = { status: 404, message: 'No user found' }
        next(err)
      }
    } catch (error) {
      let err = { status: error.status || 500, message: error }
      next(err)
    }
  }
}

// POST
const createUser = async (req, res, next) => {
  const { name, email, password } = req.body
  try {
    const hash = await hashPassword(password)
    const user = await models.User.create({
      name: name,
      email: email,
      password: hash
    })
    res.status(201).send(`User added with ID: ${user.dataValues.id}`)
  }
  catch (error) {
    let err = { status: error.status || 500, message: error }
    next(err)
  }
}

// PUT
const updateUser = async (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body
  try {
    let user = await models.User.update({ 
      name: name,
      email: email
    }, { where: {id: id} })
    res.status(200).send(`User modified with ID: ${id}`)
  } catch(error) {
    let err = { status: error.status || 500, message: error }
    next(err)
  }
}

// DELETE
const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    await models.User.destroy({ where: {id: id}})
    res.status(200).send(`User deleted with ID: ${id}`)
  } catch(error) {
    let err = { status: error.status || 500, message: error }
    next(err)
  }
}

// Helper functions
function hashPassword (password) {
  return new Promise(function (resolve, reject) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        reject(err)
      } else {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            reject(err)
          } else {
            resolve(hash)
          }
        })
      }
    })
  })
}

function verifyPassword (req, res, next) {
  let data = req.data
  bcrypt.compare(data.password, data.user.password, function (err, result) {
    if (err) {
      next(err)
    } else {
      res.status(200).send({ isValid: result, id: data.user.id })
    }
  })
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  verifyPassword,
  hashPassword,
}
