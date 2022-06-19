import { createClient } from 'redis';

class RedisService {
  redisClient;

  /**
   * Initialize redis client if this isn't
   */
  public async init() {
    const isInit = await this.redisTest();

    if (!isInit) {
      this.redisClient = createClient({ url: process.env.REDIS_URL });

      await this.redisClient.connect();
    }
  }

  /**
   * Check if redis client is connected
   * @returns Boolean
   */
  async redisTest(): Promise<boolean> {
    try {
      await this.redisClient.ping();

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Take key params to return a record on redis
   * @param id Id of the record to search
   * @returns Data store on redis with the provided key
   */
  public async get(id): Promise<any> {
    const result: any = await this.redisClient.get(id);

    if (result) {
      return JSON.parse(result);
    }
    return null;
  }

  /**
   * Save on redis a data item building a new key
   * @param id Id of the record to search
   * @param data Item to save into redis
   * @returns Promise
   */
  public async set(id, data: any): Promise<any> {
    return this.redisClient.set(id, JSON.stringify(data));
  }

  /**
   * Take key params to delete a record on redis
   * @param id
   * @returns Promise
   */
  public async delete(id): Promise<any> {
    return this.redisClient.del(id);
  }
}

const redis = new RedisService();

redis.init();

export default redis;
