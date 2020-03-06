import { RestApiService } from 'src/app/shared/services/rest-api.service';
import { Injectable } from '@angular/core';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { IVideoSearchResult } from '../models/video/video-search-result.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  public videoData$ = new BehaviorSubject<IVideoSearchResult>(null);

  constructor(private appConfigService: AppConfigService,
              private restApiService: RestApiService) { }

  public getVideoEntries(pageSize = 50, query = 'john') {
    const keyEndpointPart = `key=${this.appConfigService.config.youtubeApiKey}`;
    const pageSizePart = `maxResults=${pageSize}`;
    const queryPart = `q=${query}`;
    const searchPart = `search?type=video&part=snippet`;
    const endpoint = `${this.appConfigService.config.youtubeApiUrl}/${searchPart}&${keyEndpointPart}&${pageSizePart}&${queryPart}`;

    this.restApiService.get<IVideoSearchResult>({ endpoint })
        .subscribe(result => this.videoData$.next(result));
  }
}
