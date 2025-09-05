import { config, Config } from '../../config';

export const readConfig = <T extends keyof Config, TDefault extends Config[T]>(
  key: T,
  defaultValue?: TDefault,
) => {
  const value = config[key as keyof Config];

  if (value !== undefined) {
    return value as Config[T];
  }

  return defaultValue as TDefault;
};
