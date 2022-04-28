import Encoder from "../../src/util/encoder";

const { convertToWritble } = new Encoder();

describe("encoder utility test", () => {
  it("should return expected result", () => {
    const input: (number | string)[] = ["GET", "name"];
    const expected = convertToWritble(input);
    expect(Buffer.isBuffer(expected)).toBe(true);
    expect(expected.toString()).toBe(`*2\r\n$3\r\nGET\r\n$4\r\nname\r\n`);
  });
});
