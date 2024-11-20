import React from 'react';
import { Cloud } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-blue-500/10 p-4 rounded-2xl">
          <Cloud size={56} className="text-blue-400" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-slate-200 mb-4">WordPress Weather Widget Generator</h1>
      <p className="text-lg text-slate-400 max-w-2xl mx-auto">Generate PHP code for displaying weather information on your WordPress site</p>
    </div>
  );
}