'use client'

import { useState, useEffect } from 'react'
import { Lock } from 'lucide-react'
import { signIn } from '@/lib/auth-client'

const MAX_ATTEMPTS = 5
const BLOCK_MS = 10 * 60 * 1000 // 10 minutos

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [blockedUntil, setBlockedUntil] = useState<number | null>(null)
  const [remaining, setRemaining] = useState(0)

  const blocked = blockedUntil !== null && Date.now() < blockedUntil

  // Countdown timer
  useEffect(() => {
    if (blockedUntil === null) return
    setRemaining(Math.ceil((blockedUntil - Date.now()) / 1000))
    const id = setInterval(() => {
      const left = Math.ceil((blockedUntil - Date.now()) / 1000)
      if (left <= 0) {
        setBlockedUntil(null)
        setAttempts(0)
        setError('')
      } else {
        setRemaining(left)
      }
    }, 1000)
    return () => clearInterval(id)
  }, [blockedUntil])

  function triggerBlock() {
    setBlockedUntil(Date.now() + BLOCK_MS)
    setRemaining(BLOCK_MS / 1000)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (blocked) return
    setError('')
    setLoading(true)
    try {
      const result = await signIn.email({ email: email.trim(), password })
      if (result.error) {
        if (result.error.status === 429) {
          triggerBlock()
        } else {
          const next = attempts + 1
          setAttempts(next)
          if (next >= MAX_ATTEMPTS) {
            triggerBlock()
          } else {
            const left = MAX_ATTEMPTS - next
            setError(
              `Credenciales incorrectas. Te quedan ${left} intento${left !== 1 ? 's' : ''}.`
            )
          }
        }
      } else {
        onSuccess()
      }
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const mins = String(Math.floor(remaining / 60)).padStart(2, '0')
  const secs = String(remaining % 60).padStart(2, '0')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
      <div className="animate-fade-up w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-slate-100">
            <Lock className="size-5 text-slate-500" />
          </span>
          <h2 className="text-xl font-bold tracking-tight text-slate-800">
            Acceso privado
          </h2>
          <p className="text-sm text-slate-500">
            Introduce tus credenciales para continuar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="admin-email" className="mb-1.5 block text-xs font-semibold text-slate-600">
              Correo electrónico
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={blocked}
              placeholder="usuario@email.com"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#72b01d] focus:bg-white focus:ring-2 focus:ring-[#72b01d]/20 disabled:opacity-50"
            />
          </div>
          <div>
            <label htmlFor="admin-pass" className="mb-1.5 block text-xs font-semibold text-slate-600">
              Contraseña
            </label>
            <input
              id="admin-pass"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={blocked}
              placeholder="••••••••••"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#72b01d] focus:bg-white focus:ring-2 focus:ring-[#72b01d]/20 disabled:opacity-50"
            />
          </div>

          {blocked ? (
            <div className="rounded-lg border border-[#e62020]/20 bg-[#fdeaea] px-3 py-3 text-xs text-[#c41616]">
              <p className="font-bold">Acceso bloqueado temporalmente</p>
              <p className="mt-1">Demasiados intentos fallidos. Por seguridad, espera antes de volver a intentarlo.</p>
              <p className="mt-2 text-sm font-bold tabular-nums">{mins}:{secs}</p>
            </div>
          ) : error ? (
            <p className="rounded-lg border border-[#e62020]/20 bg-[#fdeaea] px-3 py-2 text-xs font-medium text-[#c41616]">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading || blocked}
            className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-700 disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                </svg>
                Verificando…
              </span>
            ) : blocked ? (
              `Bloqueado · ${mins}:${secs}`
            ) : (
              'Entrar'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
