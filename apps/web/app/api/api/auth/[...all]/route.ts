import { auth, toNextJsHandler } from '@repo/auth/server'

export const runtime = 'edge'

export const { POST, GET } = toNextJsHandler(auth)
