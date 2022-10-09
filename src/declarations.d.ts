declare module '*.css';

interface ImportMetaEnv {
  readonly VITE_BACKEND_HOST: string
  readonly ACCUWEATHER_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
