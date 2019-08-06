export interface IRedisTs {
  port: number;
  host: string;
  options?: {} | undefined;
}

const config: IRedisTs = {
  host: process.env.REDIS_ADDRESS
    ? `${process.env.REDIS_ADDRESS}`
    : "127.0.0.1",
  port: parseInt(`${process.env.REDIS_PORT}`, 10)
    ? parseInt(`${process.env.REDIS_PORT}`, 10)
    : 6379
};

export default config;
