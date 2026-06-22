'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, X, XCircle } from 'lucide-react'
import { TextArea } from './form-controls'

type Stage = 'captured' | 'lost'

const STAGE_COPY: Record<Stage, { title: string; question: string; confirmLabel: string; confirmClass: string; icon: typeof CheckCircle2; iconBg: string; iconColor: string }> = {
  captured: {
    title: 'Marcar como captado',
    question: '¿Seguro que quieres marcar este lead como captado?',
    confirmLabel: 'Sí, marcar como captado',
    confirmClass: 'bg-[#72b01d] hover:bg-[#65a015]',
    icon: CheckCircle2,
    iconBg: 'bg-[#f0f7e4]',
    iconColor: 'text-[#5c8f16]',
  },
  lost: {
    title: 'Marcar como perdido',
    question: '¿Seguro que quieres marcar este lead como perdido?',
    confirmLabel: 'Sí, marcar como perdido',
    confirmClass: 'bg-slate-600 hover:bg-slate-700',
    icon: XCircle,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-500',
  },
}

export function ConfirmStageModal({
  leadNombre,
  targetStage,
  onClose,
  onConfirm,
}: {
  leadNombre: string
  targetStage: Stage
  onClose: () => void
  onConfirm: (note: string) => Promise<void>
}) {
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const copy = STAGE_COPY[targetStage]
  const Icon = copy.icon

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  async function handleConfirm() {
    setLoading(true)
    try {
      await onConfirm(note)
      onClose()
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
          <span className={`flex size-12 items-center justify-center rounded-full ${copy.iconBg}`}>
            <Icon className={`size-5 ${copy.iconColor}`} />
          </span>
          <h2 className="text-xl font-bold tracking-tight text-slate-800">{copy.title}</h2>
          <p className="text-sm text-slate-500">{copy.question}</p>
          <p className="text-sm font-semibold text-slate-700">{leadNombre}</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">Nota (opcional)</label>
            <TextArea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ej: Cliente acepta trabajar con Casa Fácil. Próximo paso: visita del inmueble."
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={loading}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-60 ${copy.confirmClass}`}
            >
              {loading ? 'Guardando…' : copy.confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
