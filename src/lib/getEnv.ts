import { isServer } from './config';

export function getEnv<T>(
  key: string,
  defaultValue?: string | T,
  env = process.env,
): string | T {
  const value = env[key];

  if (value !== undefined) {
    return value as string;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  if (isServer) {
    throw new Error(`Config error: missing required env variable "${key}"`);
  }

  return null as unknown as T;
}
