import React from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeDisplayProps {
  code: string;
  copied: boolean;
  onCopy: () => void;
}

export function CodeDisplay({ code, copied, onCopy }: CodeDisplayProps) {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-200">Generated PHP Code</h2>
        <button
          onClick={onCopy}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200 text-slate-200"
        >
          {copied ? <CheckCircle2 size={20} className="text-green-400" /> : <Copy size={20} />}
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <div className="relative">
        <SyntaxHighlighter
          language="php"
          style={vscDarkPlus}
          customStyle={{
            borderRadius: '0.5rem',
            margin: 0,
            background: '#0f172a',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}