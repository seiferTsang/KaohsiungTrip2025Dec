import React, { useEffect, useState } from 'react';
import { fetchWeather, getWeatherIcon, getWeatherDescription } from '../services/weatherService';
import { WeatherData } from '../types';

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetchWeather().then(data => {
      if (data) setWeather(data);
    });
  }, []);

  if (!weather) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg mb-6 border-2 border-blue-400 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-2xl p-4 shadow-lg mb-6 border-4 border-white transform transition-all hover:scale-[1.01]">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
            <span>高雄市今日天氣</span>
            <span className="text-yellow-300 text-2xl drop-shadow-md">{getWeatherIcon(weather.weatherCode)}</span>
          </h3>
          <p className="text-sm opacity-90">{getWeatherDescription(weather.weatherCode)}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black tracking-tight">{weather.temperatureMax}°C</div>
          <div className="text-xs opacity-80">Low: {weather.temperatureMin}°C</div>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-white/30 flex justify-between text-xs font-medium">
        <div className="flex items-center gap-1">
          <span>🌅 日出</span>
          <span>{weather.sunrise}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>🌇 日落</span>
          <span>{weather.sunset}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
