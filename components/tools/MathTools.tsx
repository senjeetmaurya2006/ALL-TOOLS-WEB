import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// --- Scientific Calculator ---
export const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<number | null>(null);
  const [history, setHistory] = useState<string>('');

  const handleBtn = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
      setHistory('');
    } else if (val === 'DEL') {
      setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if (val === '=') {
      try {
        // eslint-disable-next-line no-eval
        const res = eval(display.replace('×', '*').replace('÷', '/').replace('^', '**').replace('π', 'Math.PI').replace('e', 'Math.E').replace('sin', 'Math.sin').replace('cos', 'Math.cos').replace('tan', 'Math.tan').replace('√', 'Math.sqrt'));
        setHistory(display + ' =');
        setDisplay(String(res));
      } catch (e) {
        setDisplay('Error');
      }
    } else if (['sin', 'cos', 'tan', '√'].includes(val)) {
        setDisplay(prev => prev === '0' ? val + '(' : prev + val + '(');
    } else {
      setDisplay(prev => prev === '0' ? val : prev + val);
    }
  };

  const buttons = [
    '(', ')', 'mc', 'm+', 'm-', 'mr', 'C', 'DEL', '÷',
    '2nd', 'x²', 'x³', 'x^y', 'e^x', '10^x', '7', '8', '9', '×',
    '1/x', '√', '3√', 'ln', 'log', 'e', '4', '5', '6', '-',
    'x!', 'sin', 'cos', 'tan', 'π', 'Rand', '1', '2', '3', '+',
    'Rad', 'sinh', 'cosh', 'tanh', '(', ')', '0', '.', '='
  ];

  return (
    <div className="flex flex-col h-full max-w-md mx-auto">
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-t-xl text-right">
        <div className="text-slate-500 text-sm h-6">{history}</div>
        <div className="text-3xl font-mono font-bold text-slate-900 dark:text-white break-all">{display}</div>
      </div>
      <div className="grid grid-cols-5 gap-2 mt-4">
        {['C', '(', ')', 'DEL', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map(btn => (
          <button
            key={btn}
            onClick={() => handleBtn(btn)}
            className={`p-3 rounded-lg font-bold text-lg transition-colors ${
              btn === '=' ? 'bg-primary-600 text-white col-span-2' : 
              ['C', 'DEL'].includes(btn) ? 'bg-red-100 dark:bg-red-900/30 text-red-600' :
              ['÷', '×', '-', '+'].includes(btn) ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600' :
              'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {btn}
          </button>
        ))}
         {['sin', 'cos', 'tan', '√', '^', 'π'].map(btn => (
          <button
            key={btn}
            onClick={() => handleBtn(btn)}
            className="p-3 rounded-lg font-bold text-sm bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Loan Calculator ---
export const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(30);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emi * n;
    const totalInt = totalPay - amount;
    
    // Generate simple chart data
    const chartData = [];
    let balance = amount;
    for (let i = 0; i <= years; i++) {
        chartData.push({ year: i, balance: Math.max(0, balance) });
        balance -= (amount / years); // Simplified visual
    }

    setResult({ emi, totalPay, totalInt, chartData });
  }, [amount, rate, years]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Loan Amount ($)</label>
          <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
          <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Loan Term (Years)</label>
          <input type="range" min="1" max="50" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full" />
          <div className="text-right text-sm text-slate-500">{years} Years</div>
        </div>
      </div>
      <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
                <p className="text-sm text-slate-500">Monthly Payment</p>
                <p className="text-2xl font-bold text-primary-600">${result?.emi.toFixed(2)}</p>
            </div>
            <div>
                <p className="text-sm text-slate-500">Total Interest</p>
                <p className="text-xl font-semibold text-slate-700 dark:text-slate-300">${result?.totalInt.toFixed(2)}</p>
            </div>
        </div>
        <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={result?.chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="year" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Line type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// --- Percentage Calculator ---
export const PercentageCalculator: React.FC = () => {
    const [val1, setVal1] = useState<number>(0);
    const [val2, setVal2] = useState<number>(0);
    const [mode, setMode] = useState(0);

    const calculate = () => {
        if(mode === 0) return (val1 / 100) * val2; // What is X% of Y?
        if(mode === 1) return (val1 / val2) * 100; // X is what % of Y?
        if(mode === 2) return ((val2 - val1) / val1) * 100; // % change from X to Y
        return 0;
    };

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                {["X% of Y", "X is % of Y", "% Change"].map((m, i) => (
                    <button key={i} onClick={() => setMode(i)} className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${mode === i ? 'bg-white dark:bg-slate-700 shadow text-primary-600' : 'text-slate-500'}`}>{m}</button>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
                 <input type="number" value={val1} onChange={e => setVal1(Number(e.target.value))} className="p-3 border rounded dark:bg-slate-800 dark:border-slate-700" placeholder="X" />
                 <span className="text-center font-bold text-slate-400">
                    {mode === 0 ? '% OF' : mode === 1 ? 'IS WHAT % OF' : 'TO'}
                 </span>
                 <input type="number" value={val2} onChange={e => setVal2(Number(e.target.value))} className="p-3 border rounded dark:bg-slate-800 dark:border-slate-700" placeholder="Y" />
                 <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg flex items-center justify-center col-span-2">
                    <span className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                        {calculate().toFixed(2)}{mode !== 0 && '%'}
                    </span>
                 </div>
            </div>
        </div>
    )
}

// --- BMI Calculator ---
export const BMICalculator: React.FC = () => {
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(175);
    const bmi = weight / Math.pow(height / 100, 2);
    
    let status = '';
    let color = '';
    if(bmi < 18.5) { status = 'Underweight'; color = 'text-blue-500'; }
    else if(bmi < 25) { status = 'Normal'; color = 'text-green-500'; }
    else if(bmi < 30) { status = 'Overweight'; color = 'text-yellow-500'; }
    else { status = 'Obese'; color = 'text-red-500'; }

    return (
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                    <input type="range" min="30" max="200" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full" />
                    <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-20 p-1 border rounded text-center dark:bg-slate-800" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Height (cm)</label>
                    <input type="range" min="100" max="250" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full" />
                    <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-20 p-1 border rounded text-center dark:bg-slate-800" />
                </div>
            </div>
            <div className="text-center p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="text-5xl font-bold mb-2">{bmi.toFixed(1)}</div>
                <div className={`text-xl font-semibold ${color}`}>{status}</div>
                <p className="text-sm text-slate-500 mt-4">Healthy range: 18.5 - 24.9</p>
            </div>
        </div>
    )
}

// --- Age Calculator ---
export const AgeCalculator: React.FC = () => {
    const [dob, setDob] = useState('');
    const [age, setAge] = useState<any>(null);

    const calc = () => {
        if(!dob) return;
        const birth = new Date(dob);
        const now = new Date();
        let years = now.getFullYear() - birth.getFullYear();
        let months = now.getMonth() - birth.getMonth();
        let days = now.getDate() - birth.getDate();

        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 0);
            days += prevMonth.getDate();
            months--;
        }
        setAge({ years, months, days });
    }

    return (
        <div className="max-w-md mx-auto space-y-4">
            <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700" />
            <button onClick={calc} className="w-full bg-primary-600 text-white p-3 rounded-lg hover:bg-primary-700">Calculate Age</button>
            {age && (
                <div className="grid grid-cols-3 gap-4 text-center mt-4">
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-primary-600">{age.years}</div>
                        <div className="text-xs text-slate-500">YEARS</div>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-primary-600">{age.months}</div>
                        <div className="text-xs text-slate-500">MONTHS</div>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-primary-600">{age.days}</div>
                        <div className="text-xs text-slate-500">DAYS</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export const TipCalculator: React.FC = () => {
    const [bill, setBill] = useState(0);
    const [tip, setTip] = useState(15);
    const [people, setPeople] = useState(1);
    
    const tipAmount = bill * (tip/100);
    const total = bill + tipAmount;
    const perPerson = total / people;

    return (
        <div className="max-w-md mx-auto space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <label className="text-sm">Bill Amount</label>
                    <input type="number" value={bill} onChange={e => setBill(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-slate-800" />
                </div>
                <div>
                     <label className="text-sm">Tip %</label>
                     <input type="number" value={tip} onChange={e => setTip(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-slate-800" />
                </div>
                <div>
                     <label className="text-sm">People</label>
                     <input type="number" value={people} onChange={e => setPeople(Math.max(1, Number(e.target.value)))} className="w-full p-2 border rounded dark:bg-slate-800" />
                </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg space-y-2">
                <div className="flex justify-between"><span>Tip Amount:</span> <span className="font-bold">${tipAmount.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Total:</span> <span className="font-bold">${total.toFixed(2)}</span></div>
                <div className="flex justify-between text-lg text-primary-600 font-bold border-t pt-2 mt-2"><span>Per Person:</span> <span>${perPerson.toFixed(2)}</span></div>
            </div>
        </div>
    )
}

export const DiscountCalculator: React.FC = () => {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(20);
  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="text-sm">Price</label><input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-slate-800" /></div>
        <div><label className="text-sm">Discount %</label><input type="number" value={discount} onChange={e => setDiscount(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-slate-800" /></div>
      </div>
      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
        <div className="text-sm text-green-700 dark:text-green-300">Final Price</div>
        <div className="text-3xl font-bold text-green-600 dark:text-green-400">${(price * (1 - discount/100)).toFixed(2)}</div>
        <div className="text-xs text-slate-500 mt-1">You save ${(price * (discount/100)).toFixed(2)}</div>
      </div>
    </div>
  )
}

export const SpeedDistanceTime: React.FC = () => {
  const [mode, setMode] = useState<'s'|'d'|'t'>('s');
  const [v1, setV1] = useState(0);
  const [v2, setV2] = useState(0);
  
  const result = mode === 's' ? v1 / v2 : mode === 'd' ? v1 * v2 : v1 / v2; // Simplified logic pattern
  const labels = mode === 's' ? ['Distance (km)', 'Time (h)'] : mode === 'd' ? ['Speed (km/h)', 'Time (h)'] : ['Distance (km)', 'Speed (km/h)'];

  return (
     <div className="max-w-md mx-auto space-y-4">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button onClick={() => setMode('s')} className={`flex-1 py-1 rounded ${mode==='s'?'bg-white shadow':''}`}>Speed</button>
            <button onClick={() => setMode('d')} className={`flex-1 py-1 rounded ${mode==='d'?'bg-white shadow':''}`}>Distance</button>
            <button onClick={() => setMode('t')} className={`flex-1 py-1 rounded ${mode==='t'?'bg-white shadow':''}`}>Time</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm">{labels[0]}</label><input type="number" value={v1} onChange={e=>setV1(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-slate-800"/></div>
            <div><label className="text-sm">{labels[1]}</label><input type="number" value={v2} onChange={e=>setV2(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-slate-800"/></div>
        </div>
        <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="text-2xl font-bold">{isFinite(result) ? result.toFixed(2) : 0}</div>
            <div className="text-sm text-slate-500">{mode === 's' ? 'km/h' : mode === 'd' ? 'km' : 'hours'}</div>
        </div>
     </div>
  )
}
