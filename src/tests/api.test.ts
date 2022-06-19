import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '../app';
import { LocationDto, WeatherDto } from '../dtos/api.dto';
import UsersRoute from '../routes/users.route';
import AuthRoute from '../routes/auth.route';
import ApiRoute from '../routes/api.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Api', () => {
  describe('[GET] /location', () => {
    it('Get 200 ', async () => {
      const apiRoute = new ApiRoute();
      const app = new App([apiRoute]);
      return request(app.getServer())
        .get(`${apiRoute.path}/location?street=vicuña mackenna&city=santiago&country=chile&state=metropolitana&postalCode=8320000`)
        .expect(200);
    });
  });

  describe('[GET] /weather', () => {
    it('Get a correct response', async () => {
      // Auth
      const usersRoute = new UsersRoute();
      const apiRoute = new ApiRoute();
      const authRoute = new AuthRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue({
        _id: 'test',
        email: 'test@email.com',
        password: await bcrypt.hash('12345678', 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute, apiRoute]);
      const authResponse = await request(app.getServer()).post(`${authRoute.path}login`).send({ email: 'test@email.com', password: '12345678' });
      const token = authResponse.body.data.token;

      return request(app.getServer()).get(`${apiRoute.path}/weather?lon=113.17&lat=23.09`).set('Authorization', `Bearer ${token}`).expect(200);
    });

    it('Get an authorization error if the token is invalid', async () => {
      const apiRoute = new ApiRoute();
      const app = new App([apiRoute]);
      const token = 'fake';
      return request(app.getServer()).get(`${apiRoute.path}/weather?lon=113.17&lat=23.09`).set('Authorization', `Bearer ${token}`).expect(401);
    });
  });
});
