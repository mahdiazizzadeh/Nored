import type { Socket } from "net";
import Connect from "../connection/connection";
import { IconnectioOptions } from "../interface/connection.interface";
import { Reply } from "../types/callback.type";
import { Error } from "../types/replyError.type";
import Decoder from "../util/decoder";
import Encoder from "../util/encoder";

const { convertToWritble } = new Encoder();

const decoder: Decoder = new Decoder();

class Client {
    private readonly socket: Socket;
    private reply: Reply = (error: Error, reply: any) => { };

    constructor(private readonly connectionOpt?: IconnectioOptions) {
        if (!connectionOpt) connectionOpt = {
            port: 6379, host: "localhost"
        };
        this.socket = new Connect(connectionOpt).getConnection();
        this.socket.setEncoding("utf-8");

        if (connectionOpt.timeOut) this.socket.setTimeout(connectionOpt.timeOut);
        if (connectionOpt.password) this.authToRedis();

        this.handleEvents();
    }

    public sendRquest<T>(buf: Buffer): Promise<T> {
        this.socket.write(buf);
        return new Promise<T>(resolve => this.reply = (err, reply) => resolve(err || reply));
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
        this.socket.on("data", (data: string) => {
            decoder.decodeResult(data);
            this.reply(decoder.getError, decoder.getResponse);
        });
    }
}

export default Client;
