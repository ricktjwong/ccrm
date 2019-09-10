import { Model, Column, Table, CreatedAt, UpdatedAt, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Case } from './Case'
import { User } from './User'

@Table({tableName: 'messages'})
export class Message extends Model<Message> {
  @Column
  text: string

  @ForeignKey(() => User)
  userId: number

  @BelongsTo(() => User)
  user: User

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date

  @ForeignKey(() => Case)
  caseId: number

  @BelongsTo(() => Case)
  case: Case
}
