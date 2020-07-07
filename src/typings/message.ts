import DetailedError from '../utils/DetailedError';

class Message {
  dateCreated!: Date;
  // id: string;
}

export class Command extends Message {
  name!: string;
  data!: Record<any, any>;
}

export class Event extends Message {}

export type CommandFunction = (name: string) => Promise<void | DetailedError>;
