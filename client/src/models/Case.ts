import { Event } from './Event'
import { Message } from './Message'
import { Client } from './Client'
import { User } from './User'

export interface Case {
  agencyPoc: string
  assignedAgency: string
  caseDesc: string
  client: Client
  messages: Message[]
  createdAt: Date
  id: number
  user: User
  events: Event[]
  updatedAt: Date
}
