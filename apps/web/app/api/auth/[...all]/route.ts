import { auth, toNextJsHandler } from '@repo/auth/server'

// export const runtime = 'edge' // Hobby plan not is limited to edge runtime 1mb

export const { POST, GET } = toNextJsHandler(auth)
