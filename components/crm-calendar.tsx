'use client'

import { ChevronLeft, ChevronRight, Mail, MapPin, MessageCircle, Phone, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { FollowUpRow } from './crm-followups'

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

const WEEKDAY_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

type EventStatus = 'pending' | 'overdue' | 'completed'

const STATUS_DOT: Record<EventStatus, string> = {
  pending: 'bg-amber-400',
  overdue: 'bg-[#e62020]',
  completed: 'bg-slate-400',
}
const STATUS_PILL: Record<EventStatus, string> = {
  pending: 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100',
  overdue: 'bg-[#fdeaea] text-[#c41616] border border-[#e62020]/20 hover:bg-[#fbdcdc]',
  completed: 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200',
}

function eventStatus(f: FollowUpRow, now: Date): EventStatus {
  if (f.status === 'completed') return 'completed'
  return new Date(f.scheduledAt) < now ? 'overdue' : 'pending'
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}
function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}
function formatTime(d: Date | string): string {
  return new Date(d).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
}
function monthTitle(d: Date): string {
  const s = d.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function CrmCalendar({
  followUps,
  onOpenFollowUp,
}: {
  followUps: FollowUpRow[]
  onOpenFollowUp: (followUp: FollowUpRow) => void
}) {
  const [monthCursor, setMonthCursor] = useState(() => startOfMonth(new Date()))
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const now = new Date()

  const cells = useMemo(() => {
    const year = monthCursor.getFullYear()
    const month = monthCursor.getMonth()
    const first = new Date(year, month, 1)
    const leading = (first.getDay() + 6) % 7 // Monday = 0
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate()
    const totalCells = Math.ceil((leading + totalDaysInMonth) / 7) * 7

    return Array.from({ length: totalCells }, (_, i) => {
      const date = new Date(year, month, i - leading + 1)
      return { date, inMonth: date.getMonth() === month }
    })
  }, [monthCursor])

  const eventsByDay = useMemo(() => {
    const map = new Map<string, FollowUpRow[]>()
    for (const f of followUps) {
      const d = new Date(f.scheduledAt)
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(f)
    }
    for (const list of map.values()) {
      list.sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    }
    return map
  }, [followUps])

  function eventsFor(date: Date): FollowUpRow[] {
    return eventsByDay.get(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`) ?? []
  }

  const selectedDayEvents = selectedDay ? eventsFor(selectedDay) : []

  return (
    <div className="flex flex-col gap-4">
      {/* Month nav */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-800">{monthTitle(monthCursor)}</h2>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setMonthCursor((d) => new Date(d.getFullYear(), d.getMonth(), 1))}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
          >
            Hoy
          </button>
          <button
            onClick={() => setMonthCursor((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
            aria-label="Mes anterior"
            className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={() => setMonthCursor((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
            aria-label="Mes siguiente"
            className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Weekday header */}
      <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-semibold text-slate-400">
        {WEEKDAY_LABELS.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map(({ date, inMonth }, i) => {
          const events = eventsFor(date)
          const isToday = isSameDay(date, now)
          const isSelected = selectedDay && isSameDay(date, selectedDay)
          const visible = events.slice(0, 3)
          const overflow = events.length - visible.length

          return (
            <button
              key={i}
              onClick={() => setSelectedDay(date)}
              className={`flex min-h-[5.5rem] flex-col items-stretch gap-1 rounded-xl border p-1.5 text-left transition-colors sm:min-h-[6.5rem] ${
                isSelected ? 'border-[#72b01d] bg-[#f0f7e4]' : 'border-slate-100 bg-white hover:bg-slate-50'
              } ${!inMonth ? 'opacity-40' : ''}`}
            >
              <span
                className={`flex size-6 shrink-0 items-center justify-center self-start rounded-full text-xs font-semibold ${
                  isToday ? 'bg-[#72b01d] text-white' : 'text-slate-500'
                }`}
              >
                {date.getDate()}
              </span>

              {/* Desktop: compact pills */}
              <div className="hidden flex-col gap-1 sm:flex">
                {visible.map((f) => {
                  const status = eventStatus(f, now)
                  return (
                    <span
                      key={f.id}
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpenFollowUp(f)
                      }}
                      className={`truncate rounded-md px-1.5 py-0.5 text-[11px] font-medium transition-colors ${STATUS_PILL[status]}`}
                      title={`${formatTime(f.scheduledAt)} · ${f.leadNombre}`}
                    >
                      {formatTime(f.scheduledAt)} · {f.leadNombre}
                    </span>
                  )
                })}
                {overflow > 0 && (
                  <span className="px-1.5 text-[11px] font-semibold text-slate-400">+{overflow} más</span>
                )}
              </div>

              {/* Mobile: dots only */}
              <div className="flex flex-wrap gap-1 sm:hidden">
                {events.slice(0, 6).map((f) => (
                  <span key={f.id} className={`size-1.5 rounded-full ${STATUS_DOT[eventStatus(f, now)]}`} />
                ))}
              </div>
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-amber-400" /> Pendiente</span>
        <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#e62020]" /> Vencido</span>
        <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-slate-400" /> Completado</span>
      </div>

      {/* Day agenda panel */}
      {selectedDay && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">
              {selectedDay.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h3>
            <button
              onClick={() => setSelectedDay(null)}
              aria-label="Cerrar agenda del día"
              className="flex size-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="size-4" />
            </button>
          </div>
          {selectedDayEvents.length === 0 ? (
            <p className="text-sm text-slate-400">No hay seguimientos programados este día.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {selectedDayEvents.map((f) => {
                const status = eventStatus(f, now)
                const Icon = TYPE_ICON[f.type] ?? Phone
                return (
                  <button
                    key={f.id}
                    onClick={() => onOpenFollowUp(f)}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition-colors hover:bg-slate-50"
                  >
                    <span className={`flex size-8 shrink-0 items-center justify-center rounded-full ${STATUS_PILL[status]}`}>
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">{f.leadNombre}</p>
                      <p className="truncate text-xs text-slate-500">
                        {TYPE_LABEL[f.type] ?? f.type} · {formatTime(f.scheduledAt)}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
