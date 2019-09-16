import { User } from "./User"

export interface Message {
  createdAt: Date
  userId: number
  user: User
  id: number
  text: string
  updatedAt: Date
}
