import { Transaction } from '../Transaction';
import { UUID } from '../../typings';

export class Account {
  public id!: UUID;
  public name!: string;
  public balance!: string;
  public type!: string;
  public userId!: string;
  transactions: Transaction[] = [];
}
