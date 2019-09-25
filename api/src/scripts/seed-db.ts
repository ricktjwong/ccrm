/* eslint no-console: 0 */
import { sequelize } from '../sequelize'
import { populateTables } from '../tests/helpers/populate-tables'

const ERASE_DB_ON_SYNC = true as boolean

(
  async function () {
    await sequelize.sync({ force: ERASE_DB_ON_SYNC })
    await populateTables()
    console.log('Done')
  }
)()
