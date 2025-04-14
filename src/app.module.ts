import { Module } from '@nestjs/common';
import { ormConfig } from './infrastructure/database/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './modules/weather/weather.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    WeatherModule,
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ormConfig(),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
