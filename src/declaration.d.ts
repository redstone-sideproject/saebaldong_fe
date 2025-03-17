declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_BASE_URL: string
    NEXT_PUBLIC_APP_URL: string
    NEXT_PUBLIC_GA_ID: string
  }
}

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gtag: any
}
