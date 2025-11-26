import React, { useState, useEffect } from 'react';

// --- Unit Converter ---
const conversions: any = {
  length: { m: 1, km: 0.001, cm: 100, mm: 1000, inch: 39.3701, ft: 3.28084, yd: 1.09361, mile: 0.000621371 },
  weight: { kg: 1, g: 1000, mg: 1000000, lb: 2.20462, oz: 35.274 },
  volume: { l: 1, ml: 1000, gal: 0.264172, qt: 1.05669, pt: 2.11338, cup: 4.22675 },
  temperature: { c: 'c', f: 'f', k: 'k' }, // Handled separately
};

export const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState('length');
  const [val, setVal] = useState(1);
  const [from, setFrom] = useState('m');
  const [to, setTo] = useState('ft');

  useEffect(() => {
    // Reset units when category changes
    const units = Object.keys(conversions[category]);
    setFrom(units[0]);
    setTo(units[1] || units[0]);
  }, [category]);

  const convert = (value: number, fromUnit: string, toUnit: string) => {
    if (category === 'temperature') {
      if (fromUnit === toUnit) return value;
      let celsius = value;
      if (fromUnit === 'f') celsius = (value - 32) * 5/9;
      if (fromUnit === 'k') celsius = value - 273.15;
      
      if (toUnit === 'c') return celsius;
      if (toUnit === 'f') return (celsius * 9/5) + 32;
      if (toUnit === 'k') return celsius + 273.15;
      return 0;
    } else {
      const factor = conversions[category][toUnit] / conversions[category][fromUnit];
      return value * factor;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Object.keys(conversions).map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors ${
              category === c ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      
      <div className="grid md:grid-cols-7 gap-4 items-center bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="md:col-span-3 space-y-2">
           <label className="text-xs font-semibold text-slate-500 uppercase">From</label>
           <input type="number" value={val} onChange={e => setVal(Number(e.target.value))} className="w-full text-2xl font-bold bg-transparent border-b border-slate-300 dark:border-slate-700 focus:border-primary-500 outline-none pb-1" />
           <select value={from} onChange={e => setFrom(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-800 p-2 rounded text-sm">
              {Object.keys(conversions[category]).map(u => <option key={u} value={u}>{u}</option>)}
           </select>
        </div>
        
        <div className="md:col-span-1 flex justify-center text-slate-400">=</div>

        <div className="md:col-span-3 space-y-2">
           <label className="text-xs font-semibold text-slate-500 uppercase">To</label>
           <div className="w-full text-2xl font-bold text-primary-600 pb-1 border-b border-transparent">
             {convert(val, from, to).toFixed(4)}
           </div>
           <select value={to} onChange={e => setTo(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-800 p-2 rounded text-sm">
              {Object.keys(conversions[category]).map(u => <option key={u} value={u}>{u}</option>)}
           </select>
        </div>
      </div>
    </div>
  );
};

// --- Currency Converter ---
export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  
  // Mock rates relative to USD
  const rates: any = { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 150.2, INR: 83.1, AUD: 1.52, CAD: 1.35, CNY: 7.19 };

  const converted = (amount / rates[from]) * rates[to];

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-sm rounded-lg mb-4">
        Note: Using static mock rates for demonstration.
      </div>
      <div className="flex gap-4">
        <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="flex-1 p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700" />
        <select value={from} onChange={e => setFrom(e.target.value)} className="w-24 p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700">
           {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="flex justify-center text-slate-400">↓</div>
      <div className="flex gap-4">
        <div className="flex-1 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold text-lg flex items-center">
            {converted.toFixed(2)}
        </div>
        <select value={to} onChange={e => setTo(e.target.value)} className="w-24 p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700">
           {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    </div>
  );
};

// --- Timezone Converter ---
export const TimezoneConverter: React.FC = () => {
    const [baseTime, setBaseTime] = useState(new Date().toISOString().substring(0, 16));
    const cities = [
        { name: 'New York', zone: 'America/New_York' },
        { name: 'London', zone: 'Europe/London' },
        { name: 'Tokyo', zone: 'Asia/Tokyo' },
        { name: 'Sydney', zone: 'Australia/Sydney' },
        { name: 'Dubai', zone: 'Asia/Dubai' },
        { name: 'Paris', zone: 'Europe/Paris' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <label>Base Time (Local):</label>
                <input type="datetime-local" value={baseTime} onChange={e => setBaseTime(e.target.value)} className="p-2 border rounded dark:bg-slate-800" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cities.map(city => {
                    const time = new Date(baseTime).toLocaleTimeString('en-US', { timeZone: city.zone, hour: '2-digit', minute: '2-digit', hour12: true });
                    const date = new Date(baseTime).toLocaleDateString('en-US', { timeZone: city.zone, weekday: 'short', month: 'short', day: 'numeric' });
                    return (
                        <div key={city.name} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div className="text-sm text-slate-500">{city.name}</div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white my-1">{time}</div>
                            <div className="text-xs text-primary-600">{date}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
