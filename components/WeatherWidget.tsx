
import React, { useEffect, useState } from 'react';
import { fetchWeather, getWeatherIcon, getWeatherDescription } from '../services/weatherService';
import { WeatherData } from '../types';

interface WeatherWidgetProps {
  selectedDate: string;
  dayIndex: number;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ selectedDate, dayIndex }) => {
  const [forecast, setForecast] = useState<WeatherData[] | null>(null);

  useEffect(() => {
    fetchWeather().then(data => {
      if (data) setForecast(data);
    });
  }, []);

  if (!forecast) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg mb-6 border-2 border-blue-400 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  // Get the weather for the selected day index. 
  // If the trip is longer than the forecast (7 days), fallback to the last available day.
  const weather = forecast[dayIndex] || forecast[0];

  // Filter for hours from 08:00 to 23:00 (since 24:00/00:00 is usually start of next day in API)
  const hourlyDisplay = weather.hourly.filter(h => {
    const hour = parseInt(h.time.split(':')[0], 10);
    return hour >= 8;
  });

  return (
    <div className="bg-gradient-to-br from-[#4facfe] to-[#00f2fe] text-white rounded-3xl p-5 shadow-xl mb-6 border-4 border-white/50 transform transition-all hover:shadow-2xl">
      {/* Main Daily Info */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg mb-1 flex items-center gap-2 drop-shadow-sm">
            <span>{selectedDate} 高雄天氣</span>
          </h3>
          <div className="flex items-center gap-3">
             <span className="text-5xl drop-shadow-md filter">{getWeatherIcon(weather.weatherCode)}</span>
             <div>
                <p className="text-xl font-bold">{getWeatherDescription(weather.weatherCode)}</p>
                <div className="flex gap-2 text-sm opacity-90 font-medium">
                   <span>H: {weather.temperatureMax}°</span>
                   <span>L: {weather.temperatureMin}°</span>
                </div>
             </div>
          </div>
        </div>
        
        <div className="text-right space-y-1 text-xs font-medium opacity-90 bg-white/10 p-2 rounded-lg backdrop-blur-sm">
          <div className="flex items-center justify-end gap-1">
            <span>🌅 日出</span>
            <span>{weather.sunrise}</span>
          </div>
          <div className="flex items-center justify-end gap-1">
            <span>🌇 日落</span>
            <span>{weather.sunset}</span>
          </div>
        </div>
      </div>

      {/* Hourly Detail Cards */}
      <div className="pt-4 border-t border-white/20">
        <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-bold opacity-80 uppercase tracking-wider">08:00 - 23:00 詳細預報</p>
            <span className="text-[10px] opacity-70">左右滑動查看 &rarr;</span>
        </div>
        
        <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar px-1">
          {hourlyDisplay.map((hour) => (
            <div key={hour.time} className="flex flex-col items-center bg-white/20 rounded-xl p-3 min-w-[70px] backdrop-blur-md border border-white/10 flex-shrink-0">
              <span className="text-xs font-bold mb-2">{hour.time}</span>
              <span className="text-2xl mb-2 filter drop-shadow-sm">{getWeatherIcon(hour.weatherCode)}</span>
              <span className="text-base font-bold mb-1">{hour.temp}°</span>
              
              <div className="w-full space-y-1 mt-1">
                <div className="flex items-center justify-between text-[10px] bg-blue-500/30 rounded px-1.5 py-0.5 w-full">
                    <span>☔</span>
                    <span>{hour.rainChance}%</span>
                </div>
                <div className="flex items-center justify-between text-[10px] bg-blue-300/20 rounded px-1.5 py-0.5 w-full">
                    <span>💧</span>
                    <span>{hour.humidity}%</span>
                </div>
              </div>
            </div>
          ))}
          {hourlyDisplay.length === 0 && (
             <div className="text-xs opacity-70 w-full text-center">暫無詳細數據</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
