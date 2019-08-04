export interface redisTs {
  port: number;
  host: string;
  options?: {} | undefined;
}

const config: redisTs = {
  port: parseInt(`${process.env.REDIS_PORT}`)
    ? parseInt(`${process.env.REDIS_PORT}`)
    : 6379,
  host: process.env.REDIS_ADDRESS ? `${process.env.REDIS_ADDRESS}` : "127.0.0.1"
};

export default config;
