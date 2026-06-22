'use client'

import {
  Building2,
  CalendarClock,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  StickyNote,
  Thermometer,
  X,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'
import useSWR from 'swr'
import type { LeadRow } from '@/lib/db/schema'
import { Field, OptionGrid, TextArea } from './form-controls'
import { useToast } from './toast'

type ActivityRow = {
  id: number
  leadId: number
  type: string
  createdAt: string | Date
  notes: string | null
  nextNotes: string | null
  metadata: unknown
}

const TYPE_ICON: Record<string, typeof Phone> = {
  call: Phone,
  whatsapp: MessageCircle,
  email: Mail,
  visit: MapPin,
  note: StickyNote,
  status_change: Thermometer,
  follow_up_scheduled: CalendarClock,
  follow_up_completed: CheckCircle2,
  captured: CheckCircle2,
  lost: XCircle,
}
const TYPE_LABEL: Record<string, string> = {
  call: 'Llamada',
  whatsapp: 'WhatsApp',
  email: 'Email',
  visit: 'Visita',
  note: 'Nota interna',
  status_change: 'Cambio de estado',
  follow_up_scheduled: 'Seguimiento programado',
  follow_up_completed: 'Seguimiento completado',
  captured: 'Lead captado',
  lost: 'Lead perdido',
}
const TYPE_TONE: Record<string, string> = {
  captured: 'bg-[#f0f7e4] text-[#5c8f16]',
  lost: 'bg-slate-100 text-slate-500',
  follow_up_completed: 'bg-[#f0f7e4] text-[#5c8f16]',
}

const MANUAL_TYPE_OPTIONS = ['Llamada', 'WhatsApp', 'Email', 'Visita', 'Nota interna'] as const
const MANUAL_TYPE_VALUE: Record<string, string> = {
  Llamada: 'call',
  WhatsApp: 'whatsapp',
  Email: 'email',
  Visita: 'visit',
  'Nota interna': 'note',
}

const STAGE_LABEL: Record<string, string> = {
  pending: 'Pendiente',
  in_follow_up: 'En seguimiento',
  captured: 'Captado',
  lost: 'Perdido',
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function formatDateTime(d: Date | string): string {
  return new Date(d).toLocaleString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function LeadDetailModal({ lead, onClose }: { lead: LeadRow; onClose: () => void }) {
  const { notify } = useToast()
  const { data, mutate } = useSWR<{ activities: ActivityRow[] }>(
    `/api/leads/activities?leadId=${lead.id}`,
    fetcher,
  )
  const activities = data?.activities ?? []

  const [showForm, setShowForm] = useState(false)
  const [type, setType] = useState<string>('Llamada')
  const [notes, setNotes] = useState('')
  const [nextNotes, setNextNotes] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleAddActivity() {
    setSaving(true)
    try {
      const res = await fetch('/api/leads/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          type: MANUAL_TYPE_VALUE[type],
          notes,
          nextNotes,
        }),
      })
      if (!res.ok) throw new Error()
      setNotes('')
      setNextNotes('')
      setShowForm(false)
      mutate()
      notify({ tone: 'success', title: 'Actividad añadida', description: 'Se ha guardado en el historial.' })
    } catch {
      notify({ tone: 'error', title: 'No se pudo guardar', description: 'Inténtalo de nuevo.' })
    } finally {
      setSaving(false)
    }
  }

  const pipelineStage = lead.pipelineStatus in STAGE_LABEL ? lead.pipelineStatus : 'pending'

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="animate-fade-up relative flex max-h-[85vh] w-full max-w-2xl flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">{lead.nombre}</h2>
            <p className="text-xs text-slate-400">{lead.email} · {lead.telefono}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3 border-b border-slate-100 bg-slate-50/60 px-6 py-4 sm:grid-cols-4">
          <SummaryItem label="Localidad" value={`${lead.municipio} (${lead.provincia})`} icon={<MapPin className="size-3.5" />} />
          <SummaryItem label="Inmueble" value={`${lead.tipo} · ${lead.metros} m²`} icon={<Building2 className="size-3.5" />} />
          <SummaryItem label="Fase" value={STAGE_LABEL[pipelineStage]} icon={<CheckCircle2 className="size-3.5" />} />
          <SummaryItem label="Interacciones" value={String(activities.length)} icon={<StickyNote className="size-3.5" />} />
        </div>

        {/* Body: history + add activity */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Historial de actividad</h3>
            <button
              onClick={() => setShowForm((s) => !s)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#72b01d] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#65a015]"
            >
              <Plus className="size-3.5" />
              Añadir actividad
            </button>
          </div>

          {showForm && (
            <div className="mb-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <Field label="Tipo de acción">
                <OptionGrid value={type} onChange={setType} options={MANUAL_TYPE_OPTIONS} columns={3} />
              </Field>
              <Field label="Notas">
                <TextArea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Cómo fue la interacción…"
                />
              </Field>
              <Field label="Notas para la próxima vez (opcional)">
                <TextArea
                  rows={2}
                  value={nextNotes}
                  onChange={(e) => setNextNotes(e.target.value)}
                  placeholder="Qué recordar para el próximo contacto…"
                />
              </Field>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddActivity}
                  disabled={saving || !notes.trim()}
                  className="rounded-lg bg-[#72b01d] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#65a015] disabled:opacity-60"
                >
                  {saving ? 'Guardando…' : 'Guardar actividad'}
                </button>
              </div>
            </div>
          )}

          {activities.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">Todavía no hay actividad registrada para este lead.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {activities.map((a) => {
                const Icon = TYPE_ICON[a.type] ?? StickyNote
                const tone = TYPE_TONE[a.type] ?? 'bg-slate-100 text-slate-500'
                return (
                  <div key={a.id} className="flex gap-3 rounded-xl border border-slate-100 bg-white p-3.5">
                    <span className={`flex size-8 shrink-0 items-center justify-center rounded-full ${tone}`}>
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-slate-800">{TYPE_LABEL[a.type] ?? a.type}</span>
                        <span className="text-xs text-slate-400">{formatDateTime(a.createdAt)}</span>
                      </div>
                      {a.notes && <p className="mt-1 text-sm leading-relaxed text-slate-600">{a.notes}</p>}
                      {a.nextNotes && (
                        <p className="mt-1.5 rounded-md bg-amber-50 px-2.5 py-1.5 text-xs text-amber-700">
                          Próxima vez: {a.nextNotes}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SummaryItem({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs text-slate-400">{label}</p>
        <p className="truncate text-sm font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  )
}
