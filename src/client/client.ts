import type { Socket } from "net";
import Connect from "../connection/connection";
import { IconnectioOptions } from "../interface/connection.interface";
import { Reply } from "../types/callback.type";
import Encoder from "../util/encoder";
import Queue from "../util/queue";


const { convertToWritble } = new Encoder();

class Client {
    private readonly socket: Socket;
    private reply: Reply = (error, reply) => { };
    private readonly queue: Queue<Buffer>;
    private isPending: boolean = false;

    constructor(private readonly connectionOpt?: IconnectioOptions) {
        this.queue = new Queue<Buffer>();

        if (!connectionOpt) connectionOpt = {
            port: 6379, host: "localhost"
        };
        this.socket = new Connect(connectionOpt).getConnection();

        if (connectionOpt.timeOut) this.socket.setTimeout(connectionOpt.timeOut);
        if (connectionOpt.password) this.authToRedis();

        this.handleEvents();
    }

    public sendRquest<T>(buf: Buffer): Promise<T> {
        return new Promise((resolve, reject) => {
            if (!this.isPending) {
                this.socket.write(buf);
                this.reply = (err, reply) => { err ? reject(err) : resolve(reply) };
                this.isPending = true;
            } else {
                this.queue.add(buf as Buffer);
            }
        });
    };

    private authToRedis() {
        const buf: Buffer = convertToWritble(["AUTH", this.connectionOpt!.password as string]);
        this.sendRquest<boolean>(buf);
    }

    private closeConnection() {
        this.socket.destroy();
    }

    private handleEvents() {
        this.socket.on("error", (err: Error) => console.error(err));
        this.socket.on("timeout", () => {
            console.info("socket Connection Timeout");
            this.closeConnection();
        });
        this.socket.on("data", (data: Buffer) => {
            this.reply(false, data.toString());
            this.isPending = false;
            if (this.queue.getSize > 0) {
                this.sendRquest(this.queue.shift() as Buffer);
            }
        });
    }
}

export default Client;
