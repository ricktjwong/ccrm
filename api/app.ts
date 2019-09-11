import express from 'express'
import passport from 'passport'
import jwtLogin from './utils/passport'
import bodyParser from 'body-parser'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import usersRouter from './routes/users'
import casesRouter from './routes/cases'
import timelinesRouter from './routes/timelines'
import { origin } from './config'

passport.use(jwtLogin)
const requireAuth = passport.authenticate('jwt', { session: false })

let app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors({credentials: true, origin: origin}))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', usersRouter)
app.use('/cases', requireAuth, casesRouter)
app.use('/timelines', requireAuth, timelinesRouter)

// error handler
interface HasStatus {
  status?: number
}

app.use(function (err: Error & HasStatus, req: express.Request, res: express.Response, next: express.NextFunction) {
  console.error('error caught:', err, res)
  res.status(err.status || 500).send(err)
})

module.exports = app
