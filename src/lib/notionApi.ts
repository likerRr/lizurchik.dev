import { NotionAPI } from 'notion-client';

export const notionApi = new NotionAPI({
  kyOptions: {
    mode: 'cors',
  },
});
