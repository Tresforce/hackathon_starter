import User from '../database/entities/Account';

export interface AuthenticatedUser {
  user: User;
  token: string;
}
