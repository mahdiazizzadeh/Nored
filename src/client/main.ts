import { Socket } from "net";
import Connect from "../connection/connection";
import { IconnectioOptions } from "../interface/connection.interface";

abstract class Main {
    private readonly socket: Socket;

    constructor(ConnectionOpt: IconnectioOptions) {
        this.socket = new Connect(ConnectionOpt).getConnection();
        this.handleEvent()
    }
    public sendRequest(buf: Buffer) { }

    private handleEvent() { }
}

export default Main;
