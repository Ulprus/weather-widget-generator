import React from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';

interface WeatherFormProps {
  apiKey: string;
  city: string;
  error: string;
  isValidating: boolean;
  onApiKeyChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onGenerate: () => void;
}

export function WeatherForm({ 
  apiKey, 
  city, 
  error, 
  isValidating,
  onApiKeyChange, 
  onCityChange, 
  onGenerate 
}: WeatherFormProps) {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">
      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            OpenWeatherMap API Key
          </label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your API key"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            City Name
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., London"
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-900/50 rounded-lg flex items-center gap-2 text-red-200">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={onGenerate}
        disabled={isValidating}
        className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isValidating ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Validating...
          </>
        ) : (
          'Generate Code'
        )}
      </button>
    </div>
  );
}