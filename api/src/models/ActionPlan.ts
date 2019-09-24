import { Model, Column, Table, CreatedAt, UpdatedAt, BelongsTo, ForeignKey } from 'sequelize-typescript'
import Case from './Case'

@Table({tableName: 'actionPlans'})
export default class ActionPlan extends Model<ActionPlan> {
  @Column
  action: string

  @Column
  poc: string

  @Column
  status: string

  @Column
  targetDate: Date

  @Column
  updates: string

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
