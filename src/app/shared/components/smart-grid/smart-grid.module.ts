import { ToggleButtonComponent } from './../toggle-button/toggle-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartGridComponent } from './smart-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { SmartGridSelectionRenderComponent } from '../smart-grid-selection-render/smart-grid-selection-render.component';
// tslint:disable-next-line: max-line-length
import { SmartGridSelectionHeaderRenderComponent } from '../smart-grid-selection-header-render/smart-grid-selection-header-render.component';
import { ModuleRegistry, ClipboardModule } from '@ag-grid-enterprise/all-modules';
ModuleRegistry.register(ClipboardModule);

@NgModule({
  declarations: [
    SmartGridComponent,
    ToggleButtonComponent,
    SmartGridSelectionRenderComponent,
    SmartGridSelectionHeaderRenderComponent
  ],
  imports: [
    CommonModule,
    AgGridModule
  ],
  exports: [
    SmartGridComponent
  ],
  entryComponents: [
    SmartGridSelectionRenderComponent,
    SmartGridSelectionHeaderRenderComponent
  ]
})
export class SmartGridModule { }
