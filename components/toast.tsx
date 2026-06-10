'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, Info, Phone, X, AlertCircle } from 'lucide-react'

type ToastTone = 'success' | 'info' | 'call' | 'error'

type Toast = {
  id: number
  title: string
  description?: string
  tone: ToastTone
}

type ToastContextValue = {
  notify: (t: Omit<Toast, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

const toneStyles: Record<
  ToastTone,
  { bar: string; icon: React.ReactNode; ring: string }
> = {
  success: {
    bar: 'bg-[#72b01d]',
    ring: 'ring-[#72b01d]/20',
    icon: <CheckCircle2 className="size-5 text-[#72b01d]" />,
  },
  info: {
    bar: 'bg-slate-400',
    ring: 'ring-slate-200',
    icon: <Info className="size-5 text-slate-500" />,
  },
  call: {
    bar: 'bg-[#e62020]',
    ring: 'ring-[#e62020]/20',
    icon: <Phone className="size-5 text-[#e62020]" />,
  },
  error: {
    bar: 'bg-[#e62020]',
    ring: 'ring-[#e62020]/20',
    icon: <AlertCircle className="size-5 text-[#e62020]" />,
  },
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const notify = useCallback(
    (t: Omit<Toast, 'id'>) => {
      const id = Date.now() + Math.random()
      setToasts((prev) => [...prev, { ...t, id }])
      setTimeout(() => remove(id), 4200)
    },
    [remove],
  )

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="pointer-events-none fixed inset-x-4 top-4 z-[100] flex flex-col items-center gap-3 sm:inset-x-auto sm:right-6 sm:items-end">
        {toasts.map((t) => {
          const style = toneStyles[t.tone]
          return (
            <div
              key={t.id}
              className={`animate-toast-in pointer-events-auto flex w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-lg ring-1 ${style.ring}`}
              role="status"
            >
              <div className={`w-1.5 shrink-0 ${style.bar}`} />
              <div className="flex flex-1 items-start gap-3 p-4">
                <div className="mt-0.5 shrink-0">{style.icon}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    {t.title}
                  </p>
                  {t.description && (
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-500">
                      {t.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => remove(t.id)}
                  className="shrink-0 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Cerrar notificación"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
