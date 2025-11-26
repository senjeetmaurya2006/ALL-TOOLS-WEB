import React, { useState } from 'react';
import { Send, Bot, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

export const AIHelper: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setResponse('');

    try {
      if (!process.env.API_KEY) {
        throw new Error("API Key is missing in environment variables.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setResponse(result.text || "No response received.");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate response. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start gap-3">
        <Bot className="text-blue-600 dark:text-blue-400 mt-1 shrink-0" />
        <div>
          <h3 className="font-medium text-blue-900 dark:text-blue-100">AI Assistant</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Powered by Gemini 2.5 Flash. Use this to summarize text, write emails, explain code, or answer general questions.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Your Prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Summarize this paragraph, or Write a Python script to..."
          className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none resize-y"
        />
        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <Send size={18} />
                Generate Response
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-2">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {response && (
        <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-6">
          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">AI Response</h4>
          <div className="prose dark:prose-invert max-w-none bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};
