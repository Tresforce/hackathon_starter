import { v4 as uuid } from 'uuid';
import { autoInjectable } from 'tsyringe';
import { CreateAccountParams } from '../../../typings/account';

import CreateUser from '../DTOs';
import CommandQueue from '../../../services/commandQueue';
import UserRepository from '../repositories';

async function createUserHandler(user: CreateUser): Promise<void> {
  const repository = new UserRepository();
  await repository.createUser(user);
  await repository.save();
}
@autoInjectable()
export default class UserCommand {
  public async createUser(dto: CreateAccountParams): Promise<void> {
    const queue = CommandQueue;
    const user = new CreateUser();
    user.userId = uuid();
    user.email = dto.email;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    if (dto.phoneNumber) {
      user.phoneNumber = dto.phoneNumber;
    }
    console.log('adding que');
    await queue.add(user);
    await queue.process(async job => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(job.data);
          console.log('hello');
          resolve();
        }, 2000);
      });
    });
  }
}
