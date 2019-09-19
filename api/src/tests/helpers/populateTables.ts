import { User } from '../../models/User'
import { Case } from '../../models/Case'
import { Client } from '../../models/Client'
import { Message } from '../../models/Message'
import { Event } from '../../models/Event'

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
