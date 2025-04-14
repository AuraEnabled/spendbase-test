import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherEntity } from '../../entities/weather.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherEntity]), HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
