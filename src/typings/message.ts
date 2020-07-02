interface Message {
  dateCreated: Date;
  id: string;
}

export interface Command extends Message {
  name: string;
}

export interface Event extends Message {
  [key: string]: any;
}
