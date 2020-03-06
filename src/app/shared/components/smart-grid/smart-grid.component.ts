import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AllModules, Module } from '@ag-grid-enterprise/all-modules';
import { ColDef, GridOptions, GetContextMenuItemsParams } from 'ag-grid-community';
import { SmartGridColumnDefModel } from '../../models/smart-grid-column-def.model';
import { SmartGridSelctionServiceService } from '../../services/smart-grid-selction-service.service';
import { SmartGridDefaultColumns } from '../../models/smart-grid-default-cols.model';
import { IVideoListContextMenuItem } from 'src/app/features/models/video/video-list-context-menu-item.interface';

@Component({
  selector: 'app-smart-grid',
  templateUrl: './smart-grid.component.html',
  styleUrls: [
    './smart-grid.component.css'
  ]
})
export class SmartGridComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<any> = new Subject<any>();
  public columnDefs: ColDef[];
  public gridOptions: GridOptions;
  public selectedCount: number;
  public modules: Module[] = AllModules;

  @Input()
  set columns(data: SmartGridColumnDefModel[]) {
    this.setupColumns(data);
  }

  @Input() rowData: any[];
  @Input() totalRecords: number;
  @Input() recordsPerPage: number;
  @Input() contextMenuItems: IVideoListContextMenuItem[];
  @Input() contextMenuAccessValidator: (params: GetContextMenuItemsParams) => boolean;

  private gridColumnApi;
  private gridApi;
  private defaultContextMenuItems = ['copy', 'copyWithHeaders', 'paste'];

  constructor(private selctionServiceService: SmartGridSelctionServiceService) { }

  ngOnInit() {
    this.setupGridOptions();
    this.selctionServiceService.selectionData$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          this.selectedCount = data.filter(s => s.selected).length;
          if (this.gridApi) {
            const model = this.gridApi.getModel();
            if (model && model.nodeManager) {
              for (const row of data ) {
                if (model.nodeManager.allNodesMap[row.rowId]) {
                  model.nodeManager.allNodesMap[row.rowId].setSelected(row.selected);
                }
              }
            }
          }
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onGridReady(grid) {
    grid.api.sizeColumnsToFit();
    this.gridColumnApi = grid.columnApi;
    this.gridColumnApi.setColumnVisible('selection', false);
    this.gridApi = grid.api;
    this.gridApi.gridOptionsWrapper.gridOptions.suppressRowClickSelection = true;
  }

  public onRowDataChanged(event) {
    this.selctionServiceService.updateRowData( event.api.getModel().rowsToDisplay);
  }

  public onSelectionModeChanged($event) {
    this.gridColumnApi.setColumnVisible('selection', $event);
    if (!$event) {
      this.selctionServiceService.updateAllRowsSelectionState(false);
    }
  }

  private setupColumns(columns: SmartGridColumnDefModel[]) {
    if (columns && columns.length > 0) {
      this.columnDefs = [];

      for (const col of SmartGridDefaultColumns) {
        this.columnDefs.push(col);
      }

      columns.forEach((column: SmartGridColumnDefModel) => {
        const definition: ColDef = {
          headerName: column.headerName,
          field: column.field,
          width: column.width,
          cellStyle: column.cellStyle,
          cellClass: column.cellClass,
          autoHeight: true
        };
        if (column.cellRendererFramework) {
          definition.cellRendererFramework = column.cellRendererFramework;
        }
        if (column.valueFormatter) {
          definition.valueFormatter = column.valueFormatter;
        }
        this.columnDefs.push(definition);
      });
    }
  }

  public getContextMenuItems(params: GetContextMenuItemsParams ) {
    if (!params.context) {
      return null;
    }

    if (params.context.contextMenuAccessValidator && !params.context.contextMenuAccessValidator(params)) {
      return null;
    }

    const menu = [];
    if (params.context.contextMenuItems && params.context.contextMenuItems.length > 0) {
      for (const item of params.context.contextMenuItems) {
        menu.push({
          name: item.name,
          action: item.prepareAction(params)
        });
      }
      menu.push('separator');
    }

    for (const item of params.context.defaultContextMenuItems) {
      menu.push(item);
    }

    return menu;
  }

  private setupGridOptions() {
    this.gridOptions = {};
    this.gridOptions.getContextMenuItems = this.getContextMenuItems;
    this.gridOptions.context = this;
    return;
  }
}
