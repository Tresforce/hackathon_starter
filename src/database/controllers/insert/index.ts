import { EntityManager } from 'typeorm';
import { Entities } from '../../../types/postgres';
import { DatabaseModel } from '../../../types/databaseController';

export async function insertOne(
  transactionManager: EntityManager,
  model: Entities,
  createdObject: Partial<DatabaseModel>
): Promise<DatabaseModel> {
  return transactionManager.save(model, createdObject as DatabaseModel);
}

export async function insertMany<T>(
  transactionManager: EntityManager,
  createdObjectArray: T[]
): Promise<T[]> {
  return transactionManager.save(typeof createdObjectArray, createdObjectArray);
}
