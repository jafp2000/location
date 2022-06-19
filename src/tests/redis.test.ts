import redisService from '../utils/redis';

describe('Testing Redis cache handle', () => {
  it('Should set and get item into redis', async () => {
    await redisService.set('test', { id: 1 });
    const redisData: any = await redisService.get('test');

    expect(redisData.id).toBe(1);
  });

  it('Should update date from key with', async () => {
    await redisService.set('test', { id: 1 });
    await redisService.set('test', { id: 2 });
    const redisData: any = await redisService.get('test');

    expect(redisData.id).toBe(2);
  });

  it('Should delete data from redis', async () => {
    await redisService.set('test', { id: 1 });
    await redisService.delete('test');
    const redisData: any = await redisService.get('test');

    expect(redisData).toBe(null);
  });
});
