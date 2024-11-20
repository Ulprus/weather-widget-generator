import React from 'react';
import { Cloud, Droplets, Thermometer, Wind } from 'lucide-react';

interface WeatherPreviewProps {
  weatherData: {
    city: string;
    temp: number;
    feelsLike: number;
    humidity: number;
    wind: number;
    icon: string;
  } | null;
}

export function WeatherPreview({ weatherData }: WeatherPreviewProps) {
  if (!weatherData) return null;

  return (
    <div className="bg-slate-800 rounded-2xl p-6 mb-8">
      <h2 className="text-xl font-bold text-slate-200 mb-4">Live Preview</h2>
      <div className="weather-widget bg-slate-900 rounded-xl p-6 max-w-sm mx-auto">
        <h3 className="text-2xl font-bold text-slate-200 text-center mb-4">
          {weatherData.city}
        </h3>
        <div className="flex items-center justify-center gap-4 mb-6">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
            alt="Weather icon"
            className="w-20 h-20"
          />
          <div className="text-4xl font-bold text-slate-200">
            {Math.round(weatherData.temp)}°C
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Thermometer size={20} className="text-orange-400" />
            <span>Feels like: {Math.round(weatherData.feelsLike)}°C</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Droplets size={20} className="text-blue-400" />
            <span>Humidity: {weatherData.humidity}%</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Wind size={20} className="text-emerald-400" />
            <span>Wind: {Math.round(weatherData.wind)} m/s</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Cloud size={20} className="text-sky-400" />
            <span>Real-time data</span>
          </div>
        </div>
      </div>
    </div>
  );
}