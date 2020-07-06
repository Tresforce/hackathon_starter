/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import {
  Body,
  Controller,
  // Get,
  // Path,
  Post,
  //   Query,
  Route,
  Example,
  SuccessResponse
} from 'tsoa';

import { CREATED } from 'http-status-codes';
import AccountService from '../../models/account/commands/createAccount';

import { CreateAccountParams, UserAccount } from '../../typings/account';
import addJob from '../../services/commandQueue';
import DetailedError from '../../utils/DetailedError';
// import { UUID } from '../../typings';

@Route('accounts')
export class AccountRouter extends Controller {
  // /**
  //  *
  //  * Retrieves the details of an existing account.
  //  * Supply the unique user ID from either and receive corresponding user details.
  //  *
  //  * @param {string} accountId
  //  * @returns {Promise<UserAccount>}
  //  * @memberof AccountRouter
  //  */
  // @Example<UserAccount>({
  //   id: '52907745-7672-470e-a803-a2f8feb52944',
  //   firstName: 'Bob',
  //   lastName: 'Jones',
  //   email: 'hello@tsoa.com',
  //   phoneNumber: '889-989-3434'
  // })
  // @Get('{accountId}')
  // public async getAccount(
  //   @Path() accountId: UUID
  // ): Promise<Partial<UserAccount> | UserAccount> {
  //   return new AccountService().get(accountId, 'blah');
  // }
  // @Example<CreateAccountParams>({
  //   firstName: 'Bob',
  //   lastName: 'Jones',
  //   email: 'hello@tsoa.com',
  //   phoneNumber: '889-989-3434'
  // })
  @Post()
  @SuccessResponse(201, 'Created') // Custom success response
  public async createUser(
    @Body() requestBody: CreateAccountParams
  ): Promise<void> {
    try {
      this.setStatus(201);
      await addJob(AccountService.create(requestBody));
    } catch (error) {
      throw new DetailedError({
        name: 'Api Error',
        message: error.message,
        statusCode: 400,
        contextObject: requestBody
      });
    }
  }
}
