import express from 'express'
import passport from 'passport'
import jwtLogin from './utils/passport'
import bodyParser from 'body-parser'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import indexRouter from './routes/index'
import usersRouter from './routes/users'
import conversationsRouter from './routes/conversations'
import casesRouter from './routes/cases'
import timelinesRouter from './routes/timelines'
import { origin } from './config'

passport.use(jwtLogin)
const requireAuth = passport.authenticate('jwt', { session: false })

let app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

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

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/conversations', requireAuth, conversationsRouter)
app.use('/cases', requireAuth, casesRouter)
app.use('/timelines', requireAuth, timelinesRouter)

// error handler
app.use(function (err: any, req: express.Request, res: express.Response) {
  console.error('error caught:', err)
  res.status(err.status).send(err)
})

module.exports = app
