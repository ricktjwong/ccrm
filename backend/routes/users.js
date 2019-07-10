var express = require('express')
var router = express.Router()
const dbUsers = require('../queries/users')

/* GET users listing. */
router.get('/', dbUsers.getUsers)
router.get('/:id', dbUsers.getUserById)
router.post('/', dbUsers.createUser)
router.post('/authenticate', dbUsers.authenticate)
router.put('/:id', dbUsers.updateUser)
router.delete('/:id', dbUsers.deleteUser)

module.exports = router
