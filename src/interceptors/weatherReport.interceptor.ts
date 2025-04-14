import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherEntity } from '../entities/weather.entity';
import { WeatherResponse } from '../modules/weather/types/weatherResponse.type';

@Injectable()
export class TransformWeatherInterceptor implements NestInterceptor {
  intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Observable<WeatherResponse> {
    return next.handle().pipe(
      map((weatherReport: WeatherEntity) => {
        return {
          sunrise: weatherReport.sunrise,
          sunset: weatherReport.sunset,
          temp: weatherReport.temp,
          feels_like: weatherReport.feels_like,
          pressure: weatherReport.pressure,
          humidity: weatherReport.humidity,
          uvi: weatherReport.uvi,
          wind_speed: weatherReport.wind_speed,
        };
      }),
    );
  }
}
