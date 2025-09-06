import { Block, ExtendedRecordMap } from 'notion-types';
import { getPageProperty } from 'notion-utils';

export const getIsPublicProperty = (
  block: Block,
  recordMap: ExtendedRecordMap,
) => {
  return Boolean(getPageProperty<boolean>('Public', block!, recordMap) ?? true);
};

export const getPublishedProperty = (
  block: Block,
  recordMap: ExtendedRecordMap,
) => {
  return getPageProperty<number | null>('Published', block!, recordMap);
};

export const getCreatedProperty = (
  block: Block,
  recordMap: ExtendedRecordMap,
) => {
  return getPageProperty<number | null>('Created', block!, recordMap);
};

export const getLastUpdatedProperty = (
  block: Block,
  recordMap: ExtendedRecordMap,
) => {
  return getPageProperty<number | null>('Last Updated', block!, recordMap);
};

export const getLastModifiedProperty = (
  block: Block,
  recordMap: ExtendedRecordMap,
) => {
  const lastUpdatedTime = getLastUpdatedProperty(block, recordMap);

  if (lastUpdatedTime) {
    return lastUpdatedTime;
  }

  const publishedTime = getPublishedProperty(block, recordMap);

  if (publishedTime) {
    return publishedTime;
  }

  const createdTime = getCreatedProperty(block, recordMap);

  if (createdTime) {
    return createdTime;
  }

  return null;
};

export const getLastModifiedTime = (
  block: Block,
  recordMap: ExtendedRecordMap,
) => {
  const lastModified = getLastModifiedProperty(block, recordMap);

  if (lastModified) {
    return new Date(lastModified);
  }

  return new Date();
};
