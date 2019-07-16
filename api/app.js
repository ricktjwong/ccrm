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

var app = express()

const eraseDatabaseOnSync = true

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) createUsers()
  app.listen(process.env.DB_PORT, () => {
    console.log(`Example app listening on port ${process.env.DB_PORT}!`)
  })
})

const createUsers = async () => {
  const password = await hashPassword(process.env.DB_PASSWORD)
  await models.User.create({
    name: 'admin',
    email: 'admin@opengov.com',
    password: password,
    cases: [{ client_name: 'Han Solo', }]
  }, {
    include: models.Case
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

// error handler
app.use(function (err, req, res, next) {
  console.error('error caught:', err)
  res.status(err.status).send(err)
})

module.exports = app
