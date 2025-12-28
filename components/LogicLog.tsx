import React, { useEffect, useRef } from 'react';
import { LogicLogEntry, LogType } from '../types';
import { Clock, MousePointer, File, BrainCircuit, Pin, FileSignature, Loader2 } from 'lucide-react';

interface LogicLogProps {
  logs: LogicLogEntry[];
  onGenerateNarrative: () => void;
  isGenerating: boolean;
}

export const LogicLog: React.FC<LogicLogProps> = ({ logs, onGenerateNarrative, isGenerating }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getIcon = (type: LogType) => {
    switch (type) {
      case LogType.SELECT_CELL: return <MousePointer className="w-3 h-3" />;
      case LogType.OPEN_DOC: return <File className="w-3 h-3" />;
      case LogType.SEARCH: return <BrainCircuit className="w-3 h-3" />;
      case LogType.PIN_LOGIC: return <Pin className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const getColor = (type: LogType) => {
    switch (type) {
        case LogType.PIN_LOGIC: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        case LogType.SEARCH: return 'bg-indigo-100 text-indigo-700 border-indigo-200';
        default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 border-t border-slate-200">
      <div className="p-3 border-b border-slate-200 flex justify-between items-center bg-white">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center">
            <Clock className="w-3 h-3 mr-2 text-slate-400" />
            Logic Log (Audit Trail)
        </h3>
        <span className="text-[10px] text-slate-400">{logs.length} actions</span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 relative">
        {logs.length === 0 && (
            <div className="text-center text-slate-400 text-xs mt-10 italic">
                Start investigating to record your forensic path...
            </div>
        )}
        {logs.map((log) => (
          <div key={log.id} className="relative pl-4 group">
             {/* Connector Line */}
            <div className="absolute left-[7px] top-6 bottom-[-12px] w-[1px] bg-slate-200 group-last:hidden"></div>
            
            <div className="flex items-start">
               <div className={`
                    absolute left-0 top-1 w-4 h-4 rounded-full flex items-center justify-center border
                    ${log.type === LogType.PIN_LOGIC ? 'bg-yellow-400 border-yellow-500 text-white z-10' : 'bg-white border-slate-300 z-10'}
               `}>
                    {getIcon(log.type)}
               </div>

               <div className={`ml-2 flex-1 text-sm rounded-md p-2 border ${getColor(log.type)}`}>
                  <p className="font-medium text-xs">{log.description}</p>
                  {log.details && <p className="text-[10px] opacity-80 mt-1 leading-relaxed">{log.details}</p>}
                  <p className="text-[9px] opacity-50 mt-1 text-right font-mono">
                    {log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </p>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="p-3 bg-white border-t border-slate-200">
        <button 
            onClick={onGenerateNarrative}
            disabled={isGenerating || logs.length === 0}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded shadow-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
            {isGenerating ? (
                <>
                    <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                    Drafting Narrative...
                </>
            ) : (
                <>
                    <FileSignature className="w-3 h-3 mr-2" />
                    Draft Claim Narrative (AI)
                </>
            )}
        </button>
      </div>
    </div>
  );
};