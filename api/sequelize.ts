import { Sequelize } from 'sequelize-typescript'
import { dbConfig } from './config'
import path from 'path'

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    dialect: 'postgres',
    port: parseInt(dbConfig.port, 10),
    host: dbConfig.host,
    models: [path.join(__dirname, '/models')],
  })
