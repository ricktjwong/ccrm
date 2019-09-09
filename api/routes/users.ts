import express from 'express'
import passport from 'passport'
import jwtLogin from '../utils/passport'

passport.use(jwtLogin)
const requireAuth = passport.authenticate('jwt', { session: false })

let router = express.Router()
const dbUsers = require('../queries/users')

router.get('/', requireAuth, dbUsers.getUsers)

router.get('/:id', requireAuth, dbUsers.getUserById)

router.post('/', requireAuth, dbUsers.createUser)

router.post('/authenticate',
  dbUsers.getUserByEmail,
  dbUsers.verifyPassword,
)

router.put('/:id', requireAuth, dbUsers.updateUser)

router.delete('/:id', requireAuth, dbUsers.deleteUser)

export default router
