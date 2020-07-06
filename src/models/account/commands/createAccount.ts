import { v4 as uuid } from 'uuid';
import { CreateAccountParams } from '../../../typings/account';
import store from '../../../database/eventLog';
import { Command } from '../../../typings/message';

// TODO rename CreateAccountCommand
export default class AccountService {
  private static session = store.openSession();
  private static command: Command;

  public static create(accountDTO: CreateAccountParams): Command {
    this.command = {
      name: 'CreateAccountCommand',
      dateCreated: new Date(),
      // id: uuid(),
      data: {
        ...accountDTO
      }
    };
    return this.command;
  }
  public static async handle(): Promise<void> {
    return this.session.store(this.command);
  }
}
