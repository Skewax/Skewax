/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_GRAPHQL_ENDPOINT: string
  readonly VITE_REFRESH_ENDPOINT: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
