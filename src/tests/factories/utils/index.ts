import faker from 'faker';

export function randomOptionalFieldChoice<T>(field: T): T | undefined {
  return faker.helpers.randomize([true, false]) ? field : undefined;
}

export const withConstructor = <T>(constructor: T) => <K>(object: K): K => ({
  __proto__: {
    constructor
  },
  ...object
});
