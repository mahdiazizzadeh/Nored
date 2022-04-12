interface Itls {
  key?: any;
  cert?: any;
}

interface IconnectioOptions extends Itls {
  port: number;
  host?: string;
  password?: number | string;
  timeOut?: number;
}

export { IconnectioOptions };
