import { UUID } from '../../typings';
import { Account } from '../Account';

export class User {
  public id!: UUID;
  public name!: string;
  public age!: number;
  public accounts: Account[] = [];
}
