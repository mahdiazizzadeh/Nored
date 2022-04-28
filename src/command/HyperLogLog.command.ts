import Client from "../client/client";
import Encoder from "../util/encoder";
const { convertToWritble } = new Encoder();

class HyperLogLog extends Client {
    public PFADD(key: string, ...value: (string | number)[]) {
        const buf: Buffer = convertToWritble(["PFADD", key, value].flat());
        return this.sendRquest<number>(buf);
    }

    public PFCOUNT(...key: (string | number)[]) {
        const buf: Buffer = convertToWritble(["PFCOUNT", key].flat());
        return this.sendRquest<number>(buf);
    }


    public PFMERGE(destkey: string, ...sourcekey: (string | number)[]) {
        const buf: Buffer = convertToWritble(["PFMERGE", destkey, sourcekey].flat());
        return this.sendRquest<string>(buf);
    }
}

export default HyperLogLog;
