import { RowNode } from 'ag-grid-community';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISelectedRow } from '../models/smart-grid-selected-row.model';

@Injectable({
  providedIn: 'root'
})
export class SmartGridSelctionServiceService {

  private selectedRowsCollection: ISelectedRow[] = [];
  public selectionData$ = new BehaviorSubject<ISelectedRow[]>([]);
  public rowChangeState$ = new BehaviorSubject<ISelectedRow>(null);

  constructor() { }

  public updateRowData(rows: RowNode[]) {
    if (!rows || rows.length === 0) {
      this.selectedRowsCollection = [];
    }

    for (const row of rows) {
      if (!this.selectedRowsCollection.some(r => r.rowId === row.id)) {
        const newRow: ISelectedRow = { rowId: row.id, selected: false };
        this.selectedRowsCollection.push(newRow);
      }
    }
    this.selectionData$.next(this.selectedRowsCollection);
  }

  public updateAllRowsSelectionState(state: boolean) {
    for (const row of this.selectedRowsCollection) {
      this.updateSelectionRowState(row.rowId, state);
    }
  }

  public updateSelectionRowState(rowId: string, state: boolean) {
    const row = this.selectedRowsCollection.find(elem => elem.rowId === rowId);
    if (row) {
      row.selected = state;
      this.selectionData$.next(this.selectedRowsCollection);
      this.rowChangeState$.next(row);
    }
  }
}
