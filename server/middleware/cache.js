const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const cache =
  (key, ttl = 3600) =>
  async (req, res, next) => {
    const cachedData = await getAsync(key);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    res.sendResponse = res.json;
    res.json = (data) => {
      setAsync(key, JSON.stringify(data), "EX", ttl); // Cache for 1 hour
      res.sendResponse(data);
    };
    next();
  };

module.exports = cache;
