import { ColDef } from 'ag-grid-community';
// tslint:disable-next-line: max-line-length
import { SmartGridSelectionRenderComponent } from '../components/smart-grid-selection-render/smart-grid-selection-render.component';
// tslint:disable-next-line: max-line-length
import { SmartGridSelectionHeaderRenderComponent } from '../components/smart-grid-selection-header-render/smart-grid-selection-header-render.component';

export const SmartGridDefaultColumns: ColDef[] = [{
    colId: 'selection',
    headerName: '',
    width: 32,
    autoHeight: true,
    cellRendererFramework: SmartGridSelectionRenderComponent,
    headerComponentFramework : SmartGridSelectionHeaderRenderComponent,
    cellStyle: (params) => ({
      whiteSpace: 'normal',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    })
}];
