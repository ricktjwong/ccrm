import { Model, FindOptions, CreateOptions } from 'sequelize'
import { User } from '../models/User'

type SequelizeUser = User

declare global {
  namespace Express {
    /**
     * Maps the User Sequelize model onto passport's User
     */
    interface User extends SequelizeUser { }
  }
}

/**
 * Facilitates creation of generic Express controllers to query Sequelize instances
 */
export interface IFindAll<T extends Model<T>> {
  findAll(options?: FindOptions): Promise<T[]>
}

/**
 * Facilitates creation of generic Express controllers to create Sequelize instances
 */
export interface ICreate<T extends Model<T>> {
  create(values: Object, options?: CreateOptions): Promise<T>
}
