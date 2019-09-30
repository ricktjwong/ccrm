import { Sequelize } from 'sequelize-typescript'
import { dbConfig } from './config'

import * as models from './models'

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    dialect: 'postgres',
    port: parseInt(dbConfig.port, 10),
    host: dbConfig.host,
    models: Object.values(models),
    logging: dbConfig.logging,
  })
