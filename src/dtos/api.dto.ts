import { IsString, IsNumberString } from 'class-validator';

export class LocationDto {
  @IsString()
  public street: string;

  @IsString()
  public city: string;

  @IsString()
  public country: string;

  @IsString()
  public state: string;

  @IsNumberString()
  public postalCode: string;
}

export class WeatherDto {
  @IsNumberString()
  public lat: string;

  @IsNumberString()
  public lon: string;
}
