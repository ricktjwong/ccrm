import { Timeline } from './Timeline'
import { Conversation } from './Conversation'

export interface Case {
  agencyPoc: string
  assignedAgency: string
  caseDesc: string
  client: any
  clientName: string
  conversations: Conversation[]
  createdAt: Date
  id: number
  timelines: Timeline[]
  updatedAt: Date
}
