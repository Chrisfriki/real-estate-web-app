'use client'

import { CalendarX2, CheckCircle2, Clock4, Mail, MapPin, MessageCircle, Phone, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { LeadRow } from '@/lib/db/schema'

export type FollowUpRow = {
  id: number
  leadId: number
  scheduledAt: string | Date
  type: string
  status: string
  note: string | null
  completedAt: string | Date | null
  resultNote: string | null
  createdAt: string | Date
  leadNombre: string
  leadTelefono: string
  leadMunicipio: string
  leadProvincia: string
}

const TYPE_ICON: Record<string, typeof Phone> = {
  call: Phone,
  whatsapp: MessageCircle,
  email: Mail,
  visit: MapPin,
}
const TYPE_LABEL: Record<string, string> = {
  call: 'Llamada',
  whatsapp: 'WhatsApp',
  email: 'Email',
  visit: 'Visita',
}

function startOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}
function endOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(23, 59, 59, 999)
  return x
}

function formatTime(d: Date | string): string {
  return new Date(d).toLocaleString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

export function CrmFollowUps({
  leads,
  followUps,
  onComplete,
  onViewLead,
}: {
  leads: LeadRow[]
  followUps: FollowUpRow[]
  onComplete: (id: number, resultNote: string) => Promise<void>
  onViewLead: (leadId: number) => void
}) {
  const now = new Date()
  const todayStart = startOfDay(now)
  const todayEnd = endOfDay(now)
  const weekEnd = endOfDay(new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000))

  const pending = useMemo(() => followUps.filter((f) => f.status === 'pending'), [followUps])

  const overdue = pending.filter((f) => new Date(f.scheduledAt) < todayStart)
  const today = pending.filter((f) => {
    const d = new Date(f.scheduledAt)
    return d >= todayStart && d <= todayEnd
  })
  const next7days = pending.filter((f) => {
    const d = new Date(f.scheduledAt)
    return d > todayEnd && d <= weekEnd
  })
  const leadIdsWithFollowUp = new Set(followUps.map((f) => f.leadId))
  const withoutFollowUp = leads.filter((l) => !leadIdsWithFollowUp.has(l.id))

  return (
    <div className="flex flex-col gap-8">
      <FollowUpSection
        title="Vencidos"
        icon={<CalendarX2 className="size-4 text-[#c41616]" />}
        accent="border-[#e62020]/20 bg-[#fdeaea]"
        items={overdue}
        onComplete={onComplete}
        onViewLead={onViewLead}
        emptyText="No tienes seguimientos vencidos."
      />
      <FollowUpSection
        title="Hoy"
        icon={<Clock4 className="size-4 text-[#5c8f16]" />}
        accent="border-[#72b01d]/25 bg-[#f0f7e4]"
        items={today}
        onComplete={onComplete}
        onViewLead={onViewLead}
        emptyText="No tienes seguimientos programados para hoy."
      />
      <FollowUpSection
        title="Próximos 7 días"
        icon={<Sparkles className="size-4 text-amber-600" />}
        accent="border-amber-200 bg-amber-50"
        items={next7days}
        onComplete={onComplete}
        onViewLead={onViewLead}
        emptyText="No hay seguimientos programados esta semana."
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-1 text-base font-bold text-slate-800">Sin seguimiento programado</h2>
        <p className="mb-4 text-xs text-slate-400">
          Leads que todavía no tienen ninguna llamada, WhatsApp, email o visita programada.
        </p>
        {withoutFollowUp.length === 0 ? (
          <p className="text-sm text-slate-400">Todos los leads tienen algún seguimiento programado.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {withoutFollowUp.map((l) => (
              <div
                key={l.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3.5 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-700">{l.nombre}</p>
                  <p className="truncate text-xs text-slate-400">{l.municipio} · {l.telefono}</p>
                </div>
                <button
                  onClick={() => onViewLead(l.id)}
                  className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100"
                >
                  Ver lead
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function FollowUpSection({
  title,
  icon,
  accent,
  items,
  onComplete,
  onViewLead,
  emptyText,
}: {
  title: string
  icon: React.ReactNode
  accent: string
  items: FollowUpRow[]
  onComplete: (id: number, resultNote: string) => Promise<void>
  onViewLead: (leadId: number) => void
  emptyText: string
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-base font-bold text-slate-800">{title}</h2>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
          {items.length}
        </span>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-slate-400">{emptyText}</p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((f) => (
            <FollowUpRowItem key={f.id} followUp={f} accent={accent} onComplete={onComplete} onViewLead={onViewLead} />
          ))}
        </div>
      )}
    </section>
  )
}

function FollowUpRowItem({
  followUp,
  accent,
  onComplete,
  onViewLead,
}: {
  followUp: FollowUpRow
  accent: string
  onComplete: (id: number, resultNote: string) => Promise<void>
  onViewLead: (leadId: number) => void
}) {
  const [completing, setCompleting] = useState(false)
  const [resultNote, setResultNote] = useState('')
  const [saving, setSaving] = useState(false)
  const Icon = TYPE_ICON[followUp.type] ?? Phone

  async function handleSave() {
    setSaving(true)
    try {
      await onComplete(followUp.id, resultNote)
      setCompleting(false)
      setResultNote('')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={`rounded-xl border p-3.5 ${accent}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
            <Icon className="size-4 text-slate-600" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">{followUp.leadNombre}</p>
            <p className="truncate text-xs text-slate-500">
              {TYPE_LABEL[followUp.type] ?? followUp.type} · {formatTime(followUp.scheduledAt)} · {followUp.leadMunicipio}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => onViewLead(followUp.leadId)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
          >
            Ver lead
          </button>
          <button
            onClick={() => setCompleting((c) => !c)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#72b01d] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#65a015]"
          >
            <CheckCircle2 className="size-3.5" />
            Marcar completado
          </button>
        </div>
      </div>
      {followUp.note && (
        <p className="mt-2 rounded-md bg-white/70 px-2.5 py-1.5 text-xs italic text-slate-500">
          &ldquo;{followUp.note}&rdquo;
        </p>
      )}
      {completing && (
        <div className="mt-3 flex flex-col gap-2 rounded-lg bg-white p-3">
          <label className="text-xs font-semibold text-slate-600">¿Cómo fue el seguimiento?</label>
          <textarea
            value={resultNote}
            onChange={(e) => setResultNote(e.target.value)}
            rows={2}
            placeholder="Ej: Cliente sigue interesado, llamar de nuevo en 2 semanas."
            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#72b01d] focus:ring-2 focus:ring-[#72b01d]/20"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setCompleting(false)}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-[#72b01d] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#65a015] disabled:opacity-60"
            >
              {saving ? 'Guardando…' : 'Guardar'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
