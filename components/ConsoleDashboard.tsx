import React, { useState } from 'react';
import { Layout, FileText, Activity, Users, Settings, ArrowRight, Monitor, Sidebar, Maximize, Briefcase, Grid, Clock, ChevronRight, Folder } from 'lucide-react';

interface ConsoleDashboardProps {
  onLaunch: (layout: 'balanced' | 'sheet-focus' | 'evidence-focus') => void;
}

export const ConsoleDashboard: React.FC<ConsoleDashboardProps> = ({ onLaunch }) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<'balanced' | 'sheet-focus' | 'evidence-focus'>('balanced');

  const projects = [
    { id: 'alpha', name: 'Project Alpha', type: 'Arbitration', status: 'Active Claim', deadline: '2 Days', members: 3 },
    { id: 'metro', name: 'Metro Line Ext. Phase 2', type: 'Adjudication', status: 'Discovery', deadline: '14 Days', members: 8 },
    { id: 'tower', name: 'Skyline Tower B', type: 'Final Account', status: 'Review', deadline: '30 Days', members: 2 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-[2px_0_20px_rgba(0,0,0,0.02)]">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-100">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-lg shadow-slate-200">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-800">QS Platform</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-6">
          <div className="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg cursor-pointer border border-blue-100 shadow-sm">
            <Grid className="w-5 h-5" />
            <span className="font-medium text-sm">Console Overview</span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-lg cursor-pointer transition-colors group">
            <FileText className="w-5 h-5 group-hover:text-slate-600" />
            <span className="text-sm font-medium">My Cases</span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-lg cursor-pointer transition-colors group">
            <Folder className="w-5 h-5 group-hover:text-slate-600" />
            <span className="text-sm font-medium">My Documents</span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-lg cursor-pointer transition-colors group">
            <Users className="w-5 h-5 group-hover:text-slate-600" />
            <span className="text-sm font-medium">Team Activity</span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-lg cursor-pointer transition-colors group">
            <Settings className="w-5 h-5 group-hover:text-slate-600" />
            <span className="text-sm font-medium">Platform Settings</span>
          </div>
        </nav>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
           <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center font-bold text-slate-600">
                JD
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800">John Doe</span>
                <span className="text-xs text-slate-500">Senior Consultant</span>
              </div>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="px-10 py-8 flex justify-between items-end bg-white border-b border-slate-100 sticky top-0 z-10">
           <div>
             <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back, John</h1>
             <p className="text-slate-500 text-sm mt-2">You have <span className="font-semibold text-blue-600">3 active disputes</span> requiring attention.</p>
           </div>
           <div className="flex space-x-4">
              <button className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow">
                View Reports
              </button>
              <button className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold transition-all shadow-lg shadow-slate-900/10 hover:shadow-xl">
                + New Dispute Case
              </button>
           </div>
        </header>

        <main className="p-10 max-w-7xl mx-auto w-full">
           
           {/* Case Selection Grid */}
           <section className="mb-12 animate-[fadeIn_0.5s_ease-out]">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center">
                 <Activity className="w-4 h-4 mr-2" />
                 Active Cases
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {projects.map(project => (
                   <div 
                      key={project.id}
                      onClick={() => setSelectedProject(project.id)}
                      className={`
                        relative p-6 rounded-xl border cursor-pointer transition-all duration-300 group bg-white
                        ${selectedProject === project.id 
                            ? 'border-blue-500 ring-4 ring-blue-500/10 shadow-xl scale-[1.02]' 
                            : 'border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50'}
                      `}
                   >
                      <div className="flex justify-between items-start mb-4">
                        <span className={`px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${project.type === 'Arbitration' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                           {project.type}
                        </span>
                        {selectedProject === project.id && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{project.name}</h3>
                      
                      <div className="flex items-center text-sm text-slate-500 mb-8">
                         <div className={`w-1.5 h-1.5 rounded-full mr-2 ${project.status.includes('Active') ? 'bg-amber-400' : 'bg-slate-300'}`}></div>
                         {project.status}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100">
                         <div className="flex items-center font-medium text-slate-500">
                           <Clock className="w-3.5 h-3.5 mr-1.5" />
                           {project.deadline}
                         </div>
                         <div className="flex items-center font-medium text-slate-500">
                            <Users className="w-3.5 h-3.5 mr-1.5" />
                            {project.members}
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </section>

           {/* Layout Configuration */}
           <div className={`transition-all duration-500 ease-out transform ${selectedProject ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
              <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-100 pb-6">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">Workspace Configuration</h2>
                        <p className="text-slate-500 text-sm">Configure your viewing environment for <span className="font-semibold text-slate-900">{projects.find(p => p.id === selectedProject)?.name}</span>.</p>
                    </div>
                    <button 
                        onClick={() => onLaunch(selectedLayout)}
                        className="mt-4 md:mt-0 px-8 py-3 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-600/20 flex items-center transition-all transform hover:scale-[1.02]"
                    >
                        Enter Workspace <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Balanced Layout */}
                    <div 
                        onClick={() => setSelectedLayout('balanced')}
                        className={`p-1 rounded-xl border cursor-pointer transition-all ${selectedLayout === 'balanced' ? 'bg-blue-50 border-blue-500' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                    >
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className={`font-bold text-sm ${selectedLayout === 'balanced' ? 'text-blue-700' : 'text-slate-700'}`}>Standard Balanced</span>
                                {selectedLayout === 'balanced' && <div className="w-4 h-4 text-blue-500"><ChevronRight className="w-4 h-4" /></div>}
                            </div>
                            <div className="h-24 bg-slate-50 rounded border border-slate-200 flex overflow-hidden mb-3 shadow-inner">
                                <div className="w-1/4 border-r border-slate-200 bg-white"></div>
                                <div className="flex-1 bg-white/50"></div>
                                <div className="w-1/4 border-l border-slate-200 bg-white"></div>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">Equal space for documents, spreadsheets, and evidence. Best for general auditing.</p>
                        </div>
                    </div>

                    {/* Spreadsheet Focus */}
                    <div 
                        onClick={() => setSelectedLayout('sheet-focus')}
                        className={`p-1 rounded-xl border cursor-pointer transition-all ${selectedLayout === 'sheet-focus' ? 'bg-blue-50 border-blue-500' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                    >
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className={`font-bold text-sm ${selectedLayout === 'sheet-focus' ? 'text-blue-700' : 'text-slate-700'}`}>Spreadsheet Focus</span>
                                {selectedLayout === 'sheet-focus' && <div className="w-4 h-4 text-blue-500"><ChevronRight className="w-4 h-4" /></div>}
                            </div>
                            <div className="h-24 bg-slate-50 rounded border border-slate-200 flex overflow-hidden mb-3 shadow-inner">
                                <div className="w-[15%] border-r border-slate-200 bg-slate-100/50"></div>
                                <div className="flex-1 bg-blue-50 border-x border-blue-100"></div>
                                <div className="w-[15%] border-l border-slate-200 bg-slate-100/50"></div>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">Maximized center panel for complex formula investigation and large datasets.</p>
                        </div>
                    </div>

                    {/* Evidence Focus */}
                    <div 
                        onClick={() => setSelectedLayout('evidence-focus')}
                        className={`p-1 rounded-xl border cursor-pointer transition-all ${selectedLayout === 'evidence-focus' ? 'bg-blue-50 border-blue-500' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                    >
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className={`font-bold text-sm ${selectedLayout === 'evidence-focus' ? 'text-blue-700' : 'text-slate-700'}`}>Evidence Heavy</span>
                                {selectedLayout === 'evidence-focus' && <div className="w-4 h-4 text-blue-500"><ChevronRight className="w-4 h-4" /></div>}
                            </div>
                            <div className="h-24 bg-slate-50 rounded border border-slate-200 flex overflow-hidden mb-3 shadow-inner">
                                <div className="w-2/5 border-r border-slate-200 bg-blue-50 border-r border-blue-100"></div>
                                <div className="flex-1 bg-white/50"></div>
                                <div className="w-1/5 border-l border-slate-200 bg-white"></div>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">Expanded document viewer for reading contracts and reports side-by-side.</p>
                        </div>
                    </div>
                 </div>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
};