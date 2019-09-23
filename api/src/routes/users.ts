import express from 'express'
import passport from 'passport'
import jwtLogin from '../utils/passport'
import { getCasesByUserId } from '../queries/cases'
import { validateUserId } from '../queries/validation'
import * as dbUsers from '../queries/users'

passport.use(jwtLogin)
let requireAuth = passport.authenticate('jwt', { session: false })
let router = express.Router()

router.get('/', requireAuth, dbUsers.getUsers)

router.get('/:id', requireAuth, validateUserId, dbUsers.getUserById)

router.post('/', requireAuth, dbUsers.createUser)

router.put('/:id', requireAuth, validateUserId, dbUsers.updateUser)

router.delete('/:id', requireAuth, dbUsers.deleteUser)

router.get('/:id/cases', requireAuth, validateUserId, getCasesByUserId)

router.post('/login', dbUsers.validateEmail, dbUsers.sendAuthEmail)

router.post('/login/callback', dbUsers.validateJWT, dbUsers.setCookieWithAuthToken)

export default router
