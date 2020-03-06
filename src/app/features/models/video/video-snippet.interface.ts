import { IVideoThumbnail } from './video-thumbnail.interface';

export interface IVideoSnippet {
  channelId: string;
  title: string;
  description: string;
  publishedAt: Date;
  thumbnails: { [id: string]: IVideoThumbnail };
}
