/* eslint no-console: 0 */
import { sequelize } from '../sequelize'

import { User } from '../models/User'
import { Case } from '../models/Case'
import { Client } from '../models/Client'
import { Message } from '../models/Message'
import { Event } from '../models/Event'

const ERASE_DB_ON_SYNC = true

const populateTables = async () => {
  await User.create({
    name: 'admin',
    email: 'admin@opengov.com',
    password: process.env.DB_PASSWORD,
  })

  await User.create({
    name: 'admin2',
    email: 'admin2@opengov.com',
    password: process.env.DB_PASSWORD,
  })

  await Case.create({
    userId: 1,
    clientName: 'Han Solo',
    caseDesc: 'Single family, requires education grant for son',
    assignedAgency: 'MOE',
    agencyPoc: 'chewie@moe.edu.sg',
    client: {
      name: 'Han Solo',
      dateOfBirth: '12/12/1995',
      email: 'han@solo.com',
      nric: 'S9347193J',
      nricAddress: '123 Tatooine Street',
      address: '123 Tatooine Street',
      gender: 'Male',
      nationality: 'Jedi',
      race: 'Caucasian',
      maritalStatus: 'Single4Lyfe',
      employmentStatus: 'Employed',
      grossHouseholdIncome: '100000',
      phone: 91829381,
    },
    messages: [{ text: 'Hi can you please revert',
      userId: 1 },
    { text: 'Apologies for taking so long, was on holiday',
      userId: 2 }],
    events: [{ subject: 'Referral',
      userId: 1,
      details: 'Case has been referred to SSO' }],
  }, {
    include: [Client, Message, Event],
  })

  await Case.create({
    userId: 1,
    clientName: 'Anakin Skywalker',
    caseDesc: 'Single family, requires HDB loan for family',
    assignedAgency: 'HDB',
    agencyPoc: 'ewok@hdb.edu.sg',
    clientId: 1,
    messages: [{ text: 'Hi, would like to enquire about the delay', userId: 1 },
      { text: 'Sorry its taking too long to talk to HDB', userId: 2 }],
    events: [{ subject: 'Coordination',
      userId: 2,
      details: 'Case has been referred to SSO' }],
  }, {
    include: [Message, Event],
  })
}

(
  async function () {
    await sequelize.sync({ force: ERASE_DB_ON_SYNC })
    await populateTables()
    console.log('Done')
  }
)()
