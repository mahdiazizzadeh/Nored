import Client from "../client/client";
import { BitwiseOperator } from "../types/bitwiseOpreator.type";
import Encoder from "../util/encoder";

const { convertToWritble } = new Encoder();

class Bitmap extends Client {
    public BITCOUNT(key: string, start?: number, end?: number, modifier?: "BIT" | "BYTE") {
        const cmd: (string | number)[] = ["BITCOUNT", key, start, end, modifier]
            .filter((opt): opt is string | number => opt !== undefined);
        const buf: Buffer = convertToWritble(cmd);
        return this.sendRquest<number>(buf);
    }

    public SETBIT(key: string, offset: number, value: number): Promise<number> {
        const buf: Buffer = convertToWritble(["SETBIT", key, offset, value]);
        return this.sendRquest<number>(buf);
    }

    public GETBIT(key: string, offset: number): Promise<number> {
        const buf: Buffer = convertToWritble(["GETBIT", key, offset]);
        return this.sendRquest<number>(buf);
    }

    public BITPOS(
        key: string,
        bit: number,
        start?: number,
        end?: number,
        modifier?: "BIT" | "BYTE") {
        const cmd: (string | number)[] = ["BITPOS", key, bit, start, end, modifier]
            .filter((opt): opt is string | number => opt !== undefined);
        const buf: Buffer = convertToWritble(cmd);
        return this.sendRquest<number>(buf);
    }

    public BITOP(keys: string | string[], bitwiseOperation: BitwiseOperator, destkey: string) {
        const cmd: string[] = ["BITOP", bitwiseOperation, destkey];
        Array.isArray(keys)
            ?
            keys.forEach(key => cmd.push(key))
            :
            cmd.push(keys);
        const buf: Buffer = convertToWritble(cmd);
        return this.sendRquest<number>(buf);
    }
}

export default Bitmap;
