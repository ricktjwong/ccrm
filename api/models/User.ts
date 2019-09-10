import { Model, Column, Table, CreatedAt, UpdatedAt, HasMany, BeforeCreate, Unique } from 'sequelize-typescript'
import { hashPassword } from '../utils/hooks'
import { Case } from './Case'

@Table({tableName: 'users'})
export class User extends Model<User> {
  @Column
  name: string

  @Column
  password: string

  @Unique
  @Column
  email: string

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date

  @HasMany(() => Case)
  cases: Case[]

  @BeforeCreate
  static async hashPassword (user: User) {
    const password = await hashPassword(user.password)
    user.password = password
  }
}
