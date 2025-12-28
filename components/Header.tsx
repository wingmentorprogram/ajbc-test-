import React from 'react';
import { Breadcrumb } from '../types';
import { ChevronRight, AlertTriangle, Briefcase, Activity, LayoutGrid } from 'lucide-react';

interface HeaderProps {
  breadcrumbs: Breadcrumb[];
  arbitrationMode: boolean;
  setArbitrationMode: (mode: boolean) => void;
  onHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ breadcrumbs, arbitrationMode, setArbitrationMode, onHome }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-20 relative">
      <div className="flex items-center space-x-4">
        {/* Home Button */}
        <button 
          onClick={onHome}
          className="p-2 hover:bg-slate-100 rounded-md text-slate-500 hover:text-slate-800 transition-colors"
          title="Back to Console"
        >
            <LayoutGrid className="w-5 h-5" />
        </button>

        <div className="h-6 w-[1px] bg-slate-300 mx-1"></div>

        <div className="flex items-center text-slate-500 text-sm">
           <Briefcase className="w-4 h-4 mr-2" />
           <span className="font-semibold text-slate-700">Project Alpha</span>
        </div>
        
        <div className="h-4 w-[1px] bg-slate-300 mx-2"></div>

        {/* Breadcrumbs */}
        <div className="flex items-center space-x-1 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="w-4 h-4 text-slate-400" />}
              <span className={`px-2 py-1 rounded-md ${index === breadcrumbs.length - 1 ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-500 hover:bg-slate-50 cursor-pointer'}`}>
                {crumb.label}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Arbitration Mode Toggle */}
      <div className="flex items-center">
        <div 
            className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 border ${arbitrationMode ? 'bg-red-50 border-red-200 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
            onClick={() => setArbitrationMode(!arbitrationMode)}
        >
            <div className={`relative w-10 h-5 rounded-full mr-3 transition-colors duration-300 ${arbitrationMode ? 'bg-red-500' : 'bg-slate-300'}`}>
                <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform duration-300 ${arbitrationMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
            <div className="flex flex-col">
                <span className={`text-xs font-bold uppercase tracking-wider ${arbitrationMode ? 'text-red-600' : 'text-slate-500'}`}>
                    {arbitrationMode ? 'Arbitration Mode' : 'Standard View'}
                </span>
                {arbitrationMode && (
                    <span className="text-[10px] text-red-500 font-medium flex items-center mt-0.5 animate-pulse">
                        <Activity className="w-3 h-3 mr-1" />
                        ACTIVE FILTERING
                    </span>
                )}
            </div>
        </div>
      </div>
    </header>
  );
};