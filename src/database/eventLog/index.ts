import { DocumentStore } from 'ravendb';

const store = new DocumentStore(['http://ravendb:8080'], 'eventLog');
const { conventions } = store; // DocumentStore customizations
conventions.storeDatesInUtc = true;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
store.conventions.findCollectionNameForObjectLiteral = (entity: any) =>
  // eslint-disable-next-line dot-notation
  entity['collection'];
store.initialize();
export default store;
