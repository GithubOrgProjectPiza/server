import redis, { createClient } from "redis";
import { promisify } from "util";

function createAsyncClient(client: redis.RedisClientType) {
  return {
    get: promisify(client.get).bind(client),
    set: promisify(client.set).bind(client),
  };
}

/*----E-mail verify----*/

const email: redis.RedisClientType = createClient({
  url: "redis://localhost:6379",
});

email.connect();

export const emailClient = createAsyncClient(email);
