const Pool = require('pg').Pool
var bcrypt = require('bcrypt')

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
}

const pool = new Pool(config)

// GET
const getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const getUserByEmail = (req, res, next) => {
  const data = req.body
  if (!data.email || !data.password) {
    let err = { status: 400, message: 'Email and/or password missing' }
    next(err)
  } else {
    pool.query('SELECT * FROM users WHERE email = $1', [data.email])
      .then(function (result) {
        if (result.rows[0]) {
          req.data = { password: data.password, user: result.rows[0] }
          next()
        } else {
          let err = { status: 404, message: 'No user found' }
          next(err)
        }
      })
      .catch(function (error) {
        let err = { status: error.status || 500, message: error }
        next(err)
      })
  }
}

// POST
const createUser = (req, res, next) => {
  const { name, email, password } = req.body
  hashPassword(password)
    .then(hash => {
      pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hash], (error, results) => {
        if (error) {
          let err = { status: error.status || 500, message: error }
          next(err)
        }
        res.status(201).send(`User added with ID: ${results.insertId}`)
      })
    })
    .catch((error) => {
      let err = { status: error.status || 500, message: error }
      next(err)
    })
}

// PUT
const updateUser = (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body
  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

// DELETE
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
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
}
