import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IAppConfig {
  youtubeApiUrl: string;
  youtubeApiKey: string;
}

@Injectable()
export class AppConfigService {

  private appConfig: IAppConfig;

  get config() {
    return this.appConfig;
  }

  constructor(private injector: Injector) { }

  async loadAppConfig() {
    const http = this.injector.get(HttpClient);
    await new Promise((resolve, reject) => {
      http.get<IAppConfig>('/assets/app-config.json').subscribe(data => {
        if (data) {
          this.appConfig = data;
          resolve();
        } else {
          console.warn('failed to get apiUrl');
          reject();
        }
      });
    });
  }
}
