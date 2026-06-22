'use client'

import { useEffect, useState } from 'react'
import { CalendarClock, X } from 'lucide-react'
import { Field, OptionGrid, TextArea, TextInput } from './form-controls'
import { useToast } from './toast'

const TYPE_OPTIONS = ['Llamada', 'WhatsApp', 'Email', 'Visita'] as const
const TYPE_VALUE: Record<string, string> = {
  Llamada: 'call',
  WhatsApp: 'whatsapp',
  Email: 'email',
  Visita: 'visit',
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export function ScheduleFollowUpModal({
  leadId,
  leadNombre,
  onClose,
  onScheduled,
}: {
  leadId: number
  leadNombre: string
  onClose: () => void
  onScheduled: () => void
}) {
  const { notify } = useToast()
  const [date, setDate] = useState(todayIso())
  const [time, setTime] = useState('10:00')
  const [type, setType] = useState<string>('Llamada')
  const [note, setNote] = useState('')
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
    if (!date || !time) {
      notify({ tone: 'error', title: 'Falta la fecha u hora', description: 'Completa fecha y hora del seguimiento.' })
      return
    }

    setLoading(true)
    try {
      const scheduledAt = new Date(`${date}T${time}:00`).toISOString()
      const res = await fetch('/api/leads/follow-ups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, scheduledAt, type: TYPE_VALUE[type], note }),
      })
      if (!res.ok) throw new Error()
      notify({
        tone: 'success',
        title: 'Seguimiento programado',
        description: `${type} con ${leadNombre} el ${date} a las ${time}.`,
      })
      onScheduled()
      onClose()
    } catch {
      notify({
        tone: 'error',
        title: 'No se pudo programar',
        description: 'Inténtalo de nuevo.',
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
          <span className="flex size-12 items-center justify-center rounded-full bg-[#f0f7e4]">
            <CalendarClock className="size-5 text-[#5c8f16]" />
          </span>
          <h2 className="text-xl font-bold tracking-tight text-slate-800">
            Programar seguimiento
          </h2>
          <p className="text-sm text-slate-500">{leadNombre}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Fecha">
              <TextInput type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </Field>
            <Field label="Hora">
              <TextInput type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </Field>
          </div>
          <Field label="Tipo de seguimiento">
            <OptionGrid value={type} onChange={setType} options={TYPE_OPTIONS} columns={2} />
          </Field>
          <Field label="Nota (opcional)">
            <TextArea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ej: Preguntar si ha podido revisar la valoración enviada."
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#72b01d] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#65a015] disabled:opacity-60"
          >
            {loading ? 'Programando…' : 'Programar seguimiento'}
          </button>
        </form>
      </div>
    </div>
  )
}
