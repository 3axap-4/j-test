import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { VideoListWidgetModule } from './features/components/video-list-widget/video-list-widget.module';
import { AppConfigService } from './shared/services/app-config.service';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => appConfig.loadAppConfig();
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    VideoListWidgetModule
  ],
  providers: [
    AppConfigService,
    { provide: APP_INITIALIZER, useFactory: appInitializerFn, multi: true, deps: [AppConfigService]},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
