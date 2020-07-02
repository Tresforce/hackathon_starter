/* eslint-disable class-methods-use-this */
import Account from '../../database/entities/Account';
import { CreateAccountParams } from '../../typings/account';

export default class AccountService {
  public async get(id: string, firstName: string): Promise<Account> {
    const account = ((await Promise.resolve({
      id,
      email: 'sdlks',
      firstName,
      lastName: 'hello'
    })) as unknown) as Account;
    return account;
  }
  public create(accountDTO: CreateAccountParams): Partial<Account> | Account {
    return {
      id: 'slksdf',
      ...accountDTO
    };
  }
}
