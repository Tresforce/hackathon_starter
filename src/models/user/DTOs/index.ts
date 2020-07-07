import { UUID } from '../../../typings';

export default class CreateUser {
  public userId!: UUID;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phoneNumber?: string;
}
