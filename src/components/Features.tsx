import React from 'react';
import { Cloud, Wind, Droplets, Thermometer, MapPin, Code2 } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export function Features() {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-slate-200 mb-6">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard
          icon={<Code2 className="text-emerald-400" />}
          title="WordPress Ready"
          description="Drop-in PHP code for your WordPress site"
        />
        <FeatureCard
          icon={<MapPin className="text-blue-400" />}
          title="City Search"
          description="Get weather for any city worldwide"
        />
        <FeatureCard
          icon={<Cloud className="text-sky-400" />}
          title="Live Preview"
          description="See how it looks before using"
        />
        <FeatureCard
          icon={<Thermometer className="text-orange-400" />}
          title="Full Data"
          description="Temperature, humidity, wind & more"
        />
      </div>
    </div>
  );
}