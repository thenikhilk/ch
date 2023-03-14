const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("When no input is given, to get fallback value", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("When input given as a primitive type i.e. string", () => {
    const event = "TheNikhilK";
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe(
      "9d0fc395ea3a2bb90456fd3d28c55c30df98accdec44306eb1d8a1fd4da4710d30523bb9bda8c2ae27a74ccfd730e3ddf8f047d499f029d542f6adf2d57f6b1e"
    );
  });

  it("When input is given as an object without the `partitionKey` property", () => {
    const event = {
      notPartitionKey: "TheNikhilK",
    };
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe(
      "44580e369ca2f53b39cf7fc8b27b5755fe6fe6fb9ad0969335cb2c1731cd84e182c48191ad74763d941619826de22b7dd1b4ec35196a77024b7347a51fce21c2"
    );
  });

  it("When input is given as an object with `partitionKey` as a property", () => {
    const event = {
      partitionKey: "TheNikhilK",
    };
    const trivialKey = deterministicPartitionKey(event);
    
    expect(trivialKey).toBe("TheNikhilK");
  });
});
