import type { Socket } from "net";
import Connect from "../connection/connection";
import { IconnectioOptions } from "../interface/connection.interface";


abstract class Client {
    protected readonly socket: Socket;

    constructor(private readonly connectionOpt?: IconnectioOptions) {
        if (!connectionOpt) connectionOpt = {
            port: 6379, host: "localhost"
        };
        this.socket = new Connect(connectionOpt).getConnection();
        this.socket.isPending = false;
        if (connectionOpt.timeOut) this.socket.setTimeout(connectionOpt.timeOut);
        if (connectionOpt.password) this.authToRedis();

        this.closeConnection();
        this.handleEvents();
    }


    private handleEvents() {
        this.socket.on("error", (err: Error) => console.error(err));

        this.socket.on("timeout", () => {
            console.info("socket Connection Timeout");
            this.closeConnection();
        });

        this.socket.on("data", (data: Buffer) => { });
    }

    private authToRedis() {
        this.sendRquest(this.connectionOpt?.password as unknown as any);
    }

    private closeConnection() {
        this.socket.destroy();
    }

    public abstract sendRquest<T>(buf: Buffer): Promise<T>;
}

export default Client;
