// Import
import redis  = require('redis');
import * as Bluebird from "bluebird";
import config from './config/config';

// Config redis Async flow
Bluebird.promisifyAll(redis);

// Create client
const client = redis.createClient(config);

// function

// Client connected successfully
const OnSuccess = () => {
  console.log('redis is ready.')
};

// Client get error
const OnError = (err: redis.RedisError) => {
  console.log(`redis cannot connect, ${err}`)
};

// Manage connection to redis

client.on('ready', OnSuccess);
client.on('error', OnError);

export default client;
