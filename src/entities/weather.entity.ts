import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WeatherPartExclude } from '../enums/weatherPartsExclude.enum';

@Entity('open_weather_data')
@Index(['latitude', 'longitude', 'date', 'part'], { unique: true })
export class WeatherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column({
    type: 'enum',
    enum: WeatherPartExclude,
    enumName: 'open_weather_parts_exclude_type',
    array: true,
  })
  part: WeatherPartExclude[];

  @Column('integer')
  sunrise: number;

  @Column('integer')
  sunset: number;

  @Column('float')
  temp: number;

  @Column('float')
  feels_like: number;

  @Column('integer')
  pressure: number;

  @Column('integer')
  humidity: number;

  @Column('integer')
  uvi: number;

  @Column('float')
  wind_speed: number;

  @BeforeInsert()
  @BeforeUpdate()
  sortArrayParts() {
    console.log('this.part', this.part);
    if (Array.isArray(this.part)) {
      this.part = this.part.sort();
    }
  }
}
