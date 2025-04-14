import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherEntity } from '../../entities/weather.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { WeatherReportDto } from './dto/weatherReport.dto';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { OpenWeatherApiResponse } from './types/openWeatherApi.type';
import { format } from 'date-fns';
import { WeatherPartExclude } from '../../enums/weatherPartsExclude.enum';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(WeatherEntity)
    private readonly weatherRepository: Repository<WeatherEntity>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async createWeatherReport(dto: WeatherReportDto): Promise<void> {
    const appid = this.configService.get<string>('OPEN_WEATHER_APP_KEY');

    const { data } = await firstValueFrom(
      this.httpService
        .get<OpenWeatherApiResponse>(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              lat: dto.lat,
              lon: dto.lon,
              exclude: dto.part?.join(','),
              appid,
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(
              'Error getting response from api.openweathermap.org:' +
                error.cause?.message,
              500,
            );
          }),
        ),
    );

    await this.insertWeatherReport(dto.lat, dto.lon, dto.part, data);
  }

  private async insertWeatherReport(
    latitude: number,
    longitude: number,
    part: WeatherPartExclude[],
    data: OpenWeatherApiResponse,
  ) {
    await this.weatherRepository.upsert(
      [
        {
          latitude,
          longitude,
          part,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          uvi: 0, // paid plan
          wind_speed: data.wind.speed,
          date: format(new Date(), 'yyyy-MM-dd'),
        },
      ],
      ['latitude', 'longitude', 'date', 'part'],
    );
  }
}
