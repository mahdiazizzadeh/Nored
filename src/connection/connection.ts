import { createConnection, Socket } from "net";
import { connect } from "tls";

import type {
    IconnectioOptions, Iconnect
} from "../interface/connection.interface";


class Connect implements Iconnect {
    constructor(private readonly connectionOpt: IconnectioOptions) { }

    public getConnection(): Socket {
        if (this.connectionOpt.cert && this.connectionOpt.key)
            return this.getTlsConnection();
        return this.getTcpConnection();
    }

    private getTlsConnection(): Socket {
        return connect({
            port: this.connectionOpt.port,
            host: this.connectionOpt.host || "localhost",
            key: this.connectionOpt.key,
            cert: this.connectionOpt.cert,
        });
    }

    private getTcpConnection(): Socket {
        return createConnection({
            port: this.connectionOpt.port,
            host: this.connectionOpt.host || "localhost",
        });
    }

}


export default Connect;