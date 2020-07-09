import faker from 'faker';
import { User } from '../../components/User';

export const withUserObject = (id: string) => <T>(object: T): User => {
  const user: Omit<User, 'accounts'> = {
    id,
    name: faker.name.firstName(),
    age: faker.random.number({ min: 18, max: 60 })
  };
  return Object.assign(new User(), {
    ...object,
    ...user
  });
};
