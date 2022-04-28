import Client from "./client/client";
import Encoder from "./util/encoder";

const Nored = new Client({ port: 6379 });
const { convertToWritble } = new Encoder();

const writer = (cmds: (number | string)[][]) => {
  const result: Buffer[] = cmds.map((cmd) => convertToWritble(cmd));
  Promise.all(
    result.map(async (buf) => {
      await Nored.sendRquest(buf);
    })
  );
};

const deleteAllData = async () => {
  const buf: Buffer = convertToWritble(["FLUSHALL", "SYNC"]);
  await Nored.sendRquest(buf);
};

export { deleteAllData, writer };
