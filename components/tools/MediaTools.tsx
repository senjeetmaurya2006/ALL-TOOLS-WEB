import React, { useState, useRef } from 'react';

// --- Color Converter ---
export const ColorConverter: React.FC = () => {
    const [hex, setHex] = useState('#3b82f6');
    
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
    };

    const rgb = hexToRgb(hex);
    
    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-1">HEX Color</label>
                    <input type="text" value={hex} onChange={e => setHex(e.target.value)} className="w-full p-3 border rounded-lg font-mono dark:bg-slate-800" />
                </div>
                {rgb && (
                    <div className="space-y-2 bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm">
                        <div className="flex justify-between"><span>RGB</span> <span>{rgb.r}, {rgb.g}, {rgb.b}</span></div>
                        <div className="flex justify-between"><span>CSS</span> <span>rgb({rgb.r}, {rgb.g}, {rgb.b})</span></div>
                    </div>
                )}
            </div>
            <div 
                className="w-full h-48 md:h-full rounded-xl shadow-inner transition-colors duration-200"
                style={{ backgroundColor: hex }}
            />
        </div>
    )
}

// --- Image Compressor (Client Side) ---
export const ImageCompressor: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [compressed, setCompressed] = useState<string | null>(null);
    const [quality, setQuality] = useState(0.8);
    const [origSize, setOrigSize] = useState(0);
    const [compSize, setCompSize] = useState(0);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setOrigSize(file.size);
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImage(ev.target?.result as string);
                compress(ev.target?.result as string, quality);
            };
            reader.readAsDataURL(file);
        }
    };

    const compress = (base64: string, q: number) => {
        const img = new Image();
        img.src = base64;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            const newData = canvas.toDataURL('image/jpeg', q);
            setCompressed(newData);
            // Rough size estimation of base64
            setCompSize(Math.round((newData.length * 3) / 4));
        };
    };

    return (
        <div className="space-y-6">
            <input type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"/>
            
            {image && (
                <>
                    <div className="flex items-center gap-4">
                        <label>Quality: {Math.round(quality * 100)}%</label>
                        <input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={e => { setQuality(Number(e.target.value)); compress(image, Number(e.target.value)); }} className="flex-1" />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                             <h4 className="font-semibold text-center">Original ({(origSize/1024).toFixed(1)} KB)</h4>
                             <img src={image} alt="Original" className="max-w-full rounded-lg border" />
                        </div>
                        <div className="space-y-2">
                             <h4 className="font-semibold text-center text-green-600">Compressed ({(compSize/1024).toFixed(1)} KB)</h4>
                             <img src={compressed || ''} alt="Compressed" className="max-w-full rounded-lg border" />
                             <a href={compressed || '#'} download="compressed.jpg" className="block text-center w-full py-2 bg-primary-600 text-white rounded-lg mt-2">Download</a>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export const AspectRatioCalculator: React.FC = () => {
    const [w, setW] = useState(1920);
    const [h, setH] = useState(1080);
    
    // GCD function
    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };
    
    const divisor = gcd(w, h);
    const ratio = `${w/divisor}:${h/divisor}`;

    return (
        <div className="max-w-md mx-auto space-y-6 text-center">
            <div className="flex gap-4 items-center justify-center">
                <input type="number" value={w} onChange={e => setW(Number(e.target.value))} className="w-24 p-2 border rounded dark:bg-slate-800" />
                <span className="text-xl">×</span>
                <input type="number" value={h} onChange={e => setH(Number(e.target.value))} className="w-24 p-2 border rounded dark:bg-slate-800" />
            </div>
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <div className="text-sm text-slate-500 uppercase tracking-wide">Aspect Ratio</div>
                <div className="text-4xl font-bold text-primary-600 mt-2">{ratio}</div>
            </div>
        </div>
    )
}
