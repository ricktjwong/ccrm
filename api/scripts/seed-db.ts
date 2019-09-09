/* eslint no-console: 0 */
import { sequelize } from '../sequelize'

import { User } from '../models/User'
import { Case } from '../models/Case'
import { Client } from '../models/Client'
import { Conversation } from '../models/Conversation'
import { Timeline } from '../models/Timeline'

const ERASE_DB_ON_SYNC = true

const populateTables = async () => {
  await User.create({
    name: 'admin',
    email: 'admin@opengov.com',
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
      dob: '12/12/1995',
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
    conversations: [{ message: 'Hi can you please revert',
      from: 'admin' },
    { message: 'Apologies for taking so long, was on holiday',
      from: 'admin2' }],
    timelines: [{ subject: 'Referral',
      from: 'Anakin',
      details: 'Case has been referred to SSO' }],
  }, {
    include: [Client, Conversation, Timeline],
  })

  await Case.create({
    userId: 1,
    clientName: 'Anakin Skywalker',
    caseDesc: 'Single family, requires HDB loan for family',
    assignedAgency: 'HDB',
    agencyPoc: 'ewok@hdb.edu.sg',
    client: {
      name: 'Han Solo',
      dob: '12/12/1995',
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
    conversations: [{ message: 'Hi, would like to enquire about the delay', from: 'admin' },
      { message: 'Sorry its taking too long to talk to HDB', from: 'admin2' }],
    timelines: [{ subject: 'Coordination',
      from: 'Anakin',
      details: 'Case has been referred to SSO' }],
  }, {
    include: [Client, Conversation, Timeline],
  })
}

(
  async function () {
    await sequelize.sync({ force: ERASE_DB_ON_SYNC })
    await populateTables()
    console.log('Done')
  }
)()