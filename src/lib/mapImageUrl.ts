import { type Block } from 'notion-types';
import { defaultMapImageUrl } from 'notion-utils';

export const mapImageUrl = (url: string | undefined, block: Block) => {
  return defaultMapImageUrl(url, block);
};
