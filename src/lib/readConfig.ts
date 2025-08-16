import { config, Config } from '../../config';

export const readConfig = (key: keyof Config) => {
  return config[key] ?? null;
};
