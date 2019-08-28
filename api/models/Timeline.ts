import { Model, Column, Table, CreatedAt, UpdatedAt, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Case } from './Case'

@Table({tableName: 'timelines'})
export class Timeline extends Model<Timeline> {
  @Column
  subject: string

  @Column
  from: string

  @Column
  details: string

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date

  @ForeignKey(() => Case)
  caseId: string

  @BelongsTo(() => Case)
  case: Case
}
