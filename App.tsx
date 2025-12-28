import React, { useState } from 'react';
import { Header } from './components/Header';
import { SpreadsheetView } from './components/SpreadsheetView';
import { DocumentViewer } from './components/DocumentViewer';
import { EvidencePanel } from './components/EvidencePanel';
import { LogicLog } from './components/LogicLog';
import { FormulaSearch } from './components/FormulaSearch';
import { Breadcrumb, LogType, LogicLogEntry, DocumentFile } from './types';
import { v4 as uuidv4 } from 'uuid';
import { generateClaimNarrative } from './services/geminiService';
import { X, Copy, Check, FileSignature } from 'lucide-react';
import { ConsoleDashboard } from './components/ConsoleDashboard';
import { SplashScreen } from './components/SplashScreen';
import { MOCK_DOCUMENTS } from './constants';

function App() {
  // --- View State ---
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<'console' | 'workspace'>('console');
  const [layoutType, setLayoutType] = useState<'balanced' | 'sheet-focus' | 'evidence-focus'>('balanced');

  // --- Workspace State ---
  const [arbitrationMode, setArbitrationMode] = useState(false);
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const [activeDocId, setActiveDocId] = useState<string>('doc-4'); // Default open doc
  const [documents, setDocuments] = useState<DocumentFile[]>(MOCK_DOCUMENTS);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([
    { label: 'Project Alpha', path: '/' },
    { label: 'Merged Budget', path: '/budget' }
  ]);
  const [logs, setLogs] = useState<LogicLogEntry[]>([]);
  
  // Claim Generation State
  const [isGeneratingClaim, setIsGeneratingClaim] = useState(false);
  const [claimDraft, setClaimDraft] = useState<string | null>(null);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // --- Actions ---

  const handleLaunchWorkspace = (layout: 'balanced' | 'sheet-focus' | 'evidence-focus') => {
    setLayoutType(layout);
    setCurrentView('workspace');
  };

  const addLog = (type: LogType, description: string, details?: string, relatedCellId?: string, relatedDocId?: string) => {
    const newLog: LogicLogEntry = {
      id: uuidv4(),
      timestamp: new Date(),
      type,
      description,
      details,
      relatedCellId,
      relatedDocId
    };
    setLogs(prev => [...prev, newLog]);
  };

  const handleCellSelect = (rowId: string, cellKey: string, value: any, context: string) => {
    const cellId = `${rowId}-${cellKey}`;
    if (activeCell === cellId) return;

    setActiveCell(cellId);
    
    // Update Breadcrumbs
    const newBreadcrumbs = [...breadcrumbs];
    if (newBreadcrumbs.length > 2) newBreadcrumbs.pop(); // Remove last cell selection
    newBreadcrumbs.push({ label: `Row: ${context.split(':')[1]?.substring(0, 15)}...`, path: '#' });
    setBreadcrumbs(newBreadcrumbs);

    addLog(LogType.SELECT_CELL, `Audit: ${cellKey}`, `Value: ${value}. Context: ${context}`, cellId, activeDocId);
  };

  const handleOpenDoc = (docId: string) => {
    if (activeDocId === docId) return;
    setActiveDocId(docId);
    addLog(LogType.OPEN_DOC, `Reviewed Document`, `Ref ID: ${docId}`, activeCell || undefined, docId);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create a local object URL for preview
    const objectUrl = URL.createObjectURL(file);
    const fileType = file.type.includes('image') ? 'IMAGE' : 'PDF'; // Default to PDF for non-images for iframe support

    const newDoc: DocumentFile = {
        id: `UPL-${Date.now()}`,
        name: file.name,
        type: fileType,
        preview: `Uploaded local file (${(file.size / 1024).toFixed(1)} KB)`,
        date: new Date().toLocaleDateString(),
        url: objectUrl,
        isUploaded: true
    };

    setDocuments(prev => [newDoc, ...prev]);
    setActiveDocId(newDoc.id);
    addLog(LogType.OPEN_DOC, 'Document Upload', `Uploaded and opened: ${file.name}`, undefined, newDoc.id);
  };

  const handlePinLogic = (rowId: string) => {
    addLog(LogType.PIN_LOGIC, 'Logic Substantiated', `Linked Row ${rowId} to document ${activeDocId} as evidence`, rowId, activeDocId);
  };

  const handleSearchResult = (rowId: string, explanation: string) => {
    setActiveCell(`${rowId}-total`); // Highlight the total column of the found row
    addLog(LogType.SEARCH, 'Forensic Search', explanation, rowId);
  };

  const handleTabSwitch = (tabName: string) => {
    addLog(LogType.NAVIGATE, 'Worksheet Switch', `Opened Tab: ${tabName}`);
    // Update breadcrumb to reflect current sheet
    const newBreadcrumbs = [...breadcrumbs];
    if (newBreadcrumbs.length >= 2) {
        newBreadcrumbs[1] = { label: tabName, path: '/sheet' };
        // Clear deeper breadcrumbs if switching sheets
        if (newBreadcrumbs.length > 2) newBreadcrumbs.splice(2);
        setBreadcrumbs(newBreadcrumbs);
    }
  };

  const handleGenerateNarrative = async () => {
    setIsGeneratingClaim(true);
    const narrative = await generateClaimNarrative(logs);
    setClaimDraft(narrative);
    setIsGeneratingClaim(false);
    setShowClaimModal(true);
    addLog(LogType.NAVIGATE, 'Report Generation', 'Generated draft expert witness narrative');
  };

  const handleCopyClaim = () => {
    if (claimDraft) {
        navigator.clipboard.writeText(claimDraft);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  // --- Determine Layout Widths ---
  const getPanelWidths = () => {
    switch(layoutType) {
        case 'sheet-focus':
            return { left: 'w-[15%]', right: 'w-[20%]' };
        case 'evidence-focus':
            return { left: 'w-[40%]', right: 'w-[20%]' };
        default: // balanced
            return { left: 'w-1/4', right: 'w-1/4' };
    }
  };

  const { left: leftWidth, right: rightWidth } = getPanelWidths();

  // --- Render ---

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (currentView === 'console') {
    return <ConsoleDashboard onLaunch={handleLaunchWorkspace} />;
  }

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      <Header 
        breadcrumbs={breadcrumbs} 
        arbitrationMode={arbitrationMode} 
        setArbitrationMode={(mode) => {
            setArbitrationMode(mode);
            addLog(LogType.NAVIGATE, mode ? "Filter: Arbitration Claims" : "View: Standard Budget");
        }} 
        onHome={() => setCurrentView('console')}
      />

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left Pane: Source & Evidence */}
        <div className={`${leftWidth} min-w-[200px] border-r border-slate-300 transition-all duration-300 ${arbitrationMode ? 'w-1/6' : ''} flex flex-col bg-white`}>
            {activeDocId ? (
                <DocumentViewer 
                    activeDocId={activeDocId} 
                    onClose={() => setActiveDocId('')}
                    documents={documents}
                />
            ) : (
                <EvidencePanel 
                    onOpenDoc={handleOpenDoc} 
                    activeDocId={activeDocId}
                    documents={documents}
                    onFileUpload={handleFileUpload}
                />
            )}
        </div>

        {/* Center Pane: The Calculation (Excel) */}
        <div className="flex-1 flex flex-col min-w-[400px] bg-white shadow-xl z-10">
          <SpreadsheetView 
            arbitrationMode={arbitrationMode}
            activeCell={activeCell}
            onCellSelect={handleCellSelect}
            onPinLogic={handlePinLogic}
            onTabSwitch={handleTabSwitch}
          />
        </div>

        {/* Right Pane: Tools & Logs */}
        <div className={`${rightWidth} min-w-[250px] border-l border-slate-300 flex flex-col bg-white transition-all duration-300`}>
          {/* AI Search */}
          <FormulaSearch onResultFound={handleSearchResult} />
          
          {/* Logic Log (Memory Bank) - Now takes up remaining space */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <LogicLog 
                logs={logs} 
                onGenerateNarrative={handleGenerateNarrative}
                isGenerating={isGeneratingClaim}
            />
          </div>
        </div>

        {/* Claim Narrative Modal */}
        {showClaimModal && (
            <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
                <div className="bg-white rounded-lg shadow-2xl w-2/3 max-w-2xl flex flex-col max-h-[80vh]">
                    <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50 rounded-t-lg">
                        <h3 className="font-bold text-slate-800 flex items-center">
                            <FileSignature className="w-5 h-5 mr-2 text-blue-600" />
                            Draft Expert Witness Narrative
                        </h3>
                        <button onClick={() => setShowClaimModal(false)} className="text-slate-400 hover:text-slate-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="p-6 overflow-y-auto">
                        <div className="bg-slate-50 p-4 rounded border border-slate-200 font-serif text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {claimDraft}
                        </div>
                    </div>
                    <div className="p-4 border-t border-slate-200 flex justify-end space-x-3 bg-slate-50 rounded-b-lg">
                        <button 
                            onClick={() => setShowClaimModal(false)}
                            className="px-4 py-2 text-slate-600 font-medium text-sm hover:bg-slate-200 rounded"
                        >
                            Close
                        </button>
                        <button 
                            onClick={handleCopyClaim}
                            className="px-4 py-2 bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 rounded flex items-center"
                        >
                            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                            {copied ? 'Copied to Clipboard' : 'Copy to Clipboard'}
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}

export default App;