import { v4 as uuid } from 'uuid';
import { autoInjectable } from 'tsyringe';
import { CreateAccountParams } from '../../../typings/account';

import CreateUser from '../DTOs';
import CommandQueue from '../../../services/commandQueue';

@autoInjectable()
export default class UserCommand {
  constructor(private queue?: CommandQueue) {}

  public async createUser(dto: CreateAccountParams): Promise<any> {
    const user = new CreateUser();
    user.userId = uuid();
    user.email = dto.email;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    if (dto.phoneNumber) {
      user.phoneNumber = dto.phoneNumber;
    }

    return this.queue!.processEvent(user, this.createUserHandler);
  }
  private async createUserHandler(): Promise<void> {
    return Promise.resolve(console.log('ok'));
  }
}
