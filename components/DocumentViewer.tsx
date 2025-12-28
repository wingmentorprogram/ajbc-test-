import React from 'react';
import { DocumentFile } from '../types';
import { FileText, ArrowLeft, ZoomIn, Download } from 'lucide-react';

interface DocumentViewerProps {
  activeDocId: string;
  onClose: () => void;
  documents: DocumentFile[];
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ activeDocId, onClose, documents }) => {
  const doc = documents.find(d => d.id === activeDocId);

  if (!doc) return <div className="h-full bg-slate-100 flex items-center justify-center text-slate-400">Select a document</div>;

  return (
    <div className="h-full flex flex-col bg-slate-800 text-white border-r border-slate-700 shadow-xl">
      <div className="h-10 bg-slate-900 flex items-center justify-between px-3 border-b border-slate-700">
        <button onClick={onClose} className="text-slate-400 hover:text-white flex items-center text-xs">
          <ArrowLeft className="w-3 h-3 mr-1" /> Back
        </button>
        <span className="text-xs font-mono text-slate-300 truncate max-w-[150px]">{doc.name}</span>
        <div className="flex space-x-2">
            <ZoomIn className="w-4 h-4 text-slate-400 cursor-pointer hover:text-white" />
            <Download className="w-4 h-4 text-slate-400 cursor-pointer hover:text-white" />
        </div>
      </div>
      
      <div className="flex-1 bg-slate-700 overflow-hidden relative flex flex-col">
        {doc.isUploaded && doc.url ? (
            // Render Uploaded File
            <div className="flex-1 w-full h-full bg-slate-900 flex items-center justify-center">
                {doc.type === 'IMAGE' ? (
                    <img 
                        src={doc.url} 
                        alt={doc.name} 
                        className="max-w-full max-h-full object-contain"
                    />
                ) : (
                    <iframe 
                        src={doc.url} 
                        title={doc.name}
                        className="w-full h-full border-none bg-white"
                    />
                )}
            </div>
        ) : (
            // Render Mock Template
            <div className="p-8 overflow-y-auto h-full">
                <div className="bg-white text-slate-900 min-h-[600px] w-full shadow-2xl p-8 rounded-sm relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-red-500 opacity-20"></div>
                    <h1 className="text-xl font-bold mb-4 border-b pb-2">{doc.name}</h1>
                    <div className="text-xs text-slate-500 mb-6">Date: {doc.date} | Reference: REF-{doc.id.toUpperCase()}</div>
                    
                    <p className="font-serif leading-relaxed text-sm mb-4">
                        1. PREAMBLE<br/><br/>
                        Whereas the parties have agreed to the terms set forth herein...
                    </p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
                        <p className="font-mono text-sm text-yellow-900 font-bold">RELEVANT EXTRACT:</p>
                        <p className="font-serif italic text-sm mt-2">{doc.preview}</p>
                    </div>
                    <p className="font-serif leading-relaxed text-sm">
                        2. SCOPE OF WORKS<br/><br/>
                        The Contractor shall execute and complete the Works in accordance with the Contract...
                    </p>

                    {/* Simulated Annotations */}
                    <div className="absolute top-1/3 right-8 w-6 h-6 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};