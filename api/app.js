const db = require('./models')
const models = db.models
const sequelize = db.sequelize
const hashPassword = require('./queries/users').hashPassword

var express = require('express')
const bodyParser = require('body-parser')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var conversationsRouter = require('./routes/conversations')
var casesRouter = require('./routes/cases')

var app = express()

const eraseDatabaseOnSync = true

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) createTables()
  app.listen(process.env.DB_PORT, () => {
    console.log(`Example app listening on port ${process.env.DB_PORT}!`)
  })
})

const createTables = async () => {
  const password = await hashPassword(process.env.DB_PASSWORD)

  await models.User.create({
    name: 'admin',
    email: 'admin@opengov.com',
    password: password,
  })

  await models.Case.create({
    userId: 1,
    clientName: 'Han Solo',
    conversations: [{ message: 'Hi can you please revert', from: 'admin' },
      { message: 'How about you just go home', from: 'admin2' }],
  }, {
    include: models.Conversation,
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

// error handler
app.use(function (err, req, res, next) {
  console.error('error caught:', err)
  res.status(err.status).send(err)
})

module.exports = app
