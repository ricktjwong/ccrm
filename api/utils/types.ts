import { Model, FindOptions, CreateOptions } from 'sequelize';

export interface IFindAll<T extends Model<T>> {
  findAll(options?: FindOptions): Promise<T[]>
}

export interface ICreate<T extends Model<T>> {
  create(values: Object, options?: CreateOptions): Promise<T>
}