import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { VideoListWidgetComponent } from './video-list-widget.component';
import { SmartGridModule } from 'src/app/shared/components/smart-grid/smart-grid.module';
import { VideoService } from 'src/app/features/services/video.service';
import { RestApiService } from 'src/app/shared/services/rest-api.service';
import { VideoThumbnailRenderComponent } from './video-thumbnail-render/video-thumbnail-render.component';
import { VideoLinkRenderComponent } from './video-link-render/video-link-render.component';

@NgModule({
  declarations: [
    VideoListWidgetComponent,
    VideoThumbnailRenderComponent,
    VideoLinkRenderComponent
  ],
  imports: [
    CommonModule,
    SmartGridModule,
    HttpClientModule
  ],
  providers: [VideoService, RestApiService, DatePipe],
  exports: [
    VideoListWidgetComponent
  ],
  entryComponents: [
    VideoThumbnailRenderComponent,
    VideoLinkRenderComponent
  ],
})
export class VideoListWidgetModule { }
