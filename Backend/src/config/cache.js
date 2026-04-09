import Redis from "ioredis";

let redis;

export const connectRedis = () => {
  redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: 3,
    
    retryStrategy(times) {
      const delay = Math.min(times * 100, 2000);
      return delay;
    }
  });

  redis.on("ready", () => {
    console.log("Redis connected");
  });

  redis.on("error", (err) => {
    console.error("Redis error:", err);
  });

  redis.on("close", () => {
    console.log("Redis connection closed");
  });

  return redis;
};

export const getRedis = () => {
  if (!redis) {
    throw new Error("Redis not initialized");
  }
  return redis;
};