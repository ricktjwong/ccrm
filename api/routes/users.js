var express = require('express')
var router = express.Router()
const dbUsers = require('../queries/users')

router.get('/', dbUsers.getUsers)
router.post('/', dbUsers.createUser)

router.post('/authenticate',
  dbUsers.findUserByEmail,
  dbUsers.verifyPassword,
)

router.put('/:id', dbUsers.updateUser)
router.delete('/:id', dbUsers.deleteUser)

module.exports = router
