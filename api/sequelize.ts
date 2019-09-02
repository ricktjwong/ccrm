import { Sequelize } from 'sequelize-typescript'
import config from './config'
import path from 'path'

export const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
    dialect: 'postgres',
    port: parseInt(config.port, 10),
    host: config.host,
    models: [path.join(__dirname, '/models')],
  })
