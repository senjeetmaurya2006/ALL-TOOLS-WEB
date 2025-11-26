import React, { useState } from 'react';
import { Copy, Plus, Trash2, CheckCircle, Circle } from 'lucide-react';

export const CSVToJSON: React.FC = () => {
  const [csv, setCsv] = useState('');
  const [json, setJson] = useState('');
  const [error, setError] = useState('');

  const convert = () => {
    try {
      if (!csv.trim()) return;
      
      const lines = csv.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const result = lines.slice(1).map(line => {
        const obj: any = {};
        const currentline = line.split(',');
        
        headers.forEach((header, i) => {
          obj[header] = currentline[i]?.trim();
        });
        return obj;
      });
      
      setJson(JSON.stringify(result, null, 2));
      setError('');
    } catch (err) {
      setError('Failed to parse CSV. Ensure valid format.');
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 h-full">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">CSV Input</label>
        <textarea
          value={csv}
          onChange={e => setCsv(e.target.value)}
          placeholder="name,age,city&#10;John,25,New York&#10;Jane,30,London"
          className="flex-1 p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700 font-mono text-sm resize-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
             <label className="text-sm font-medium">JSON Output</label>
             <button onClick={convert} className="text-xs bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700">Convert</button>
        </div>
        <div className="relative flex-1">
             <textarea
                readOnly
                value={json}
                className="w-full h-full p-3 border rounded-lg bg-slate-50 dark:bg-slate-900 dark:border-slate-700 font-mono text-sm resize-none text-green-600 dark:text-green-400"
                placeholder="{ ... }"
             />
             {json && (
                <button 
                  onClick={() => navigator.clipboard.writeText(json)} 
                  className="absolute top-2 right-2 p-1.5 bg-white dark:bg-slate-800 rounded shadow hover:text-primary-600"
                >
                  <Copy size={16} />
                </button>
             )}
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<{id: number, text: string, done: boolean}[]>(() => {
        const saved = localStorage.getItem('omni-todo');
        return saved ? JSON.parse(saved) : [];
    });
    const [input, setInput] = useState('');

    const save = (newTasks: any) => {
        setTasks(newTasks);
        localStorage.setItem('omni-todo', JSON.stringify(newTasks));
    };

    const add = () => {
        if (!input.trim()) return;
        save([...tasks, { id: Date.now(), text: input, done: false }]);
        setInput('');
    };

    const toggle = (id: number) => {
        save(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const remove = (id: number) => {
        save(tasks.filter(t => t.id !== id));
    };

    return (
        <div className="max-w-md mx-auto h-full flex flex-col">
            <div className="flex gap-2 mb-4">
                <input 
                    type="text" 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    onKeyDown={e => e.key === 'Enter' && add()}
                    className="flex-1 p-3 rounded-lg border dark:bg-slate-800 dark:border-slate-700" 
                    placeholder="Add a new task..." 
                />
                <button onClick={add} className="bg-primary-600 text-white p-3 rounded-lg hover:bg-primary-700"><Plus /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                {tasks.length === 0 && (
                    <div className="text-center text-slate-400 py-10">No tasks yet. Get productive!</div>
                )}
                {tasks.map(task => (
                    <div key={task.id} className="group flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                        <button onClick={() => toggle(task.id)} className={task.done ? "text-green-500" : "text-slate-300 hover:text-slate-400"}>
                            {task.done ? <CheckCircle /> : <Circle />}
                        </button>
                        <span className={`flex-1 ${task.done ? 'line-through text-slate-400' : ''}`}>{task.text}</span>
                        <button onClick={() => remove(task.id)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};