import React, { useState } from 'react';
import { Sparkles, Search, Loader2 } from 'lucide-react';
import { findFormulaLogic } from '../services/geminiService';

interface FormulaSearchProps {
  onResultFound: (rowId: string, explanation: string) => void;
}

export const FormulaSearch: React.FC<FormulaSearchProps> = ({ onResultFound }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    const result = await findFormulaLogic(query);
    setIsLoading(false);

    if (result.rowId) {
      onResultFound(result.rowId, result.explanation);
      setQuery(''); // Optional: clear or keep
    } else {
      alert("No matching calculation logic found.");
    }
  };

  return (
    <div className="p-4 bg-slate-900 text-white">
      <div className="text-xs font-semibold text-indigo-300 mb-2 flex items-center">
        <Sparkles className="w-3 h-3 mr-1" />
        FORMULA INVESTIGATOR
      </div>
      <form onSubmit={handleSearch} className="relative">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='e.g., "Show me where we calculated Steel Waste"'
          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-3 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
        <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            disabled={isLoading}
        >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </button>
      </form>
      <p className="text-[10px] text-slate-500 mt-2">
        AI-powered search scans logic, not just values.
      </p>
    </div>
  );
};