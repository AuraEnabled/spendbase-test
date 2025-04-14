import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherReportDto } from './dto/weatherReport.dto';
import { GetWeatherReportDto } from './dto/getWeatherReport.dto';
import { TransformWeatherInterceptor } from '../../interceptors/weatherReport.interceptor';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('getReport')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(TransformWeatherInterceptor)
  async getWeatherReport(@Query() query: GetWeatherReportDto) {
    const { lat, lon, part } = query;

    const report = await this.weatherService.getWeatherReportFromDb(
      lat,
      lon,
      part,
    );

    if (!report) {
      throw new HttpException('No report by given criteria', 404);
    }
    return report;
  }

  @Post('createReport')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  async createWeatherReport(@Body() weatherReportDto: WeatherReportDto) {
    await this.weatherService.createWeatherReport(weatherReportDto);
  }
}
