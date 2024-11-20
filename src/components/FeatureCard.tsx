import React, { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700/50">
      <div className="w-12 h-12 flex items-center justify-center bg-slate-800 rounded-lg shadow-lg mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-200 mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}