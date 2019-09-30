import { Model, Column, Table, CreatedAt, UpdatedAt, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript'
import Case from './Case'
import User from './User'

@Table({tableName: 'events'})
export default class Event extends Model<Event> {
  @Column
  subject: string

  @ForeignKey(() => User)
  userId: number

  @BelongsTo(() => User)
  user: User

  @Column(DataType.JSON)
  details: any

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
