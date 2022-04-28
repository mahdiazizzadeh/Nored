import Hash from "../../src/command/hash.command";
import { deleteAllData, writer } from "../../src/redisWriterForTest";

const hash = new Hash();

beforeAll(() =>
  writer([
    ["HSET", "HDEL", "name", "test", "lname", "test 2", "age", "22"],
    ["HSET", "person", "name", "mahdi", "age", "22", "lname", "azizz"],
    ["HSET", "test3", "name", "this", "val", "is", "galx", "world"],
    ["HMSET", "coin", "heads", "obverse", "tails", "reverse", "edge", "null"],
  ])
);

describe("HASH command : HDEL method", () => {
  it("should remove one key from the hash and return number of the keys deletes", async () => {
    const res = await hash.HDEL("HDEL", "name");
    expect(res).toBe(1);
  });
  it("should remove two key from the hash and return number of the keys deleted", async () => {
    const res = await hash.HDEL("HDEL", "lname", "age");
    expect(res).toBe(2);
  });
});

describe("HASH command : HEXISTS method", () => {
  it("should give true", async () => {
    const res: boolean = await hash.HEXISTS("person", "name");
    expect(res).toBeTruthy();
  });
  it("should give false", async () => {
    const res: boolean = await hash.HEXISTS("person", "nothing");
    expect(res).toBeFalsy();
  });
});

describe("HASH command : HGET method", () => {
  it("should give null", async () => {
    const res: string | null = await hash.HGET("person", "ssssssss");
    expect(res).toBe(null);
  });
  it("should give name", async () => {
    const res: string | null = await hash.HGET("person", "name");
    expect(res).toBe("mahdi");
  });
});

describe("HASH command : HGETALL method", () => {
  it("should give all values in hash", async () => {
    const res = await hash.HGETALL("person");
    const expected = { name: "mahdi", age: "22", lname: "azizz" };
    expect(res).toStrictEqual(expected);
  });
  it("should give null", async () => {
    const res = await hash.HGETALL("s");
    expect(res).toBe(null);
  });
});

describe("HASH command : HINCRBY method", () => {
  it("should increment age", async () => {
    const res = await hash.HINCRBY("person", "age", 11);
    expect(res).toBe(22 + 11);
  });
});

describe("HASH command : HKEYS method", () => {
  it("should give all keys in hash", async () => {
    const res = await hash.HKEYS("person");
    expect(res).toStrictEqual(["name", "age", "lname"]);
  });

  it("should give null", async () => {
    const res = await hash.HKEYS("nothing");
    expect(res).toBe(null);
  });
});

describe("HASH command : HLEN method", () => {
  it("should give length of the keys in hash", async () => {
    const res = await hash.HLEN("person");
    expect(res).toBe(3);
  });

  it("should give null", async () => {
    const res = await hash.HLEN("nothing");
    expect(res).toBe(0);
  });
});

describe("HASH command : HMGET method", () => {
  it("should give us all values that we expect", async () => {
    const res = await hash.HMGET("person", "name", "lname", "age");
    expect(res).toStrictEqual(["mahdi", "azizz", "33"]);
  });

  it("should give values with a null result and number", async () => {
    const res = await hash.HMGET("person", "name", "lname", "age", "null");
    expect(res).toStrictEqual(["mahdi", "azizz", "33", null]);
  });
});

describe("HASH command : HMGET method", () => {
  it("should give us all values that we expect", async () => {
    const res = await hash.HMGET("person", "name", "lname", "age");
    expect(res).toStrictEqual(["mahdi", "azizz", "33"]);
  });

  it("should give values with a null result and number", async () => {
    const res = await hash.HMGET("person", "name", "lname", "age", "null");
    expect(res).toStrictEqual(["mahdi", "azizz", "33", null]);
  });
});

describe("HASH command : HRANDFIELD method", () => {
  it("should give us a random value from hash", async () => {
    const res = await hash.HRANDFIELD("coin");
    const expected = ["heads", "tails", "edge"];
    expect(res).toBe(expected.filter((fl) => fl === res)[0]);
  });
});

describe("HASH command : HMSET method", () => {
  it("should return OK", async () => {
    const res = await hash.HMSET(
      "test",
      { key: "name", value: "mahdi" },
      { key: "lname", value: "azizz" }
    );
    expect(typeof res).toBe("string");
  });
});

describe("HASH command : HSETNX method", () => {
  it("should return true", async () => {
    const res: boolean = await hash.HSETNX("test_HSETNX", "name", "this_Test");
    expect(res).toBe(true);
  });
  it("should return false", async () => {
    const res: boolean = await hash.HSETNX("test_HSETNX", "name", "this_Test");
    expect(res).toBe(false);
  });
});

describe("HASH command : HSTRLEN method", () => {
  it("should return length of the key value", async () => {
    const res: number = await hash.HSTRLEN("test_HSETNX", "name");
    expect(res).toBe(9);
  });
});

describe("HASH command : HVALS method", () => {
  it("should return all values in eperson hash", async () => {
    const res = await hash.HVALS("test3");
    expect(res).toStrictEqual(["this", "is", "world"]);
  });
});

afterAll(() => deleteAllData());
