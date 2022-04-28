import type { Error } from "../../src/types/replyError.type";
import Decoder from "../../src/util/decoder";

const decoder = new Decoder();
describe("decoder utitlity test", () => {
  test("error RESP test", () => {
    const input: string = "-ERROR";
    const expected: Error = {
      error: true,
      errorMessage: input.slice(1),
    };
    decoder.decodeResult(input);
    expect(decoder.getResponse).toBe(null);
    expect(decoder.getError).toStrictEqual(expected);
  });
  test("integer RESP", () => {
    const input = ":1111";
    decoder.decodeResult(input);
    expect(decoder.getError).toBe(null);
    expect(decoder.getResponse).toBe(+input.slice(1));
  });
  test("simpleString RESP", () => {
    const input = "+ok";
    decoder.decodeResult(input);
    expect(decoder.getError).toBe(null);
    expect(decoder.getResponse).toBe(input.slice(1));
  });
  test("bulkString RESP", () => {
    const inou = [
      { input: "$5\r\nhello\r\n", expected: "hello" },
      { input: "$0\r\n\r\n", expected: "" },
      { input: "$-1\r\n", expected: null },
    ];
    inou.forEach((reply: { input: string; expected: any }) => {
      decoder.decodeResult(reply.input);
      expect(decoder.getError).toBe(null);
      expect(decoder.getResponse).toBe(reply.expected);
    });
  });
  test("array RESP", () => {
    const inou = [
      { input: "*0\r\n", expected: null },
      {
        input: "*2\r\n$5\r\nhello\r\n$5\r\nworld\r\n",
        expected: ["hello", "world"],
      },
      { input: "*3\r\n:1\r\n:2\r\n:3\r\n", expected: [1, 2, 3] },
      { input: "*-1\r\n", expected: null },
    ];
    inou.forEach((reply) => {
      decoder.decodeResult(reply.input);
      expect(decoder.getError).toBe(null);
      expect(decoder.getResponse).toStrictEqual(reply.expected);
    });
  });
});
