import { Event } from './message';
import { UUID } from '.';

export default class CreateUser {
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phoneNumber?: string;
  public zipCode?: string;
}

export class UserCreatedEvent extends Event {
  public userId!: UUID;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phoneNumber?: string;
}

export class UserInformationUpdated extends Event {
  public userId!: UUID;
}

export class UserDeleted extends Event {
  public name!: 'UserDeleted';
  public userId!: UUID;
}

export class UserEvent implements User {
  public userId!: UUID;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phoneNumber?: string;
  public zipCode?: string;
}

interface User {
  userId: UUID;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  zipCode?: string;
}
