const crypto = require("crypto");
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const createHash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
};

const createPKey = (data) => {
  return createHash(JSON.stringify(data));
};

const getCandidate = (data) => {
  if (!data) return TRIVIAL_PARTITION_KEY;

  return data.partitionKey ? data.partitionKey : createPKey(data);
};

exports.deterministicPartitionKey = (event) => {
  const candidate = getCandidate(event);

  return candidate.length > MAX_PARTITION_KEY_LENGTH
    ? createHash(candidate)
    : candidate;
};
