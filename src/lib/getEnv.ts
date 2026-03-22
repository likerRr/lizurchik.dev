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

  return null as unknown as T;
}
