import { Router } from 'express';
import ApiController from '@controllers/api.controller';
import { LocationDto, WeatherDto } from '@dtos/api.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class ApiRoute implements Routes {
  public path = '/api';
  public router = Router();
  public apiController = new ApiController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/location`, validationMiddleware(LocationDto, 'query'), this.apiController.getLocation);
    this.router.get(`${this.path}/weather`, authMiddleware, validationMiddleware(WeatherDto, 'query'), this.apiController.getWeather);
  }
}

export default ApiRoute;
