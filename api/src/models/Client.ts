import { Model, Column, Table, CreatedAt, UpdatedAt, Unique, HasMany } from 'sequelize-typescript'
import Case from './Case'

@Table({tableName: 'clients'})
export default class Client extends Model<Client> {
  @Column
  name: string

  @Column
  dateOfBirth: Date

  @Column
  email: string

  @Unique
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

  @HasMany(() => Case)
  cases: Case[]
}
