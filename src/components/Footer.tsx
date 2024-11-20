import React from 'react';
import { Coffee } from 'lucide-react';

export function Footer() {
  return (
    <footer className="text-center mt-12 pb-8">
      <div className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-300 transition-colors">
        <span>Created by Luke Allen</span>
        <a
          href="https://buymeacoffee.com/lukeallen"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <Coffee size={20} className="animate-bounce" />
          <span>Buy me a Monster Energy!</span>
        </a>
      </div>
    </footer>
  );
}