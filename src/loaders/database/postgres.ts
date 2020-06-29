import 'reflect-metadata';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import config from '../../config';
import User from '../../database/entities/User';

const { host, port, username, password, database } = config.database;

const pgConnectionOptions = {
  type: 'postgres',
  host: host!,
  port: port!,
  password: password!,
  username: username!,
  logging: ['error', 'info'],
  synchronize: true,
  entities: [User],
  database: database!
};

export default class Database {
  public connectionOptions: {
    type: string;
    host: string;
    port: number;
    password: string;
    username: string;
    logging: string[];
    synchronize: boolean;
    entities: any;
    database: string;
  };

  private retries = 3;

  constructor(connectionOptions = pgConnectionOptions) {
    this.connectionOptions = connectionOptions;
  }

  public async getDbConnection({
    testDb
  }: {
    testDb?: boolean;
  }): Promise<Connection> {
    if (typeof testDb !== 'undefined' && testDb) {
      this.connectionOptions.database = 'testdb';
      this.connectionOptions.synchronize = false;
    }
    const connection = createConnection(
      this.connectionOptions as ConnectionOptions
    );
    return connection;
  }

  // public async establishConnection(): Promise<Connection> {
  //   // FIXME get this working properly with queue
  //   let connection: Connection;
  //   try {
  //     // eslint-disable-next-line no-await-in-loop
  //     connection = await this.getDbConnection();
  //     console.log(connection);
  //     return connection;
  //   } catch (error) {
  //     if (this.retries > 0) {
  //       this.retries -= 1;
  //       logger.warn(
  //         `${error.message}retrying database connection: ${this.retries} left`
  //       );
  //       console.log(this);
  //       setTimeout(this.establishConnection, 3000);
  //     } else {
  //       logger.error(error);
  //       process.exit(1);
  //     }
  //   }
  // }
}
