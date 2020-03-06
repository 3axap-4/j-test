import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { SmartGridColumnDefModel } from 'src/app/shared/models/smart-grid-column-def.model';
import { VideoService } from '../../services/video.service';
import { VideoThumbnailRenderComponent } from './video-thumbnail-render/video-thumbnail-render.component';
import { VideoLinkRenderComponent } from './video-link-render/video-link-render.component';
import { IVideoListContextMenuItem } from '../../models/video/video-list-context-menu-item.interface';
import { contextMenuAccessValidatorForFieldOnly } from '../../models/video/video-list-context-menu-access-validator';

@Component({
  selector: 'app-video-list-widget',
  templateUrl: './video-list-widget.component.html',
  styleUrls: ['./video-list-widget.component.css']
})
export class VideoListWidgetComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<any> = new Subject<any>();

  public listColumnDefs: SmartGridColumnDefModel[] = [];
  public contextMenuItems: IVideoListContextMenuItem[];
  public contextMenuAccessValidator = contextMenuAccessValidatorForFieldOnly('title');
  public data: any[] = [];
  public totalRecords: number;
  public recordsPerPage = 50;

  constructor(private videoService: VideoService,
              private dateFormatter: DatePipe) { }

  ngOnInit() {
    this.videoService.getVideoEntries(this.recordsPerPage);
    this.videoService.videoData$
        .pipe(
          takeUntil(this.unsubscribe$),
          map(data => {
            if (data && data.items && data.items.length > 0) {
              this.totalRecords = data.pageInfo.totalResults;
              this.recordsPerPage = data.pageInfo.resultsPerPage;
              return data.items.map(item => {
                if (item && item.snippet) {
                  return {
                    publishedAt: item.snippet.publishedAt,
                    title: { title: item.snippet.title, id: item.id.videoId },
                    description: item.snippet.description,
                    thumbnails: item.snippet.thumbnails.default.url,
                  };
                }
              });
            }
            return [];
          }))
        .subscribe(result => {
          this.data = result;
        });

    this.listColumnDefs = [
      {
        headerName: '',
        field: 'thumbnails',
        cellRendererFramework: VideoThumbnailRenderComponent,
        cellStyle: (params) => ({
          whiteSpace: 'normal',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        })
      },
      {
        headerName: 'Published on',
        field: 'publishedAt',
        valueFormatter: (data) => this.dateFormatter.transform(data.value, 'shortDate'),
        width: 128,
        cellStyle: (params) => ({
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        })
      },
      {
        headerName: 'Video Title',
        field: 'title',
        cellRendererFramework: VideoLinkRenderComponent,
        cellStyle: (params) => ({
          whiteSpace: 'normal',
          display: 'flex',
          alignItems: 'center'
        })
      },
      {
        headerName: 'Description',
        field: 'description',
        cellStyle: (params) => ({
          whiteSpace: 'normal',
          display: 'flex',
          alignItems: 'center'
        })
      }
    ];

    this.contextMenuItems = [
      {
        name: 'Open on new tab',
        prepareAction: (params) => {
          if (!params || !params.column || !params.value || !params.value.id) {
            return null;
          }

          const colDef = params.column.getColDef();
          if (!colDef) {
            return null;
          }

          const url = `https://www.youtube.com/watch?v=${params.value.id}`;
          return () => { window.open(url, '_blank').focus(); };
        }
      }
    ];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
