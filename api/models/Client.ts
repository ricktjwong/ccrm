import { Model, Column, Table, CreatedAt, UpdatedAt, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Case } from './Case'

@Table({tableName: 'clients'})
export class Client extends Model<Client> {
  @Column
  name: string

  @Column
  dob: Date

  @Column
  email: string

  @Column
  nric: string

  @Column
  nricAddress: string

  @Column
  address: string

  @Column
  gender: string

  @Column
  nationality: string

  @Column
  race: string

  @Column
  maritalStatus: string

  @Column
  employmentStatus: string

  @Column
  grossHouseholdIncome: number

  @Column
  phone: number

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
