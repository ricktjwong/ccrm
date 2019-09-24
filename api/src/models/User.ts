import { Model, Column, Table, CreatedAt, UpdatedAt, HasMany, Unique } from 'sequelize-typescript'
import Case from './Case'

@Table({tableName: 'users'})
export default class User extends Model<User> {
  @Column
  name: string

  @Unique
  @Column
  email: string

  @Column
  agency: string

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date

  @HasMany(() => Case)
  cases: Case[]
}
