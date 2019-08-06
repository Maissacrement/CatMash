// Import
import Bluebird = require("bluebird");
import redis = require("redis");
import config from "./config/config";

// Config redis Async flow
Bluebird.promisifyAll(redis);

// Create client
const client = redis.createClient(config);

// function

// Client connected successfully
const OnSuccess = () => {
  process.stdout.write("redis is ready.");
};

// Client get error
const OnError = (err: redis.RedisError) => {
  process.stdout.write(`redis cannot connect, ${err}`);
};

// Manage connection to redis

client.on("ready", OnSuccess);
client.on("error", OnError);

export default client;
