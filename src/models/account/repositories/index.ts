import store from '../../../database/eventLog';
import CreateAccountDTO from '../dtos/createAccount';

export default class AccountRepository {
  private store = store;
  constructor() {
    const { conventions } = store;
    conventions.registerEntityType(CreateAccountDTO);
  }
}
