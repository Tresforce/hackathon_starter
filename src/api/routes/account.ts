/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import {
  //   Body,
  Controller,
  Get,
  Path,
  //   Post,
  //   Query,
  Route
  //   SuccessResponse
} from 'tsoa';

// import Account from '../../database/entities/Account';
import AccountService from '../../models/account';

import { /* CreateAccountParams, */ UserAccount } from '../../typings/account';
import { UUID } from '../../typings';
// eslint-disable-next-line @typescript-eslint/no-empty-interface

@Route('accounts')
export class AccountRouter extends Controller {
  /**
   *
   * Retrieves the details of an existing account.
   * Supply the unique user ID from either and receive corresponding user details.
   *
   * @param {string} accountId
   * @returns {Promise<UserAccount>}
   * @memberof AccountRouter
   */
  @Get('{accountId}')
  public async getAccount(@Path() accountId: UUID): Promise<UserAccount> {
    return new AccountService().get(accountId, 'blah');
  }
}
