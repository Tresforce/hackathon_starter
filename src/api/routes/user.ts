import {
  Body,
  Controller,
  // Get,
  // Path,
  Post,
  //   Query,
  Route,
  // Example,
  SuccessResponse
} from 'tsoa';

import { CREATED } from 'http-status-codes';
import UserCommand from '../../models/user/commands/CreateUser';

import { CreateAccountParams } from '../../typings/account';
import DetailedError from '../../utils/DetailedError';

@Route('users')
export class UserRouter extends Controller {
  @Post()
  @SuccessResponse(CREATED, 'Created') // Custom success response
  public async createUser(
    @Body() requestBody: CreateAccountParams
  ): Promise<void> {
    try {
      this.setStatus(CREATED);
      await new UserCommand().createUser(requestBody);
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
