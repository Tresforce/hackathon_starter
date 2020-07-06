/* eslint-disable max-classes-per-file */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DocumentStore } from 'ravendb';

class Product {
  public title!: string;
  public price!: number;
  public currency!: string;
  public storage!: number;
  public manufacturer!: string;
  public in_stock!: boolean;
  public last_update!: Date;
}

class EventLog {
  connect() {
    const store = new DocumentStore(['http://ravendb:8080'], 'eventLog');
    const { conventions } = store; // DocumentStore customizations
    conventions.storeDatesInUtc = true;
    conventions.registerEntityType(Product);
    store.initialize();
    return store;
  }
}
const store = new EventLog().connect();
/* 
class Pet {
    constructor(name) {
        this.name = name;
    }
}

class Person {
    constructor(name, pet) {
        this.name = name;
        this.pet = pet;
    }
}

documentStore.conventions.registerEntityType(Person);
documentStore.conventions.registerEntityType(Pet);
*/

// void (async function testing(): Promise<void> {
//   const session = store.openSession('eventLog'); // Open a session for a default 'Database'
//   console.log('sessh started');
//   // await session.store(category); // Assign an 'Id' and collection (Categories)
//   // and start tracking an entity

//   // const product = new Product('RavenDB Database', category.Id, 10);
//   try {
//     const product = new Product();
//     product.title = 'iPhone X';
//     product.price = 999.99;
//     product.currency = 'USD';
//     product.storage = 64;
//     product.manufacturer = 'Apple';
//     product.in_stock = true;
//     product.last_update = new Date('2017-10-01T00:00:00');

//     await session.store(product /* ,id */);
//     console.log(product); // Products/1-A
//     await session.saveChanges();
//     console.log('seesh saved');
//   } catch (error) {
//     console.log(error);
//   }
// })();

export default store;
