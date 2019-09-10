import { Timeline } from './Timeline'
import { Message } from './Message'

export interface Case {
  agencyPoc: string
  assignedAgency: string
  caseDesc: string
  client: any
  clientName: string
  messages: Message[]
  createdAt: Date
  id: number
  timelines: Timeline[]
  updatedAt: Date
}
