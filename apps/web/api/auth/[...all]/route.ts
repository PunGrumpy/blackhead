import { auth, toNextJsHandler } from '@repo/auth/server'

export const { POST, GET } = toNextJsHandler(auth)
