const Pool = require('pg').Pool
var bcrypt = require('bcrypt');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10)
}

const pool = new Pool(config)

// GET
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// GET
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// POST
const createUser = (request, response) => {
  const { name, email, password } = request.body
  hashPassword(password)
  .then(hash => {
    pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hash], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  })
  .catch(function(err) {
    console.err(err)
  })
}

// PUT
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

// DELETE
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

function hashPassword(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        reject(err);
      }
      else {
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) {
            reject(err);
          }
          else {
            resolve(hash);
          }
        });
      }
    });
  });
}

function validateUserData(data) {
  return new Promise(function(resolve, reject) {
    if (!data.password || !data.email) {
      reject('email and/or password missing')
    }
    else {
      validatePassword(data.password, 6)
        .then(function() {
          return validateEmail(data.email);
        })
        .then(function() {
          resolve();
        })
        .catch(function(err) {
          reject(err);
        });
    }
  });
}

function validatePassword(password, minCharacters) {
  return new Promise(function(resolve, reject) {
    if (typeof (password) !== 'string') {
      reject('password must be a string');
    }
    else if (password.length < minCharacters) {
      reject('password must be at least ' + minCharacters + ' characters long');
    }
    else {
      resolve();
    }
  });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
