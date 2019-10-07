import { HasMany, ForeignKey, Model, Column, Table, CreatedAt, UpdatedAt, BelongsTo, DataType } from 'sequelize-typescript'

import ActionPlan from './ActionPlan'
import User from './User'
import Message from './Message'
import Client from './Client'
import Event from './Event'

@Table({tableName: 'cases'})
export default class Case extends Model<Case> {
  @Column
  caseDesc: string

  @Column(DataType.ARRAY(DataType.INTEGER))
  collaborators: number[]

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date

  @ForeignKey(() => User)
  userId: number

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => Client)
  clientId: number

  @BelongsTo(() => Client)
  client: Client

  @HasMany(() => Message)
  messages: Message[]

  @HasMany(() => ActionPlan)
  actionPlans: ActionPlan[]

  @HasMany(() => Event)
  events: Event[]
}
