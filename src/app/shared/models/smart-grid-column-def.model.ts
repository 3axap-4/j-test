import { ValueFormatterParams } from 'ag-grid-community';

export class SmartGridColumnDefModel {
  headerName: string;
  field: string;
  cellRendererFramework?: any;
  valueFormatter?: (params: ValueFormatterParams) => string;
  cellClass?: string | string[];
  width?: number;
  cellStyle?: {} | ((params: any) => {});
}
