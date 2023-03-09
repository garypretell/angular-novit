import { TYPES_NOTIFY } from './types-notify';

export interface Notify {
  type: string;
  title: string;
  description: string;
  date: Number;
  data?: Object;
}

export class AlertNotify implements Notify {
  type: string;
  title: string;
  description: string;
  date: Number;

  constructor(...args: Array<string>) {
    const title = args.length > 1 ? args[0] : 'Alert';
    this.title = title;
    this.description = args[args.length - 1];
    this.type = TYPES_NOTIFY.ALERT;
    this.date = Date.now();
  }
}

export class MessageNotify implements Notify {
  type: string;
  title: string;
  description: string;
  date: Number;

  constructor(...args: Array<string>) {
    const title = args.length > 1 ? args[0] : 'Message';
    this.title = title;
    this.description = args[args.length - 1];
    this.type = TYPES_NOTIFY.MESSAGE;
    this.date = Date.now();
  }
}

export class WarningNotify implements Notify {
  type: string;
  title: string;
  description: string;
  date: Number;

  constructor(...args: Array<string>) {
    const title = args.length > 1 ? args[0] : 'Warning';
    this.title = title;
    this.description = args[args.length - 1];
    this.type = TYPES_NOTIFY.WARNING;
    this.date = Date.now();
  }
}

export class ErrorNotify implements Notify {
  type: string;
  title: string;
  description: string;
  date: Number;
  data?: Object;

  constructor(description: string, data?: Object) {
    this.title = 'Error';
    this.description = description;
    this.type = TYPES_NOTIFY.ERROR;
    this.date = Date.now();
    this.data = data;
  }
}
