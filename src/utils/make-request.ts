import { config } from '../config';

export function makeRequest<T>(path: string, query: Record<string, string | number | boolean>) {
  const url = new URL(path, config.backendHost);

  for (const [key, value] of Object.entries(query)) {
    url.searchParams.set(key, String(value));
  }

  return fetch(url)
    .then<T>(r => r.json())
    .catch(err => {
      throw err;
    });
}
