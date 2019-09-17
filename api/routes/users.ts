import express from 'express'
import passport from 'passport'
import jwtLogin from '../utils/passport'

passport.use(jwtLogin)
const requireAuth = passport.authenticate('jwt', { session: false })

let router = express.Router()
const dbUsers = require('../queries/users')
const dbCases = require('../queries/cases')

router.get('/', requireAuth, dbUsers.getUsers)

router.get('/:id', requireAuth, dbUsers.getUserById)

router.post('/', requireAuth, dbUsers.createUser)

router.put('/:id', requireAuth, dbUsers.updateUser)

router.delete('/:id', requireAuth, dbUsers.deleteUser)

router.get('/:id/cases', requireAuth, dbCases.getCasesByUserId)

router.post('/login', dbUsers.validateEmail, dbUsers.sendAuthEmail)

router.post('/login/callback', dbUsers.validateJWT, dbUsers.setCookieWithAuthToken)

export default router
