import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';

@Component({
  template: '<a href="{{url}}">{{title}}</a>'
})
export class VideoLinkRenderComponent implements AgRendererComponent {

  public title: string;
  public url: string;

  params: any;

  constructor() { }

  agInit(params: any): void {
    this.params = params;
    this.title = params.value.title;
    this.url = `https://www.youtube.com/watch?v=${params.value.id}`;
  }

  refresh(params: any): boolean {
      return false;
  }

}
