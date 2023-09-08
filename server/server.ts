import app from './app';
import dotenv from 'dotenv';
import { createClient, RedisClientType } from 'redis';
dotenv.config();

const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
  console.log(`⚡️Express:${PORT} ⚡️`);
});

// connect redis for use in logout functionality
let redisClient: RedisClientType;
(async () => {
  redisClient = createClient();

  redisClient.on('error', (error) => {
    // ECONNREFUSED error will be thrown if redis is not installed.  brew install redis to resolve
    console.log(`Error connecting redis: ${error}`);
  });

  await redisClient.connect();
})();

export { redisClient };
