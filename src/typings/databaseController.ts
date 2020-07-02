import User from '../database/entities/Account';

export type DatabaseModel = User;

export interface EntityObject {
  [key: string]: any;
}
