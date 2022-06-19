import { NextFunction, Request, Response } from 'express';
import apiService from '@services/api.service';

class ApiController {
  public apiService = new apiService();

  public getLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { street, city, state, postalCode, country } = req.query;

      const locationData: any = await this.apiService.getLocation(
        (street as string) || '',
        (city as string) || '',
        (state as string) || '',
        (country as string) || '',
        (postalCode as string) || '',
      );

      return res.status(200).json({ data: locationData, message: 'findLocation' });
    } catch (error) {
      next(error);
    }
  };

  public getWeather = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lat, lon } = req.query;

      const weatherData: any = await this.apiService.getWeather(Number.parseFloat((lat as string) || ''), Number.parseFloat((lon as string) || ''));

      return res.status(200).json({ data: weatherData, message: 'findWeather' });
    } catch (error) {
      next(error);
    }
  };
}

export default ApiController;
