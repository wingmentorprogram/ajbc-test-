import React, { useRef } from 'react';
import { DocumentFile } from '../types';
import { FileText, Mail, UploadCloud, Image as ImageIcon } from 'lucide-react';

interface EvidencePanelProps {
  onOpenDoc: (docId: string) => void;
  activeDocId: string;
  documents: DocumentFile[];
  onFileUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({ onOpenDoc, activeDocId, documents, onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const getIcon = (type: string) => {
    switch(type) {
        case 'EMAIL': return <Mail size={16} />;
        case 'IMAGE': return <ImageIcon size={16} />;
        default: return <FileText size={16} />;
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <span className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Supporting Evidence</span>
        {onFileUpload && (
            <>
                <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={onFileUpload}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.webp"
                />
                <button 
                    onClick={handleUploadClick}
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded transition-colors"
                    title="Upload Local Document"
                >
                    <UploadCloud size={16} />
                </button>
            </>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {documents.map(doc => (
          <div 
            key={doc.id}
            onClick={() => onOpenDoc(doc.id)}
            className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md flex items-start space-x-3
                ${activeDocId === doc.id ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-300' : 'bg-white border-slate-200 hover:border-slate-300'}
            `}
          >
            <div className={`mt-1 p-1.5 rounded-md ${doc.type === 'EMAIL' ? 'bg-orange-100 text-orange-600' : doc.isUploaded ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}`}>
                {getIcon(doc.type)}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-slate-800 truncate">{doc.name}</h4>
                <p className="text-xs text-slate-500 mt-1 truncate">{doc.preview}</p>
                <div className="mt-2 flex items-center text-[10px] text-slate-400">
                    <span>{doc.date}</span>
                    <span className="mx-1">•</span>
                    <span className="uppercase">{doc.type}</span>
                    {doc.isUploaded && <span className="ml-2 px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[9px] font-bold">LOCAL</span>}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};