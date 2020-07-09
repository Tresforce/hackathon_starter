import faker from 'faker';
import _ from 'lodash';

import { Account } from '../../components/Account';

const createAccount = (userId: string): Account => {
  const account: Omit<Account, 'transactions'> = {
    id: faker.random.uuid(),
    name: faker.company.companyName(),
    balance: faker.finance.amount(0, 1000, 2, '$'),
    type: faker.finance.accountName(),
    userId
  };
  return Object.assign(new Account(), account);
};

export const withAccountObject = (
  userId: string,
  numberOfAccts: number
): any => <T>(object: T): T => {
  const accounts = _.times<Account>(
    numberOfAccts,
    createAccount.bind(null, userId)
  );
  return {
    ...object,
    accounts
  };
};
