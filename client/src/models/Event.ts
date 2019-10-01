import { User } from './User'

export interface Event {
  details: any
  user: User
  userId: number
  id: number
  subject: string
  createdAt?: Date
  updatedAt?: Date
}
