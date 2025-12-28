import { DocumentFile, SpreadsheetRow } from './types';

export const MOCK_DOCUMENTS: DocumentFile[] = [
  { id: 'CON-001', name: 'Master Contract A (FIDIC Red).pdf', type: 'CONTRACT', date: '2023-01-15', preview: 'Clause 12.1: Measurement of Works...' },
  { id: 'INV-405', name: 'Invoice_Jan_2024_Steel.pdf', type: 'PDF', date: '2024-01-05', preview: 'Line 45: High Tensile Steel Reinforcement: 45 Tons' },
  { id: 'EML-54', name: 'Re: VO-003 Methodology', type: 'EMAIL', date: '2024-02-20', preview: 'The consultant rejects the waste percentage applied...' },
  { id: 'RPT-EXP', name: 'Expert Witness Report V2.pdf', type: 'PDF', date: '2024-03-10', preview: 'Assessment of disruption claims in Sector 4...' },
];

export const MOCK_SPREADSHEET_DATA: SpreadsheetRow[] = [
  { id: 'row-1', item: 'BOQ 2.1: Excavation Works', contractA: 50000, contractB: 0, contractC: 12000, total: 62000, isArbitrationRelevant: false, formulaDescription: 'Measured Works: Sum of Contract A and C excavation line items' },
  { id: 'row-2', item: 'BOQ 3.4: Steel Reinforcement', contractA: 120000, contractB: 45000, contractC: 0, total: 165000, isArbitrationRelevant: true, formulaDescription: 'Base rate * tonnage derived from Invoice 405' },
  { id: 'row-3', item: 'VO-003: Steel Waste Percentage', contractA: 5000, contractB: 2200, contractC: 0, total: 7200, isArbitrationRelevant: true, formulaDescription: 'Disputed calculation: 5% of total steel mass vs 3% contract allowance' },
  { id: 'row-4', item: 'BOQ 4.1: Concrete Pouring (C30/37)', contractA: 200000, contractB: 200000, contractC: 200000, total: 600000, isArbitrationRelevant: false, formulaDescription: 'Lump sum milestones approved by Engineer' },
  { id: 'row-5', item: 'CLM-01: Labor Overtime (Acceleration)', contractA: 0, contractB: 35000, contractC: 0, total: 35000, isArbitrationRelevant: true, formulaDescription: 'Claim for acceleration measures instruction dated Nov 12' },
  { id: 'row-6', item: 'PRELIM: Site Security Services', contractA: 12000, contractB: 12000, contractC: 12000, total: 36000, isArbitrationRelevant: false, formulaDescription: 'Time-related charge: Shared cost distributed equally' },
  { id: 'row-7', item: 'MAT: Imported Backfill Type A', contractA: 15000, contractB: 0, contractC: 0, total: 15000, isArbitrationRelevant: false, formulaDescription: 'Standard remeasurement' },
  { id: 'row-8', item: 'CLM-02: Idling Plant (Excavator)', contractA: 0, contractB: 18500, contractC: 0, total: 18500, isArbitrationRelevant: true, formulaDescription: 'Standby rates for 5 days due to lack of access' },
];

export const MOCK_EQUIPMENT_DATA: SpreadsheetRow[] = [
  { id: 'eq-1', item: 'Tower Crane TC-01 (Liebherr)', contractA: 45000, contractB: 15000, contractC: 0, total: 60000, isArbitrationRelevant: false, formulaDescription: 'Fixed monthly rate x 12 months + 4 months extension' },
  { id: 'eq-2', item: 'Excavator 22T (Cat 320)', contractA: 12500, contractB: 0, contractC: 8500, total: 21000, isArbitrationRelevant: true, formulaDescription: 'Base contract works + Claim #2 Standby hours (Idle Time)' },
  { id: 'eq-3', item: 'Mobile Crane 50T', contractA: 5000, contractB: 12000, contractC: 0, total: 17000, isArbitrationRelevant: true, formulaDescription: 'Ad-hoc lifts for steel erection (Disputed variation due to crane breakdown)' },
  { id: 'eq-4', item: 'Generator 250kVA', contractA: 8000, contractB: 2000, contractC: 6000, total: 16000, isArbitrationRelevant: false, formulaDescription: 'Fuel + Rental inclusive rate (Time Related)' },
  { id: 'eq-5', item: 'Scaffolding (Perimeter)', contractA: 25000, contractB: 0, contractC: 0, total: 25000, isArbitrationRelevant: false, formulaDescription: 'Lump sum erection and dismantle' },
  { id: 'eq-6', item: 'Telehandler (JCB)', contractA: 18000, contractB: 4500, contractC: 9000, total: 31500, isArbitrationRelevant: true, formulaDescription: 'Extended hire due to access delay (Claim #4)' },
  { id: 'eq-7', item: 'Dump Truck 10T (DT-04)', contractA: 6500, contractB: 0, contractC: 0, total: 6500, isArbitrationRelevant: false, formulaDescription: 'Standard daily rate per logbook' },
  { id: 'eq-8', item: 'Piling Rig (Auger)', contractA: 85000, contractB: 0, contractC: 25000, total: 110000, isArbitrationRelevant: true, formulaDescription: 'Delay event: 3 days standing time awaiting design instruction' },
];