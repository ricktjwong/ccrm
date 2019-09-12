import { Model, Column, Table, CreatedAt, UpdatedAt, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Case } from './Case'
import { User } from './User'

@Table({tableName: 'events'})
export class Event extends Model<Event> {
  @Column
  subject: string

  @ForeignKey(() => User)
  userId: number

  @BelongsTo(() => User)
  user: User

  @Column
  details: string

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
