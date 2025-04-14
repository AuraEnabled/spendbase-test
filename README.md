<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# OpenWeatherMap.org test

## Description

Project for interacting with `api.openweathermap.org`, based around NestJS framework. For documentation see [OpenWeatherMap.org](https://openweathermap.org/api/one-call-3#current).
This project uses free version of the API `/data/2.5/weather`.

## Stack
* NestJS
* TypeORM
* PostgreSQL
* Docker

## Project setup
To launch production build in Docker
```bash
$ docker compose up --build
```
Or
```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## API
### Get weather report from DB
Method: GET<br/>
Path: `/api/weather/getReport`<br/>
Query params: 
* lat: string
* lon: string
* part: null | string[]

### Fetch weather info from `api.openweathermap.org` and insert into DB
Method: POST<br/>
Path: `/api/weather/createReport`<br/>
Example payload:
```json5
{
    "lat": 90,
    "lon": -90,
    "part": ["alerts", "minutely", "daily", "current"]
}
```





