import { UUID } from '../../typings';

export class Transaction {
  public id!: UUID;
  public userId!: UUID;
  public accountId!: UUID;
  public datePosted!: Date;
  public dateCleared?: Date;
  public payee!: string;
  public categoryId?: UUID;
  public memo?: string;
  public amount!: string;
  public cleared = false;
}
