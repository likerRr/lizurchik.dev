import { Block, ExtendedRecordMap } from 'notion-types';
import { getPageProperty } from 'notion-utils';

export const getIsPublicProperty = (
  block: Block,
  recordMap: ExtendedRecordMap,
) => {
  return Boolean(getPageProperty<boolean>('Public', block!, recordMap) ?? true);
};
