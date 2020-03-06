import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';

@Component({
  template: '<img src="{{params.value}}" class="video-thumbnail-center"/>',
  styleUrls: ['./video-thumbnail-render.component.css']
})
export class VideoThumbnailRenderComponent implements AgRendererComponent {
  params: any;

  constructor() { }

  agInit(params: any): void {
      this.params = params;
  }

  refresh(params: any): boolean {
      return false;
  }
}
