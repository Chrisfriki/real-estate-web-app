import { auth } from '@/lib/auth'
import { toNextJsHandler } from 'better-auth/next-js'

// ── Diagnóstico de entorno (logs temporales) ──────────────────────────────────
const envCheck = {
  DATABASE_URL:      !!process.env.DATABASE_URL,
  BETTER_AUTH_SECRET: !!process.env.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL:   process.env.BETTER_AUTH_URL ?? '(no definida — usando VERCEL_URL)',
  VERCEL_URL:        process.env.VERCEL_URL ?? '(no definida)',
  VERCEL_PROJECT_PRODUCTION_URL:
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? '(no definida)',
  NODE_ENV: process.env.NODE_ENV,
}
console.log('[auth] Comprobación de entorno:', JSON.stringify(envCheck))

if (!process.env.DATABASE_URL) {
  console.error('[auth] ❌ DATABASE_URL no está definida — la conexión a Neon fallará')
}
if (!process.env.BETTER_AUTH_SECRET) {
  console.error(
    '[auth] ❌ BETTER_AUTH_SECRET no está definida — better-auth genera un secreto ' +
    'aleatorio en cada arranque; las sesiones no persistirán entre reinicios'
  )
}
// ─────────────────────────────────────────────────────────────────────────────

export const { GET, POST } = toNextJsHandler(auth.handler)
