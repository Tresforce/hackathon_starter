import { DocumentStore } from 'ravendb';

const store = new DocumentStore(['http://ravendb:8080'], 'eventLog');
const { conventions } = store; // DocumentStore customizations
conventions.storeDatesInUtc = true;
store.initialize();
export default store;
