var Sequelize = require('sequelize')

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
}

var sequelize = new Sequelize(config.database,
                              config.user,
                              config.password,
                              { 
                                dialect: 'postgres',
                                port: config.port,
                                host: config.host,
                              })

const models = {
  User: sequelize.import('./user'),
  Case: sequelize.import('./case'),
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

module.exports = {
  sequelize,
  models
}
