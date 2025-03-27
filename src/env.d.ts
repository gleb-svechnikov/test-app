/// <reference types="vite/client" />

declare module '*.css' {
  const css: string
  export default css
}

interface ImportMetaEnv {
  readonly VITE_ECWID_STORE_ID: string
  readonly VITE_ECWID_TOKEN: string
  readonly BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

