import store from '../../../database/eventLog';

export default class UserRepository {
  private session = store.openSession();
  constructor() {
    const { conventions } = store;
    // conventions.registerEntityType();
  }
}
