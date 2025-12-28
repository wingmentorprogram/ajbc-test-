import React, { useState } from 'react';
import { MOCK_SPREADSHEET_DATA, MOCK_EQUIPMENT_DATA } from '../constants';
import { Info, Paperclip, CheckSquare, AlertTriangle, Truck, Table } from 'lucide-react';

interface SpreadsheetViewProps {
  arbitrationMode: boolean;
  activeCell: string | null;
  onCellSelect: (rowId: string, cellKey: string, value: any, context: string) => void;
  onPinLogic: (rowId: string) => void;
  onTabSwitch: (tabName: string) => void;
}

type SheetType = 'budget' | 'equipment';

export const SpreadsheetView: React.FC<SpreadsheetViewProps> = ({ 
  arbitrationMode, 
  activeCell, 
  onCellSelect,
  onPinLogic,
  onTabSwitch
}) => {
  const [activeSheet, setActiveSheet] = useState<SheetType>('budget');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const data = activeSheet === 'budget' ? MOCK_SPREADSHEET_DATA : MOCK_EQUIPMENT_DATA;
  const fileName = activeSheet === 'budget' 
    ? 'Master_Budget_Consolidated_V4.xlsx' 
    : 'Plant_And_Equipment_Schedule_Mar24.xlsx';

  const handleTabChange = (sheet: SheetType) => {
    if (activeSheet === sheet) return;
    setActiveSheet(sheet);
    onTabSwitch(sheet === 'budget' ? 'Master Budget' : 'Equipment Schedule');
  };

  const getHeaders = () => {
    if (activeSheet === 'budget') {
      return {
        col1: 'Contract A',
        col1Sub: 'Original',
        col2: 'Contract B',
        col2Sub: 'Var (Civil)',
        col3: 'Contract C',
        col3Sub: 'Var (MEP)'
      };
    } else {
      return {
        col1: 'Base Hire',
        col1Sub: 'Fixed Costs',
        col2: 'Op. Extras',
        col2Sub: 'Fuel/Maint',
        col3: 'Idle Time',
        col3Sub: 'Claimable'
      };
    }
  };

  const headers = getHeaders();

  return (
    <div className="flex-1 bg-white flex flex-col overflow-hidden relative font-sans">
      {/* Workbook Tabs */}
      <div className="flex items-center bg-slate-200 border-b border-slate-300 pt-2 px-2 space-x-1 select-none">
        <button
          onClick={() => handleTabChange('budget')}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-t-lg text-xs font-bold uppercase tracking-wider transition-colors
            ${activeSheet === 'budget' 
              ? 'bg-white text-blue-700 border-t border-x border-slate-300 shadow-[0_-2px_5px_rgba(0,0,0,0.02)] relative top-[1px]' 
              : 'bg-slate-100 text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
          `}
        >
          <Table className="w-3.5 h-3.5" />
          <span>Master Budget</span>
        </button>
        <button
          onClick={() => handleTabChange('equipment')}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-t-lg text-xs font-bold uppercase tracking-wider transition-colors
            ${activeSheet === 'equipment' 
              ? 'bg-white text-blue-700 border-t border-x border-slate-300 shadow-[0_-2px_5px_rgba(0,0,0,0.02)] relative top-[1px]' 
              : 'bg-slate-100 text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
          `}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Equipment Schedule</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 text-[11px] font-bold text-slate-500 flex justify-between items-center">
        <span className="flex items-center">
             <span className="font-mono text-slate-400 mr-2">FILE:</span>
             {fileName}
        </span>
        <div className="flex items-center space-x-3">
             <span className="text-slate-400">Read Only</span>
             <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 shadow-sm">Live Sync</span>
        </div>
      </div>

      <div className="overflow-auto flex-1 relative bg-slate-50/30">
        <table className="w-full text-xs border-collapse">
          <thead className="sticky top-0 bg-white z-10 shadow-sm ring-1 ring-black/5">
            <tr>
              <th className="w-10 border border-slate-200 p-2 text-slate-400 font-medium">#</th>
              <th className="text-left border border-slate-200 p-2 font-bold text-slate-700 min-w-[250px] bg-slate-50">
                {activeSheet === 'budget' ? 'Description of Works' : 'Equipment / Plant Item'}
              </th>
              <th className="text-right border border-slate-200 p-2 font-semibold text-slate-600 w-28 bg-slate-50/50">
                <div className="text-[10px] text-slate-400 uppercase">{headers.col1Sub}</div>
                {headers.col1}
              </th>
              <th className="text-right border border-slate-200 p-2 font-semibold text-slate-600 w-28 bg-slate-50/50">
                <div className="text-[10px] text-slate-400 uppercase">{headers.col2Sub}</div>
                {headers.col2}
              </th>
              <th className="text-right border border-slate-200 p-2 font-semibold text-slate-600 w-28 bg-slate-50/50">
                <div className="text-[10px] text-slate-400 uppercase">{headers.col3Sub}</div>
                {headers.col3}
              </th>
              <th className="text-right border border-slate-200 p-2 font-bold text-slate-900 bg-slate-100 w-32 border-l-2 border-l-slate-200">
                <div className="text-[10px] text-slate-500 uppercase">Final Acct.</div>
                Total
              </th>
              <th className="w-8 border border-slate-200 p-1"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row, idx) => {
              const isDimmed = arbitrationMode && !row.isArbitrationRelevant;
              const isSelected = activeCell?.startsWith(row.id);
              const isRowHovered = hoveredRow === row.id;

              return (
                <tr 
                  key={row.id} 
                  className={`
                    transition-all duration-200 group border-b border-slate-100
                    ${isDimmed ? 'opacity-20 grayscale' : 'opacity-100'}
                    ${isSelected ? 'bg-blue-50/80' : 'hover:bg-slate-50'}
                  `}
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="border-r border-slate-200 text-center text-slate-400 bg-slate-50/30 text-[10px]">{idx + 1}</td>
                  
                  {/* Item Name */}
                  <td 
                    className={`border-r border-slate-200 px-3 py-2 font-medium cursor-pointer relative text-slate-700 ${activeCell === `${row.id}-item` ? 'ring-2 ring-blue-500 ring-inset bg-white' : ''}`}
                    onClick={() => onCellSelect(row.id, 'item', row.item, `Item: ${row.item}`)}
                  >
                    {row.item}
                    {row.isArbitrationRelevant && (
                        <div className={`absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${arbitrationMode ? 'bg-red-500 animate-pulse' : 'bg-red-200'}`} title="Disputed Item"></div>
                    )}
                  </td>

                  {/* Values */}
                  {['contractA', 'contractB', 'contractC'].map((key) => (
                    <td 
                      key={key}
                      className={`border-r border-slate-200 px-2 py-2 text-right font-mono text-slate-600 cursor-pointer text-[11px] ${activeCell === `${row.id}-${key}` ? 'ring-2 ring-blue-500 ring-inset bg-white' : ''}`}
                      onClick={() => onCellSelect(row.id, key, (row as any)[key], `Checking ${key} for ${row.item}`)}
                    >
                      {(row as any)[key] === 0 ? <span className="text-slate-300">-</span> : (row as any)[key].toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  ))}

                  {/* Total */}
                  <td 
                    className={`border-r border-slate-200 border-l-2 border-l-slate-100 px-2 py-2 text-right font-mono font-bold text-slate-800 bg-slate-50/50 cursor-pointer text-[11px] ${activeCell === `${row.id}-total` ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
                    onClick={() => onCellSelect(row.id, 'total', row.total, `Reviewing Total Cost for ${row.item}`)}
                  >
                    {row.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>

                  {/* Action Column */}
                  <td className="p-1 text-center">
                    {(isRowHovered || isSelected) && !isDimmed && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); onPinLogic(row.id); }}
                            className="p-1.5 hover:bg-emerald-100 text-slate-300 hover:text-emerald-600 rounded-md transition-colors"
                            title="Substantiate (Pin Logic)"
                        >
                            <CheckSquare className="w-3.5 h-3.5" />
                        </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {arbitrationMode && (
             <div className="absolute bottom-6 right-6 bg-red-600 text-white px-5 py-3 rounded shadow-xl flex items-center text-xs font-bold animate-bounce pointer-events-none z-20 ring-4 ring-red-600/20">
                <AlertTriangle className="w-4 h-4 mr-3" />
                <div>
                    <div className="uppercase tracking-wider">Arbitration View</div>
                    <div className="text-[10px] font-normal opacity-90">Displaying Claim #3 Costs Only</div>
                </div>
             </div>
        )}
      </div>
    </div>
  );
};