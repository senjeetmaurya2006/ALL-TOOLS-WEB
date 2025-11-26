import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

export const Stopwatch: React.FC = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<any>(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prev => prev + 10);
            }, 10);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const format = (ms: number) => {
        const mins = Math.floor(ms / 60000);
        const secs = Math.floor((ms % 60000) / 1000);
        const centis = Math.floor((ms % 1000) / 10);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${centis.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-8 py-8">
            <div className="text-7xl font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                {format(time)}
            </div>
            <div className="flex gap-4">
                <button 
                    onClick={() => setIsRunning(!isRunning)} 
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-colors ${isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}
                >
                    {isRunning ? <Pause fill="currentColor" /> : <Play fill="currentColor" className="ml-1" />}
                </button>
                <button 
                    onClick={() => { setIsRunning(false); setTime(0); }} 
                    className="w-16 h-16 rounded-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-colors"
                >
                    <RefreshCw size={24} />
                </button>
            </div>
        </div>
    );
};
