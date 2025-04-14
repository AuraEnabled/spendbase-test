import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherReportDto } from './dto/weatherReport.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post('createReport')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  async createWeatherReport(@Body() weatherReportDto: WeatherReportDto) {
    await this.weatherService.createWeatherReport(weatherReportDto);
  }
}
