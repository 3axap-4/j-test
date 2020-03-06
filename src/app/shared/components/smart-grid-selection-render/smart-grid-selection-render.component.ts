import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICellRendererParams } from 'ag-grid-community';
import { AgFrameworkComponent } from 'ag-grid-angular';
import { SmartGridSelctionServiceService } from '../../services/smart-grid-selction-service.service';

@Component({
  selector: 'app-smart-grid-selection-render',
  templateUrl: './smart-grid-selection-render.component.html'
})
export class SmartGridSelectionRenderComponent  implements OnDestroy, AgFrameworkComponent<ICellRendererParams> {

  params: ICellRendererParams;
  public selected: boolean;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private selctionServiceService: SmartGridSelctionServiceService) {
    this.selctionServiceService.rowChangeState$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(row => {
          if (row && this.params && this.params.rowIndex.toString() === row.rowId) {
            this.selected = row.selected;
          }
        });
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;

    if (this.selctionServiceService.selectionData$
      && this.selctionServiceService.selectionData$.value) {
        const row = this.selctionServiceService.selectionData$.value.find((val) => val.rowId === params.rowIndex.toString());
        if (row) {
          this.selected = row.selected;
        }
    }
  }

  public selectionChanged($event) {
    this.selected = $event;
    this.selctionServiceService.updateSelectionRowState(this.params.rowIndex.toString(), this.selected);
  }

  refresh(params: any): boolean {
    return false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
