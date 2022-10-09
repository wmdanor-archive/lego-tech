import { config } from '../config';

export function makeAccuweatherRequest<T>(path: string, query: Record<string, string | number | boolean>) {
  const url = new URL(path, 'https://dataservice.accuweather.com/');

  url.searchParams.set('apiKey', config.accuweatherApiKey);
  for (const [key, value] of Object.entries(query)) {
    url.searchParams.set(key, String(value));
  }

  return fetch(url).then<T>(r => r.json());
}
