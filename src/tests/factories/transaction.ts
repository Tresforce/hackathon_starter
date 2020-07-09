import _ from 'lodash';
import faker from 'faker';
import { Transaction } from '../../components/Transaction';
import { UUID } from '../../typings';
import { randomOptionalFieldChoice } from './utils';

const createTransaction = (userId: UUID, accountId: UUID): Transaction => {
  const dateCleared = randomOptionalFieldChoice(faker.date.recent());
  const transaction: Transaction = {
    id: faker.random.uuid(),
    userId,
    accountId,
    amount: faker.finance.amount(0, 1000, 2, '$'),
    datePosted: faker.date.past(),
    dateCleared,
    payee: faker.company.companyName(),
    categoryId: randomOptionalFieldChoice(faker.random.uuid()),
    memo: randomOptionalFieldChoice(faker.lorem.sentence(7)),
    cleared: !!dateCleared
  };
  return Object.assign(new Transaction(), transaction);
};

export const withTransactionObject = (
  userId: UUID,
  accountId: UUID,
  numberOfTransactions: number
): any => <T>(object: T): T => {
  const transactions = _.times<Transaction>(
    numberOfTransactions,
    createTransaction.bind(null, userId, accountId)
  );
  return {
    ...object,
    transactions
  };
};
