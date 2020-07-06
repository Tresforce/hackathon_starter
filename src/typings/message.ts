import DetailedError from '../utils/DetailedError';

class Message {
  dateCreated!: Date;
  // id: string;
}

export class Command extends Message {
  name!: string;
  data!: Record<any, any>;
}

export interface Event extends Message {
  [key: string]: any;
}

export type CommandFunction = (name: string) => void | DetailedError;
