import {
  DocumentStore,
  GetStatisticsOperation,
  CreateDatabaseOperation
} from 'ravendb';

import logger from '../../services/logger';

const winston = logger(module);

const store = new DocumentStore(['http://ravendb:8080'], 'eventLog');
const { conventions } = store;
conventions.storeDatesInUtc = true;
store.initialize();

export default store;

export class EventLog {
  private connectionEstablished = false;
  private store: DocumentStore;

  constructor(documentStore: DocumentStore, public database?: string) {
    this.store = documentStore;
    this.database =
      database != null && database.trim()
        ? database.trim()
        : this.store.database;
    if (!this.database) {
      throw new Error('EventLog database cannot be null or whitespace');
    }
  }

  public getStore(): DocumentStore {
    if (this.connectionEstablished) {
      return this.store;
    }
    throw new Error('establish event log connection first');
  }

  public async establishDatabaseConnection(): Promise<void> {
    try {
      winston.info('connecting to eventLog...');
      await this.store.maintenance
        .forDatabase(this.database!)
        .send(new GetStatisticsOperation());
    } catch (error) {
      if (error.name === 'DatabaseDoesNotExistException') {
        winston.warn(
          `Database ${this.database} does not exist, creating new database....`
        );
        await this.store.maintenance.server.send(
          new CreateDatabaseOperation({ databaseName: this.database! })
        );
      } else {
        throw error;
      }
    } finally {
      this.connectionEstablished = true;
    }
  }
}
