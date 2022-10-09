import { config } from '../config';

export function makeRequest<T>(path: string, query: Record<string, string | number | boolean>) {
  const url = new URL(path, config.backendHost);

  for (const [key, value] of Object.entries(query)) {
    url.searchParams.set(key, String(value));
  }

  return fetch(url)
    .then<T>(r => {
      if (r.ok) {
        return r.json();
      }

      return new Promise((_, reject) => {
        r.json().then(reject);
      });
    });
}
