import express from 'express'

const bodyParser = require('body-parser')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let cors = require('cors')
let indexRouter = require('./routes/index')
let usersRouter = require('./routes/users')
let conversationsRouter = require('./routes/conversations')
let casesRouter = require('./routes/cases')
let timelinesRouter = require('./routes/timelines')

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
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/conversations', conversationsRouter)
app.use('/cases', casesRouter)
app.use('/timelines', timelinesRouter)

// error handler
app.use(function (err: any, req: express.Request, res: express.Response) {
  console.error('error caught:', err)
  res.status(err.status).send(err)
})

module.exports = app
