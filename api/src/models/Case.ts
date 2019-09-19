import { HasMany, ForeignKey, Model, Column, Table, CreatedAt, UpdatedAt, BelongsTo } from 'sequelize-typescript'

import { ActionPlan } from './ActionPlan'
import { User } from './User'
import { Message } from './Message'
import { Client } from './Client'
import { Event } from './Event'

@Table({tableName: 'cases'})
export class Case extends Model<Case> {
  @Column
  caseDesc: string

  @Column
  assignedAgency: string

  @Column
  agencyPoc: string

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
