import React from 'react';

export enum ContentType {
  HEADING = 'heading',
  PARAGRAPH = 'paragraph',
  TABLE = 'table', // For generic tables like summary or reference
  CRCL_STAGES_TABLE = 'crcl_stages_table', // Specific table for CrCl stages
  DRUG_LIST = 'drug_list', // NEW: For displaying drugs as cards
  DDI_LIST = 'ddi_list', // NEW: For displaying drug-drug interactions as boxes
  REFERENCES = 'references',
}

export interface Column {
  key: string;
  header: string;
  className?: string;
}

export interface RowCell {
  value: string | React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
  isHeader?: boolean;
}

export type TableRow = RowCell[];

export interface DynamicTableData {
  columns: Column[];
  rows: TableRow[];
  tableClassName?: string;
  headerRowClassName?: string;
  bodyRowClassName?: string;
  cellClassName?: string; // Default for all cells
}

export interface CrClStage {
  stage: string;
  crClRange: string;
  adjustmentPrinciple: string;
}

export interface CrClAdjustmentRow {
  crClRange: string;
  doseAdjustmentPrinciple: string;
}

export interface DrugEntry {
  id: string; // Unique ID for each drug entry
  name: string | React.ReactNode;
  indication: string | React.ReactNode;
  normalDoses?: string | React.ReactNode;
  hepaticModification?: string | React.ReactNode; // For hepatic guide
  renalModification?: string | React.ReactNode; // For general renal guide (first part)
  crClAdjustments?: CrClAdjustmentRow[]; // For detailed renal guide (second part)
  contraindications?: string | React.ReactNode;
  keyModificationPrinciple: string | React.ReactNode;
  risks?: string | React.ReactNode;
  europeanTradeNames?: string;
  arabicTradeNames?: string;
  notes?: string | React.ReactNode; // General notes or additional info
  // For cross-referencing between guides (smart answer)
  relatedGuide?: 'hepatic' | 'renal';
  relatedDrugId?: string; // ID of the related drug entry in the other guide
}

export interface DDIEntry {
  id: string; // Unique ID for each DDI entry
  exampleDDI: string | React.ReactNode;
  drugImpacted: string | React.ReactNode;
  clinicalConsequence: string | React.ReactNode;
  applicationGuidance: string | React.ReactNode; // NEW: for how to avoid/manage
}

export interface ReferenceEntry {
  category: string;
  items: React.ReactNode[]; // Changed to React.ReactNode for mixed content
}

export interface ContentBlock {
  type: ContentType;
  level?: 1 | 2 | 3 | 4; // For headings (h1 to h4)
  content?: string | DynamicTableData | CrClStage[] | DrugEntry[] | DDIEntry[] | ReferenceEntry[];
  id?: string;
}

export interface GuidePage {
  title: string;
  intro: string;
  blocks: ContentBlock[];
}
