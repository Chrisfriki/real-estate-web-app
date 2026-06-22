'use client'

import { useEffect, useState } from 'react'
import { Settings, X } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { useToast } from './toast'

const MIN_PASSWORD_LENGTH = 8

export function AccountSettings({
  email,
  onClose,
}: {
  email: string
  onClose: () => void
}) {
  const { notify } = useToast()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      notify({
        tone: 'error',
        title: 'Las contraseñas no coinciden',
        description: 'Las nuevas contraseñas no coinciden.',
      })
      return
    }
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      notify({
        tone: 'error',
        title: 'Contraseña demasiado corta',
        description: `La nueva contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`,
      })
      return
    }

    setLoading(true)
    try {
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: false,
      })

      if (error) {
        const description =
          error.code === 'INVALID_PASSWORD'
            ? 'La contraseña actual no es correcta.'
            : error.code === 'PASSWORD_TOO_SHORT' || error.code === 'PASSWORD_TOO_LONG'
              ? 'La nueva contraseña no cumple los requisitos mínimos.'
              : 'No se pudo actualizar la contraseña. Inténtalo de nuevo.'
        notify({ tone: 'error', title: 'No se pudo actualizar', description })
        return
      }

      notify({
        tone: 'success',
        title: 'Contraseña actualizada correctamente.',
        description: 'Ya puedes usar tu nueva contraseña la próxima vez que inicies sesión.',
      })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch {
      notify({
        tone: 'error',
        title: 'Error de conexión',
        description: 'No se pudo contactar con el servidor. Inténtalo de nuevo.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="animate-fade-up relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 flex size-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="size-4" />
        </button>

        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-slate-100">
            <Settings className="size-5 text-slate-500" />
          </span>
          <h2 className="text-xl font-bold tracking-tight text-slate-800">
            Ajustes de cuenta
          </h2>
          <p className="text-sm text-slate-500">{email}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="current-password" className="mb-1.5 block text-xs font-semibold text-slate-600">
              Contraseña actual
            </label>
            <input
              id="current-password"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              placeholder="••••••••••"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#72b01d] focus:bg-white focus:ring-2 focus:ring-[#72b01d]/20"
            />
          </div>
          <div>
            <label htmlFor="new-password" className="mb-1.5 block text-xs font-semibold text-slate-600">
              Nueva contraseña
            </label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={MIN_PASSWORD_LENGTH}
              placeholder="••••••••••"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#72b01d] focus:bg-white focus:ring-2 focus:ring-[#72b01d]/20"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="mb-1.5 block text-xs font-semibold text-slate-600">
              Repetir nueva contraseña
            </label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={MIN_PASSWORD_LENGTH}
              placeholder="••••••••••"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#72b01d] focus:bg-white focus:ring-2 focus:ring-[#72b01d]/20"
            />
            <p className="mt-1.5 text-xs text-slate-400">Mínimo {MIN_PASSWORD_LENGTH} caracteres.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#72b01d] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#65a015] disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                </svg>
                Actualizando…
              </span>
            ) : (
              'Actualizar contraseña'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
