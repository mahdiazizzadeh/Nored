import Client from "../client/client";
import Encoder from "../util/encoder";
const { convertToWritble } = new Encoder();
class Hash extends Client {
    public HDEL(key: string, ...field: string[]): Promise<number> {
        const cmd = ["HDEL", key, field].flat();
        const buf: Buffer = convertToWritble(cmd);
        return this.sendRquest<number>(buf);
    };

    public async HEXISTS(key: string, field: string): Promise<boolean> {
        const cmd = ["HEXISTS", key, field];
        const buf: Buffer = convertToWritble(cmd);
        const res = await this.sendRquest<number>(buf)
        return res === 1 ? true : false
    };

    public HGET(key: string, field: string): Promise<string | null> {
        const cmd = ["HGET", key, field];
        const buf: Buffer = convertToWritble(cmd);
        return this.sendRquest<string | null>(buf);
    };

    public async HGETALL(key: string): Promise<Record<any, string | number> | null> {
        const cmd = ["HGETALL", key];
        const buf: Buffer = convertToWritble(cmd);
        const res = await this.sendRquest<string[] | null>(buf);
        return res ? res.reduce((result: Record<any, string | number>, elm, i, array) => {
            i % 2 == 0 ? result[elm] = array[i + 1] : [];
            return result;
        }, {} as Record<any, string | number>) : null;
    }

    public HINCRBY(key: string, field: string, value: number): Promise<number> {
        const buf: Buffer = convertToWritble(["HINCRBY", key, field, value]);
        return this.sendRquest<number>(buf);
    };

    public HINCRBYFLOAT(key: string, field: string, value: number): Promise<number> {
        const buf: Buffer = convertToWritble(["HINCRBYFLOAT", key, field, value]);
        return this.sendRquest<number>(buf);
    };

    public HKEYS(key: string): Promise<string[] | null> {
        const buf: Buffer = convertToWritble(["HKEYS", key]);
        return this.sendRquest<string[] | null>(buf);
    };

    public HLEN(key: string): Promise<number> {
        const buf: Buffer = convertToWritble(["HLEN", key]);
        return this.sendRquest<number>(buf);
    };

    public HMGET(key: string, ...field: string[]): Promise<(string | number | null)[] | null> {
        const buf: Buffer = convertToWritble(["HMGET", key, ...field]);
        return this.sendRquest<(string | number | null)[] | null>(buf);
    };

    public HRANDFIELD(key: string, count?: number, WITHVALUES?: "WITHVALUES") {
        const cmd = ["HRANDFIELD", key, count, WITHVALUES].filter((c): c is string | number => c !== undefined);
        const buf: Buffer = convertToWritble(cmd);
        return this.sendRquest<(string | number)[] | string | number | null>(buf);
    };

    public HMSET(key: string, ...keyAndValue: { key: string, value: string | number }[]) {
        const cmd: (string | number)[] = ["HMSET", key,];
        keyAndValue.forEach(kv => cmd.push(kv.key, kv.value));
        const buf: Buffer = convertToWritble(cmd);
        return this.sendRquest<string>(buf);
    };

    public HSET(key: string, field: string, value: number | string) {
        const cmd: (string | number)[] = ["HSET", key, field, value];
        const buf: Buffer = convertToWritble(cmd);
        return this.sendRquest<number>(buf);
    };

    public async HSETNX(key: string, field: string, value: number | string) {
        const cmd: (string | number)[] = ["HSETNX", key, field, value];
        const buf: Buffer = convertToWritble(cmd);
        const res: number = await this.sendRquest<number>(buf);
        return res === 1 ? true : false;
    };

    public HSTRLEN(key: string, field: string) {
        const cmd: (string | number)[] = ["HSTRLEN", key, field];
        const buf: Buffer = convertToWritble(cmd);
        return this.sendRquest<number>(buf);
    };

    public HVALS(key: string) {
        const cmd: (string | number)[] = ["HVALS", key];
        const buf: Buffer = convertToWritble(cmd);
        return this.sendRquest<(number | string)[] | null>(buf);
    };
};

export default Hash;
