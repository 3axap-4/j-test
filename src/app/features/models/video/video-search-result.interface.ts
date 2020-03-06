import { IVideoSearchResultpageInfo } from '../video-search-result-page-info.interface';
import { IVideoItem } from './video-item.interface';

export interface IVideoSearchResult {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: IVideoSearchResultpageInfo;
  items: IVideoItem[];
}
