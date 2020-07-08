import { IDocumentSession } from 'ravendb';

// import { autoInjectable } from 'tsyringe';
import store from '../../../loaders/database/ravendb';
import { CreateUser } from '../../../typings/user';

export default class UserRepository {
  private session: IDocumentSession;
  private eventLog = store;
  constructor() {
    const { conventions } = this.eventLog;
    conventions.registerEntityType(CreateUser);
    this.session = this.eventLog!.openSession();
  }

  async createUser(user: CreateUser): Promise<any> {
    console.log(user);
    if (await this.createUserIsValid(user.email)) {
      return this.session.store<CreateUser>(user);
    }
    throw new Error('ok');
  }

  private async createUserIsValid(email: string): Promise<boolean> {
    const results = await this.session
      .query<CreateUser>(CreateUser)
      .whereLucene('email', email, true)
      .all();
    console.log(results);
    return results.length === 0;
  }

  async save(): Promise<this> {
    await this.session.saveChanges();
    return this;
  }
  dispose(): void {
    this.session.dispose();
  }
}
