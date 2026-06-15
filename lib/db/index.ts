import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

// DATABASE_URL en local · POSTGRES_URL lo inyecta la integración Neon de Vercel
const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL
if (!connectionString) {
  console.error('[db] ❌ Ni DATABASE_URL ni POSTGRES_URL están definidas — la conexión fallará')
} else {
  console.log('[db] ✅ Conexión a base de datos configurada (variable:', process.env.DATABASE_URL ? 'DATABASE_URL' : 'POSTGRES_URL', ')')
}
export const pool = new Pool({ connectionString })
export const db = drizzle(pool, { schema })
