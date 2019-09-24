import { Case, Client, Message, Event, User } from '../../models'

let users = require('../fixtures/users.json')
let clients = require('../fixtures/clients.json')
let cases = require('../fixtures/cases.json')

/**
 * Seeds a CCRM database with data as defined in `../fixtures/`
 * Assumes that the database is empty
 */
export const populateTables = async () => {
  await User.bulkCreate(users)

  await Client.bulkCreate(clients)

  await Case.bulkCreate(cases, {
    include: [
      {
        model: Message,
        as: 'messages',
      },
      {
        model: Event,
        as: 'events',
      },
    ],
  })
}
