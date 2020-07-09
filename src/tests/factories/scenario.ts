import pipe from 'lodash/fp/flow';
import faker from 'faker';

import { User } from '../../components/User';

import { withAccountObject } from './account';
import { withUserObject } from './user';
import { withConstructor } from './utils';

export const createUserAndAccounts = (
  userId = faker.random.uuid(),
  numberOfAccts = faker.random.number({ min: 1, max: 2 })
): User =>
  pipe(
    withUserObject(userId),
    withAccountObject(userId, numberOfAccts),
    withConstructor(User)
  )({});
/*
  User {
    id: 'c321113b-3cb1-4810-b205-9c8c4e92d22f',
    name: 'Candida',
    age: 27,
    accounts: [
      Account {
        id: '2a8f676c-1d18-43cc-8e87-4bdfbf5ca0d5',
        name: 'Braun Inc',
        balance: '$248.84',
        type: 'Home Loan Account',
        userId: 'c321113b-3cb1-4810-b205-9c8c4e92d22f'
      },
      Account {
        id: '6eedf075-dd9e-4697-bf46-36e89158d4d7',
        name: 'Dooley - Rohan',
        balance: '$712.57',
        type: 'Personal Loan Account',
        userId: 'c321113b-3cb1-4810-b205-9c8c4e92d22f'
      }
    ]
  } */

export const createUserNoAcct = (userId = faker.random.uuid()): User =>
  pipe(withUserObject(userId), withConstructor(User))({});
/*
  User {
    id: 'ec92ee9f-19fb-4715-9eeb-19878e202823',
    name: 'Archibald',
    age: 22
  }
  */
