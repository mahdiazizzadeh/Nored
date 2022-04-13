import type { Socket } from "net";

interface Itls {
  key?: string;
  cert?: string;
}

interface IconnectioOptions extends Itls {
  port: number;
  host?: string;
  password?: number | string;
  timeOut?: number;
}

interface Iconnect {
  getConnection(): Socket;
}

export { Iconnect, IconnectioOptions };
