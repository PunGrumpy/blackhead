import {
  type NoseconeOptions,
  defaults,
  withVercelToolbar
} from '@nosecone/next'
export { createMiddleware as noseconeMiddleware } from '@nosecone/next'

// Nosecone security headers configuration
// https://docs.arcjet.com/nosecone/quick-start
export const noseconeOptions: NoseconeOptions = {
  ...defaults,
  // Content Security Policy (CSP) is disabled by default because the values
  // depend on which BlackHead features are enabled
  contentSecurityPolicy: false
}

export const noseconeOptionsWithToolbar: NoseconeOptions =
  withVercelToolbar(noseconeOptions)
