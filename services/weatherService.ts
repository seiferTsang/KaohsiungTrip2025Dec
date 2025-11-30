import { WeatherData } from '../types';
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

export const fetchWeather = async (): Promise<WeatherData | null> => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${KAOHSIUNG_COORDS.lat}&longitude=${KAOHSIUNG_COORDS.lng}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Asia%2FTaipei`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data.daily) {
      return null;
    }

    // Return today's forecast
    return {
      temperatureMax: data.daily.temperature_2m_max[0],
      temperatureMin: data.daily.temperature_2m_min[0],
      weatherCode: data.daily.weathercode[0],
      sunrise: data.daily.sunrise[0].split('T')[1],
      sunset: data.daily.sunset[0].split('T')[1],
    };
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    return null;
  }
};

export const getWeatherIcon = (code: number): string => {
   if (code === 0) return '☀️';
   if (code >= 1 && code <= 3) return '⛅';
   if (code >= 51) return '🌧️';
   return '☁️';
}

export { getWeatherDescription };
