import { Model, FindOptions } from 'sequelize';

export interface IFindAll<T extends Model<T>> {
  findAll(options?: FindOptions): Promise<T[]>
}
