// Next.js environment variable types
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL?: string
      // Add other environment variables here as needed
    }
  }
}

export {}
