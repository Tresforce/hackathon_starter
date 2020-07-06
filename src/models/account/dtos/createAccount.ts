import { Command } from '../../../typings/message';

export default class AccountDTO extends Command {
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public phoneNumber!: string;
}
