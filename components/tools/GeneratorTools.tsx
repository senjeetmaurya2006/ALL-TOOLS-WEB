import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({ upper: true, lower: true, numbers: true, symbols: true });
  const [password, setPassword] = useState('');

  const generate = () => {
    const chars = {
      upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lower: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };
    let pool = '';
    if (options.upper) pool += chars.upper;
    if (options.lower) pool += chars.lower;
    if (options.numbers) pool += chars.numbers;
    if (options.symbols) pool += chars.symbols;

    let pass = '';
    for (let i = 0; i < length; i++) {
      pass += pool.charAt(Math.floor(Math.random() * pool.length));
    }
    setPassword(pass);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="relative">
        <input 
          type="text" 
          readOnly 
          value={password} 
          className="w-full p-4 pr-12 text-center text-xl font-mono bg-slate-100 dark:bg-slate-800 rounded-xl"
          placeholder="Click generate"
        />
        <button onClick={() => navigator.clipboard.writeText(password)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md">
          <Copy size={18} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <input type="range" min="6" max="32" value={length} onChange={e => setLength(Number(e.target.value))} className="flex-1" />
          <span className="w-8 text-center font-bold">{length}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {Object.keys(options).map(opt => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <input 
                type="checkbox" 
                checked={options[opt as keyof typeof options]} 
                onChange={() => setOptions(prev => ({ ...prev, [opt]: !prev[opt as keyof typeof options] }))}
                className="w-4 h-4 text-primary-600 rounded"
              />
              <span className="capitalize">{opt}</span>
            </label>
          ))}
        </div>
        
        <button onClick={generate} className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
          <RefreshCw size={18} /> Generate Password
        </button>
      </div>
    </div>
  );
};

export const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState('https://example.com');
  const [size, setSize] = useState(200);

  // Using a public API for QR generation to avoid heavy client-side lib dependencies in this snippet
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <img src={qrUrl} alt="QR Code" className="max-w-full" />
      </div>
      <div className="w-full max-w-md space-y-4">
        <input 
          type="text" 
          value={text} 
          onChange={e => setText(e.target.value)} 
          className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700" 
          placeholder="Enter URL or Text" 
        />
        <div className="flex items-center gap-2">
            <span className="text-sm">Size:</span>
            <input type="range" min="100" max="500" value={size} onChange={e => setSize(Number(e.target.value))} className="flex-1" />
        </div>
        <a 
          href={qrUrl} 
          download="qrcode.png" 
          target="_blank" 
          rel="noreferrer"
          className="block w-full text-center py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 rounded-lg transition-colors"
        >
          Download PNG
        </a>
      </div>
    </div>
  );
};

export const UUIDGenerator: React.FC = () => {
    const [uuids, setUuids] = useState<string[]>([]);
    
    const generate = () => {
        const newUuids = Array(5).fill(0).map(() => crypto.randomUUID());
        setUuids(newUuids);
    };

    return (
        <div className="space-y-4">
             <button onClick={generate} className="bg-primary-600 text-white px-4 py-2 rounded-lg">Generate Batch</button>
             <div className="space-y-2">
                {uuids.map((id, i) => (
                    <div key={i} className="flex justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded font-mono text-sm">
                        {id}
                        <button onClick={() => navigator.clipboard.writeText(id)} className="text-slate-400 hover:text-primary-600"><Copy size={16}/></button>
                    </div>
                ))}
             </div>
        </div>
    )
}

export const LoremIpsumGenerator: React.FC = () => {
    const [paras, setParas] = useState(3);
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <label>Paragraphs:</label>
                <input type="number" min="1" max="10" value={paras} onChange={e => setParas(Number(e.target.value))} className="p-2 border rounded w-20 dark:bg-slate-800" />
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border rounded-xl space-y-4 max-h-[400px] overflow-y-auto">
                {Array(paras).fill(text).map((t, i) => (
                    <p key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed">{t}</p>
                ))}
            </div>
        </div>
    )
}
