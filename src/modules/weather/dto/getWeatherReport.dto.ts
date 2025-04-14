import { IsNumber, IsOptional, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { WeatherPartExclude } from '../../../enums/weatherPartsExclude.enum';
import { IsArrayUnique } from '../../../decorators/isArrayUnique.decorator';

export class GetWeatherReportDto {
  @Transform(({ value }: { value: string }) => parseFloat(value))
  @IsNumber()
  lat: number;

  @Transform(({ value }: { value: string }) => parseFloat(value))
  @IsNumber()
  lon: number;

  @IsOptional()
  @Transform(({ value }: { value: string }) => value?.split(','))
  @IsEnum(WeatherPartExclude, { each: true })
  @IsArrayUnique()
  part?: WeatherPartExclude[];
}
