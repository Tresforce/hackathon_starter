import { getManager } from 'typeorm';
import User from '../../database/entities/User';
import DbController from '../../database/controllers';

export default class UserController {
  static async getUserById(id: string): Promise<User> {
    return DbController.findById('User', id);
  }

  static async createUser(
    firstName: string,
    lastName: string,
    email: string
  ): Promise<User> {
    return getManager().transaction(async transactionEntity => {
      return DbController.insertOne(transactionEntity, 'User', {
        firstName,
        lastName,
        email
      });
    });
  }
}
