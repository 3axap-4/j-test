import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import { SmartGridSelctionServiceService } from '../../services/smart-grid-selction-service.service';

@Component({
  selector: 'app-smart-grid-selection-header-render',
  templateUrl: './smart-grid-selection-header-render.component.html',
  styleUrls: ['./smart-grid-selection-header-render.component.css']
})
export class SmartGridSelectionHeaderRenderComponent implements OnDestroy, IHeaderAngularComp  {

  public selected: boolean;
  private unsubscribe$: Subject<any> = new Subject<any>();

  agInit(params: IHeaderParams): void {
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
  }

  constructor(private selctionServiceService: SmartGridSelctionServiceService) {
    this.selctionServiceService.rowChangeState$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(row => {
          if (row && !row.selected) {
            this.selected = row.selected;
          }
        });
  }

  public selectionChanged($event) {
    this.selected = $event;
    this.selctionServiceService.updateAllRowsSelectionState(this.selected);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
