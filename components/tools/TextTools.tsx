import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

// --- Text Case Converter ---
export const TextCaseConverter: React.FC = () => {
  const [text, setText] = useState('');
  
  const transforms = [
    { name: 'UPPERCASE', fn: (s: string) => s.toUpperCase() },
    { name: 'lowercase', fn: (s: string) => s.toLowerCase() },
    { name: 'Title Case', fn: (s: string) => s.replace(/\b\w/g, c => c.toUpperCase()) },
    { name: 'Sentence case', fn: (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() },
    { name: 'camelCase', fn: (s: string) => s.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '') },
    { name: 'kebab-case', fn: (s: string) => s.replace(/\s+/g, '-').toLowerCase() },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-full">
        <textarea 
            className="lg:col-span-2 w-full h-64 lg:h-auto p-4 rounded-xl border dark:bg-slate-800 dark:border-slate-700 resize-none focus:ring-2 focus:ring-primary-500 outline-none" 
            placeholder="Type your text here..." 
            value={text} 
            onChange={e => setText(e.target.value)} 
        />
        <div className="flex flex-col gap-2">
            {transforms.map(t => (
                <button 
                    key={t.name}
                    onClick={() => setText(t.fn(text))}
                    className="p-3 text-left bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors text-sm font-medium"
                >
                    {t.name}
                </button>
            ))}
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <div className="flex justify-between text-sm"><span>Characters:</span> <span className="font-bold">{text.length}</span></div>
                <div className="flex justify-between text-sm"><span>Words:</span> <span className="font-bold">{text.trim() ? text.trim().split(/\s+/).length : 0}</span></div>
            </div>
        </div>
    </div>
  );
};

// --- JSON Formatter ---
export const JSONFormatter: React.FC = () => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    const format = () => {
        try {
            const obj = JSON.parse(input);
            setInput(JSON.stringify(obj, null, 2));
            setError('');
        } catch (e) {
            setError('Invalid JSON');
        }
    }
    
    const minify = () => {
        try {
            const obj = JSON.parse(input);
            setInput(JSON.stringify(obj));
            setError('');
        } catch (e) {
            setError('Invalid JSON');
        }
    }

    return (
        <div className="h-full flex flex-col gap-4">
            <div className="flex gap-2">
                <button onClick={format} className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">Prettify</button>
                <button onClick={minify} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300">Minify</button>
                <button onClick={() => setInput('')} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded ml-auto">Clear</button>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <textarea 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                className="flex-1 font-mono text-sm p-4 rounded-xl border dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 resize-none focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder='Paste JSON here...'
            />
        </div>
    )
}

// --- Base64 ---
export const Base64Tool: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    
    const encode = () => setOutput(btoa(input));
    const decode = () => {
        try { setOutput(atob(input)); } catch(e) { setOutput('Invalid Base64'); }
    };

    return (
        <div className="space-y-4">
             <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full h-32 p-3 border rounded-lg dark:bg-slate-800" placeholder="Input" />
             <div className="flex gap-4">
                 <button onClick={encode} className="flex-1 bg-primary-600 text-white py-2 rounded-lg">Encode</button>
                 <button onClick={decode} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg">Decode</button>
             </div>
             <textarea readOnly value={output} className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg" placeholder="Output" />
        </div>
    )
}

// --- Word Counter ---
export const WordCounter: React.FC = () => {
    const [text, setText] = useState('');
    const stats = {
        chars: text.length,
        words: text.trim() ? text.trim().split(/\s+/).length : 0,
        sentences: text.split(/[.!?]+/).length - 1,
        paragraphs: text.replace(/\n$/gm, '').split(/\n/).length,
    };

    return (
        <div className="h-full flex flex-col gap-4">
             <div className="grid grid-cols-4 gap-4">
                {Object.entries(stats).map(([k, v]) => (
                    <div key={k} className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary-600">{v}</div>
                        <div className="text-xs uppercase text-slate-500">{k}</div>
                    </div>
                ))}
             </div>
             <textarea 
                value={text} 
                onChange={e => setText(e.target.value)} 
                className="flex-1 p-4 border rounded-xl dark:bg-slate-800 dark:border-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500" 
                placeholder="Start typing..."
            />
        </div>
    )
}

// --- Markdown Preview ---
export const MarkdownPreview: React.FC = () => {
    const [md, setMd] = useState('# Hello World\n\nStart typing **markdown** here!');

    return (
        <div className="grid md:grid-cols-2 gap-6 h-[600px]">
            <textarea 
                value={md} 
                onChange={e => setMd(e.target.value)} 
                className="w-full h-full p-4 font-mono text-sm border rounded-xl dark:bg-slate-800 dark:border-slate-700 resize-none focus:outline-none"
            />
            <div className="prose dark:prose-invert overflow-y-auto p-4 border rounded-xl dark:border-slate-700">
                <ReactMarkdown>{md}</ReactMarkdown>
            </div>
        </div>
    )
}

export const BinaryTextTool: React.FC = () => {
    const [text, setText] = useState('');
    const [binary, setBinary] = useState('');

    const toBinary = (str: string) => {
        return str.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    };

    const toText = (bin: string) => {
        return bin.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
    };

    const handleText = (e: any) => {
        const t = e.target.value;
        setText(t);
        setBinary(toBinary(t));
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="text-sm font-medium">Text</label>
                <textarea value={text} onChange={handleText} className="w-full h-24 p-2 border rounded dark:bg-slate-800" />
            </div>
            <div>
                <label className="text-sm font-medium">Binary</label>
                <textarea value={binary} readOnly className="w-full h-24 p-2 bg-slate-50 border rounded dark:bg-slate-900 font-mono text-xs" />
            </div>
        </div>
    )
}
