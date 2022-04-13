import Client from "./client/client";

import { IconnectioOptions } from "./interface/connection.interface";
import { Inored } from "./interface/nored.interface";


class Nored extends Client implements Inored {
    constructor(connectionOpt?: IconnectioOptions) {
        if (!connectionOpt) connectionOpt = { port: 6379, host: "localhost" }
        super(connectionOpt);
    }
}

export default Nored;
