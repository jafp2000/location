import axios from 'axios';
import { HttpException } from '@exceptions/HttpException';

class ApiService {
  locationApi = 'https://nominatim.openstreetmap.org/search';
  weatherApi = 'http://www.7timer.info/bin/api.pl';

  public async getLocation(street: string, city: string, state: string, country: string, postalCode: string): Promise<any> {
    const params = {
      street,
      city,
      state,
      country,
      postalcode: postalCode,
      format: 'json',
      addressdetails: 1,
      limit: 1,
    };

    const response = await this.fetchGet(this.locationApi, params);

    return response;
  }

  public async getWeather(lat: number, lon: number): Promise<any> {
    const params = {
      lon: lon,
      lat: lat,
      product: 'astro',
      output: 'json',
    };

    const response = await this.fetchGet(this.weatherApi, params);

    return response;
  }

  private async fetchGet(uri: string, params: any): Promise<any> {
    try {
      const response = await axios.get(uri, { params });

      return response.data;
    } catch (error) {
      throw new HttpException(500, error?.message || 'oops something went wrong');
    }
  }
}

export default ApiService;
