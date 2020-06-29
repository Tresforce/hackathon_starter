import { Column, Entity } from 'typeorm';
import BaseEntity from '../BaseEntity';
import Address from '../Address';

@Entity()
export default class User extends BaseEntity {
  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Column()
  public email!: string;

  @Column()
  public phoneNumber!: string;

  @Column(() => Address)
  public address!: Address;

  @Column({ default: new Date() })
  public lastSignOn!: Date;

  @Column({ default: true })
  public isActive!: boolean;

  public fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
