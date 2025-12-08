
import { WeatherData, HourlyData } from '../types';
import { KAOHSIUNG_COORDS } from '../constants';

// Open-Meteo Weather Codes interpretation
const getWeatherDescription = (code: number): string => {
  if (code === 0) return '晴朗';
  if (code >= 1 && code <= 3) return '多雲時晴';
  if (code >= 45 && code <= 48) return '有霧';
  if (code >= 51 && code <= 67) return '有雨';
  if (code >= 80 && code <= 82) return '陣雨';
  if (code >= 95) return '雷雨';
  return '多雲';
};

export const fetchWeather = async (): Promise<WeatherData[] | null> => {
  try {
    // Added hourly parameters: temperature_2m, relative_humidity_2m, precipitation_probability, weathercode
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${KAOHSIUNG_COORDS.lat}&longitude=${KAOHSIUNG_COORDS.lng}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weathercode&current_weather=true&timezone=Asia%2FTaipei`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data.daily || !data.hourly) {
      return null;
    }

    // Map the daily arrays to an array of WeatherData objects
    const dailyForecast: WeatherData[] = data.daily.time.map((_: string, index: number) => {
      // Logic to extract specific hourly data for this day
      // Open-Meteo returns a flat array of 24h * 7 days.
      const startHour = index * 24;
      const endHour = startHour + 24;
      
      const hourly: HourlyData[] = [];
      
      for (let i = startHour; i < endHour; i++) {
        // Only keep data if it exists (in case API returns fewer hours)
        if (data.hourly.time[i]) {
            const timeStr = data.hourly.time[i].split('T')[1].substring(0, 5); // Extract "HH:MM"
            hourly.push({
                time: timeStr,
                temp: data.hourly.temperature_2m[i],
                humidity: data.hourly.relative_humidity_2m[i],
                rainChance: data.hourly.precipitation_probability[i],
                weatherCode: data.hourly.weathercode[i]
            });
        }
      }

      return {
        temperatureMax: data.daily.temperature_2m_max[index],
        temperatureMin: data.daily.temperature_2m_min[index],
        weatherCode: data.daily.weathercode[index],
        sunrise: data.daily.sunrise[index].split('T')[1],
        sunset: data.daily.sunset[index].split('T')[1],
        hourly: hourly
      };
    });

    return dailyForecast;
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    return null;
  }
};

export const getWeatherIcon = (code: number): string => {
   if (code === 0) return '☀️';
   if (code >= 1 && code <= 3) return '⛅';
   if (code >= 51) return '🌧️';
   if (code >= 95) return '⛈️';
   return '☁️';
}

export { getWeatherDescription };
