
export enum LogType {
  NAVIGATE = 'NAVIGATE',
  SELECT_CELL = 'SELECT_CELL',
  OPEN_DOC = 'OPEN_DOC',
  SEARCH = 'SEARCH',
  PIN_LOGIC = 'PIN_LOGIC'
}

export interface LogicLogEntry {
  id: string;
  timestamp: Date;
  type: LogType;
  description: string;
  details?: string;
  relatedCellId?: string;
  relatedDocId?: string;
}

export interface SpreadsheetRow {
  id: string;
  item: string;
  contractA: number;
  contractB: number;
  contractC: number;
  total: number;
  isArbitrationRelevant: boolean; // For the "Layered" view
  formulaDescription: string; // Used for AI context
}

export interface DocumentFile {
  id: string;
  name: string;
  type: 'PDF' | 'EMAIL' | 'CONTRACT' | 'IMAGE';
  preview: string;
  date: string;
  url?: string;
  isUploaded?: boolean;
}

export interface Breadcrumb {
  label: string;
  path: string;
}