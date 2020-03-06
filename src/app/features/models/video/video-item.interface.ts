import { IVideoSnippet } from './video-snippet.interface';
import { IVideoId } from './video-id.interface';

export interface IVideoItem {
  kind: string;
  etag: string;
  id: IVideoId;
  snippet: IVideoSnippet;
}
