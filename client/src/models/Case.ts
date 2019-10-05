import { Event } from './Event'
import { Message } from './Message'
import { Client } from './Client'
import { User } from './User'

export interface Case {
  caseDesc: string
  client: Client
  collaborators: number
  messages: Message[]
  createdAt: Date
  id: number
  user: User
  events: Event[]
  updatedAt: Date
}
