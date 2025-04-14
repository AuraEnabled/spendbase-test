import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { WeatherPartExclude } from '../../../enums/weatherPartsExclude.enum';
import { IsArrayUnique } from '../../../decorators/isArrayUnique.decorator';

export class WeatherReportDto {
  @IsNotEmpty()
  readonly lat: number;

  @IsNotEmpty()
  readonly lon: number;

  @IsArray()
  @IsOptional()
  @IsEnum(WeatherPartExclude, { each: true })
  @IsArrayUnique()
  readonly part: WeatherPartExclude[];
}
