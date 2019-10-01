import express from 'express'
import passport from 'passport'
import jwtLogin from '../utils/passport'
import { getCasesByUserId, getPendingCases } from '../controllers/cases'
import { validateUserId } from '../controllers/validation'
import * as dbUsers from '../controllers/users'

passport.use(jwtLogin)
let requireAuth = passport.authenticate('jwt', { session: false })
let router = express.Router()

router.get('/', requireAuth, dbUsers.getUsers)

router.post('/', requireAuth, dbUsers.createUser)

router.get('/:id', requireAuth, validateUserId, dbUsers.getUserById)

router.put('/:id', requireAuth, validateUserId, dbUsers.updateUser)

router.delete('/:id', requireAuth, dbUsers.deleteUser)

router.get('/:id/cases', requireAuth, validateUserId, getCasesByUserId)

router.get('/:id/cases/pending', requireAuth, validateUserId, getPendingCases)

router.post('/login', dbUsers.validateEmail, dbUsers.sendAuthEmail)

router.post('/login/callback', dbUsers.validateJWT, dbUsers.setCookieWithAuthToken)

export default router
