export type OpenWeatherApiResponse = {
  sys: {
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    pressure: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
};
