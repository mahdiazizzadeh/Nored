import Bitmap from "../../src/command/bitmap.command";
import { deleteAllData, writer } from "../../src/redisWriterForTest";

const bitmap = new Bitmap();

beforeAll(() =>
  writer([
    ["SET", "mykey", "foobar"],
    ["SETBIT", "test", "7", "1"],
    ["SET", "BITPOS", "this is test"],
    ["SET", "BITOP", "hello"],
    ["SET", "BITOP1", "world"],
  ])
);

describe("BITMAP command : BITCOUNT method", () => {
  it("should return all bitCount of mykey", async () => {
    const bitCount: number = await bitmap.BITCOUNT("mykey");
    expect(bitCount).toBe(26);
  });

  it("should return bitCount of mykey with BIT argument", async () => {
    const bitCount: number = await bitmap.BITCOUNT("mykey", 5, 30, "BIT");
    expect(bitCount).toBe(17);
  });

  it("should return bitCount of mykey with BYTE argument", async () => {
    const bitCount: number = await bitmap.BITCOUNT("mykey", 1, 1, "BYTE");
    expect(bitCount).toBe(6);
  });
});

describe("BITMAP command : SETBIT method", () => {
  it("should return 0", async () => {
    const bitCount: number = await bitmap.SETBIT("name", 7, 1);
    expect(bitCount).toBe(0);
  });

  it("should return 1", async () => {
    const bitCount: number = await bitmap.SETBIT("name", 7, 0);
    expect(bitCount).toBe(1);
  });
});

describe("BITMAP command : GETBIT method", () => {
  it("should return 0", async () => {
    const bitCount: number = await bitmap.GETBIT("test", 0);
    expect(bitCount).toBe(0);
  });

  it("should return 1", async () => {
    const bitCount: number = await bitmap.GETBIT("test", 7);
    expect(bitCount).toBe(1);
  });
});

describe("BITMAP command : BITPOS method", () => {
  it("should return 0", async () => {
    const bitCount: number = await bitmap.BITPOS("BITPOS", 0);
    expect(bitCount).toBe(0);
  });

  it("should return 1", async () => {
    const bitCount: number = await bitmap.BITPOS("BITPOS", 1, 2);
    expect(bitCount).toBe(17);
  });

  it("should return 18", async () => {
    const bitCount: number = await bitmap.BITPOS("BITPOS", 1, 2, -1, "BYTE");
    expect(bitCount).toBe(17);
  });

  it("should return 9", async () => {
    const bitCount: number = await bitmap.BITPOS("BITPOS", 1, 7, 15, "BIT");
    expect(bitCount).toBe(9);
  });
});

describe("BITMAP command : BITOP method", () => {
  it("should return 9", async () => {
    const bitCount: number = await bitmap.BITOP(
      ["BITOP", "BITOP1"],
      "AND",
      "BITTOP_TEST_KEY"
    );
    expect(bitCount).toBe(5);
  });
});

afterAll(() => deleteAllData());
