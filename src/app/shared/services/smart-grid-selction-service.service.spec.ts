import { RowNode } from 'ag-grid-community';
import { TestBed } from '@angular/core/testing';
import { SmartGridSelctionServiceService } from './smart-grid-selction-service.service';
import { skip, take, takeWhile, takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

const rowsStub = [creteStubRow('0'), creteStubRow('1'), creteStubRow('2')];
function creteStubRow(id: string) {
  const row = new RowNode();
  row.id = id;
  return row;
}

describe('SmartGridSelctionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmartGridSelctionServiceService = TestBed.get(SmartGridSelctionServiceService);
    expect(service).toBeTruthy();
  });

  it('should contain empty inner collection after creation', () => {
    const service: SmartGridSelctionServiceService = TestBed.get(SmartGridSelctionServiceService);
    expect(service.selectionData$.value).toBeTruthy();
    expect(service.selectionData$.value.length).toEqual(0);
  });

  it('updateRowData should update inner collection of rows', () => {
    const service: SmartGridSelctionServiceService = TestBed.get(SmartGridSelctionServiceService);
    expect(service).toBeTruthy();
    const row = rowsStub[0];
    service.updateRowData([row]);
    // tslint:disable-next-line: no-string-literal
    expect(service['selectedRowsCollection']).toBeTruthy();
    // tslint:disable-next-line: no-string-literal
    expect(service['selectedRowsCollection'].length).toBe(1);
    // tslint:disable-next-line: no-string-literal
    expect(service['selectedRowsCollection'][0].rowId === row.id).toBeTruthy();
  });

  it('updateSelectionRowState should update row check state', () => {
    const service: SmartGridSelctionServiceService = TestBed.get(SmartGridSelctionServiceService);
    expect(service).toBeTruthy();
    service.updateRowData(rowsStub);
    const selectedRow = rowsStub[0];
    const s = service.rowChangeState$.pipe(skip(1)).subscribe((row) => {
      expect(row.rowId).toBe(selectedRow.id);
      expect(row.selected).toBeTruthy();
     });

    service.updateSelectionRowState(selectedRow.id, true);
    expect(service.selectionData$.value.length).toEqual(rowsStub.length);
    s.unsubscribe();
  });
});
