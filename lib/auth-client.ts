'use client'

import { createAuthClient } from 'better-auth/react'

// In the v0 preview iframe none of the VERCEL_* env vars are injected at
// runtime, so we fall back to a relative base URL which always resolves
// correctly in any environment.
export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' ? window.location.origin : undefined,
})

export const { signIn, signOut, useSession } = authClient
