import { User } from '../models/User'
import { Case } from '../models/Case'
import { Client } from '../models/Client'
import { Message } from '../models/Message'
import { Event } from '../models/Event'

let users = require('../fixtures/user.json')
let cases = require('../fixtures/case.json')

export const populateTables = async () => {
  await User.bulkCreate(users)

  await Case.create(cases[0], {
    include: [Client, Message, Event],
  })

  await Case.create(cases[1], {
    include: [Message, Event],
  })
}
