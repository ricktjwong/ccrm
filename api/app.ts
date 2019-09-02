import { sequelize } from './sequelize'
import { User } from './models/User'
import { Case } from './models/Case'
import { Client } from './models/Client'
import { Conversation } from './models/Conversation'
import { Timeline } from './models/Timeline'
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

const eraseDatabaseOnSync = true

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) { createTables() }
  app.listen(process.env.DB_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`CCRM app listening on port ${process.env.DB_PORT}!`)
  })
})

const createTables = async () => {
  await User.create({
    name: 'admin',
    email: 'admin@opengov.com',
    password: process.env.DB_PASSWORD,
  })

  await Case.create({
    userId: 1,
    clientName: 'Han Solo',
    caseDesc: 'Single family, requires education grant for son',
    assignedAgency: 'MOE',
    agencyPoc: 'chewie@moe.edu.sg',
    client: {
      name: 'Han Solo',
      dob: '12/12/1995',
      email: 'han@solo.com',
      nric: 'S9347193J',
      nricAddress: '123 Tatooine Street',
      address: '123 Tatooine Street',
      gender: 'Male',
      nationality: 'Jedi',
      race: 'Caucasian',
      maritalStatus: 'Single4Lyfe',
      employmentStatus: 'Employed',
      grossHouseholdIncome: '100000',
      phone: 91829381,
    },
    conversations: [{ message: 'Hi can you please revert',
      from: 'admin' },
    { message: 'Apologies for taking so long, was on holiday',
      from: 'admin2' }],
    timelines: [{ subject: 'Referral',
      from: 'Anakin',
      details: 'Case has been referred to SSO' }],
  }, {
    include: [Client, Conversation, Timeline],
  })

  await Case.create({
    userId: 1,
    clientName: 'Anakin Skywalker',
    caseDesc: 'Single family, requires HDB loan for family',
    assignedAgency: 'HDB',
    agencyPoc: 'ewok@hdb.edu.sg',
    client: {
      name: 'Han Solo',
      dob: '12/12/1995',
      email: 'han@solo.com',
      nric: 'S9347193J',
      nricAddress: '123 Tatooine Street',
      address: '123 Tatooine Street',
      gender: 'Male',
      nationality: 'Jedi',
      race: 'Caucasian',
      maritalStatus: 'Single4Lyfe',
      employmentStatus: 'Employed',
      grossHouseholdIncome: '100000',
      phone: 91829381,
    },
    conversations: [{ message: 'Hi, would like to enquire about the delay', from: 'admin' },
      { message: 'Sorry its taking too long to talk to HDB', from: 'admin2' }],
    timelines: [{ subject: 'Coordination',
      from: 'Anakin',
      details: 'Case has been referred to SSO' }],
  }, {
    include: [Client, Conversation, Timeline],
  })
}

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
