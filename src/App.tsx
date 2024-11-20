import React, { useState } from 'react';
import { Header } from './components/Header';
import { WeatherForm } from './components/WeatherForm';
import { WeatherPreview } from './components/WeatherPreview';
import { CodeDisplay } from './components/CodeDisplay';
import { Features } from './components/Features';
import { Footer } from './components/Footer';

interface WeatherData {
  city: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  icon: string;
}

function App() {
  const [apiKey, setApiKey] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!apiKey || !city) {
      setError('Please fill in all fields');
      return;
    }

    setIsValidating(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=metric`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch weather data');
      }

      const weatherInfo = {
        city: data.name,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        icon: data.weather[0].icon,
      };

      setWeatherData(weatherInfo);
      generateCode(weatherInfo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsValidating(false);
    }
  };

  const generateCode = (weatherInfo: WeatherData) => {
    const code = `<?php
// OpenWeatherMap API Weather Display
$api_key = '${apiKey}';
$city = '${city}';
$api_url = "https://api.openweathermap.org/data/2.5/weather?q={$city}&appid={$api_key}&units=metric";

$response = wp_remote_get($api_url);
if (is_wp_error($response)) {
    echo 'Error fetching weather data';
    return;
}

$weather_data = json_decode(wp_remote_retrieve_body($response), true);
if (!$weather_data) {
    echo 'Error parsing weather data';
    return;
}

$city = $weather_data['name'];
$temp = round($weather_data['main']['temp']);
$feels_like = round($weather_data['main']['feels_like']);
$humidity = $weather_data['main']['humidity'];
$wind = round($weather_data['wind']['speed']);
$icon = $weather_data['weather'][0]['icon'];

// SVG Icons
$thermometer_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-400"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path></svg>';
$droplets_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path></svg>';
$wind_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path><path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path><path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path></svg>';
$cloud_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-sky-400"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>';
?>

<div class="weather-widget">
    <h3 class="weather-title"><?php echo esc_html($city); ?></h3>
    <div class="weather-main">
        <img src="https://openweathermap.org/img/wn/<?php echo esc_attr($icon); ?>@2x.png" alt="Weather icon" class="weather-icon">
        <div class="weather-temp"><?php echo esc_html($temp); ?>°C</div>
    </div>
    <div class="weather-grid">
        <div class="weather-item">
            <?php echo $thermometer_icon; ?>
            <span>Feels like: <?php echo esc_html($feels_like); ?>°C</span>
        </div>
        <div class="weather-item">
            <?php echo $droplets_icon; ?>
            <span>Humidity: <?php echo esc_html($humidity); ?>%</span>
        </div>
        <div class="weather-item">
            <?php echo $wind_icon; ?>
            <span>Wind: <?php echo esc_html($wind); ?> m/s</span>
        </div>
        <div class="weather-item">
            <?php echo $cloud_icon; ?>
            <span>Real-time data</span>
        </div>
    </div>
</div>

<style>
.weather-widget {
    background: #0f172a;
    border-radius: 0.75rem;
    padding: 1.5rem;
    color: #e2e8f0;
    font-family: system-ui, -apple-system, sans-serif;
}

.weather-title {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    color: #e2e8f0;
    margin: 0 0 1rem 0;
}

.weather-main {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.weather-icon {
    width: 5rem;
    height: 5rem;
}

.weather-temp {
    font-size: 2.25rem;
    font-weight: 700;
    color: #e2e8f0;
}

.weather-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
}

.weather-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #cbd5e1;
}

.weather-item svg {
    flex-shrink: 0;
}

.text-orange-400 { color: #fb923c; }
.text-blue-400 { color: #60a5fa; }
.text-emerald-400 { color: #34d399; }
.text-sky-400 { color: #38bdf8; }
</style>`;
    setGeneratedCode(code);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <div className="space-y-8">
          <WeatherForm
            apiKey={apiKey}
            city={city}
            error={error}
            isValidating={isValidating}
            onApiKeyChange={setApiKey}
            onCityChange={setCity}
            onGenerate={handleGenerate}
          />
          {weatherData && <WeatherPreview weatherData={weatherData} />}
          {generatedCode && (
            <CodeDisplay
              code={generatedCode}
              copied={copied}
              onCopy={handleCopy}
            />
          )}
          <Features />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;