import { NextFunction, Request, Response } from 'express';
import apiService from '@services/api.service';
import redisService from '@utils/redis';

class ApiController {
  public apiService = new apiService();

  public getLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { street, city, state, postalCode, country } = req.query;

      const cacheData = await redisService.get(`${street}${city}${state}${postalCode}${country}`);

      if (cacheData) {
        return res.status(200).json({ data: cacheData, message: 'findLocation' });
      }

      const locationData: any = await this.apiService.getLocation(
        (street as string) || '',
        (city as string) || '',
        (state as string) || '',
        (country as string) || '',
        (postalCode as string) || '',
      );

      await redisService.set(`${street}${city}${state}${postalCode}${country}`, locationData);

      return res.status(200).json({ data: locationData, message: 'findLocation' });
    } catch (error) {
      next(error);
    }
  };

  public getWeather = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lat, lon } = req.query;

      const cacheData = await redisService.get(`${lat}${lon}`);

      if (cacheData) {
        return res.status(200).json({ data: cacheData, message: 'findWeather' });
      }

      const weatherData: any = await this.apiService.getWeather(Number.parseFloat((lat as string) || ''), Number.parseFloat((lon as string) || ''));

      await redisService.set(`${lat}${lon}`, weatherData);

      return res.status(200).json({ data: weatherData, message: 'findWeather' });
    } catch (error) {
      next(error);
    }
  };
}

export default ApiController;
