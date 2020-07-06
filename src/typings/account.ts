import Account from '../models/account/dtos/createAccount';

export type UserAccount = {
  [key in keyof Account]: Account[key];
};

export type CreateAccountParams = Pick<
  UserAccount,
  'email' | 'firstName' | 'lastName' | 'phoneNumber'
>;
