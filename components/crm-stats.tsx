'use client'

import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { LeadRow } from '@/lib/db/schema'
import { TIPOS_INMUEBLE } from '@/lib/casa-facil-data'
import { normalizeMunicipality } from '@/lib/valencia-municipalities'

const STATUS_LABELS: Record<string, string> = { cold: 'Frío', warm: 'Templado', hot: 'Caliente' }
const STATUS_ORDER_STATS = ['cold', 'warm', 'hot']
const STATUS_BAR_COLOR: Record<string, string> = {
  cold: 'from-slate-300 to-slate-400',
  warm: 'from-amber-300 to-amber-500',
  hot: 'from-[#f29999] to-[#e62020]',
}

type RangeOption = 'year' | '6m' | '12m' | 'all'

const RANGE_LABELS: Record<RangeOption, string> = {
  year: 'Año actual',
  '6m': 'Últimos 6 meses',
  '12m': 'Últimos 12 meses',
  all: 'Todo el histórico',
}

const MONTH_LABELS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

function monthKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function enumerateMonths(start: Date, end: Date): Date[] {
  const out: Date[] = []
  const cur = new Date(start.getFullYear(), start.getMonth(), 1)
  const last = new Date(end.getFullYear(), end.getMonth(), 1)
  while (cur <= last) {
    out.push(new Date(cur))
    cur.setMonth(cur.getMonth() + 1)
  }
  return out
}

function monthRangeWindow(range: RangeOption, leads: LeadRow[], now: Date): Date[] {
  if (range === 'year') return enumerateMonths(new Date(now.getFullYear(), 0, 1), now)
  if (range === '6m') return enumerateMonths(new Date(now.getFullYear(), now.getMonth() - 5, 1), now)
  if (range === '12m') return enumerateMonths(new Date(now.getFullYear(), now.getMonth() - 11, 1), now)
  if (!leads.length) return []
  const earliest = leads.reduce(
    (min, l) => Math.min(min, new Date(l.createdAt).getTime()),
    Date.now(),
  )
  return enumerateMonths(new Date(earliest), now)
}

export function CrmStats({ leads }: { leads: LeadRow[] }) {
  const [range, setRange] = useState<RangeOption>('12m')
  const [localitySearch, setLocalitySearch] = useState('')

  const monthData = useMemo(() => {
    const now = new Date()
    const months = monthRangeWindow(range, leads, now)
    const counts = leads.reduce<Record<string, number>>((acc, l) => {
      const key = monthKey(new Date(l.createdAt))
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})
    return months.map((d) => ({
      key: monthKey(d),
      label: `${MONTH_LABELS[d.getMonth()]} ${d.getFullYear()}`,
      count: counts[monthKey(d)] ?? 0,
    }))
  }, [leads, range])

  const maxMonthCount = Math.max(1, ...monthData.map((m) => m.count))
  const bestMonth = monthData.length
    ? monthData.reduce((best, m) => (m.count > best.count ? m : best), monthData[0])
    : null

  const localityData = useMemo(() => {
    const counts = leads.reduce<
      Record<string, { municipio: string; provincia: string; count: number; pending: boolean }>
    >((acc, l) => {
      const match = normalizeMunicipality(l.municipio)
      const municipio = match?.officialName ?? l.municipio
      const provincia = match?.province ?? l.provincia
      const key = `${municipio}__${provincia}`
      if (!acc[key]) acc[key] = { municipio, provincia, count: 0, pending: !match }
      acc[key].count++
      return acc
    }, {})
    const total = leads.length || 1
    return Object.values(counts)
      .map((c) => ({ ...c, pct: Math.round((c.count / total) * 1000) / 10 }))
      .sort((a, b) => b.count - a.count)
      .filter((c) => c.municipio.toLowerCase().includes(localitySearch.trim().toLowerCase()))
  }, [leads, localitySearch])

  const tipoData = useMemo(() => {
    const counts = leads.reduce<Record<string, number>>((acc, l) => {
      acc[l.tipo] = (acc[l.tipo] || 0) + 1
      return acc
    }, {})
    const total = leads.length || 1
    const allTipos = new Set<string>([...TIPOS_INMUEBLE, ...Object.keys(counts)])
    return Array.from(allTipos)
      .map((tipo) => ({
        tipo,
        count: counts[tipo] ?? 0,
        pct: Math.round(((counts[tipo] ?? 0) / total) * 1000) / 10,
      }))
      .sort((a, b) => b.count - a.count)
  }, [leads])

  const maxTipoCount = Math.max(1, ...tipoData.map((t) => t.count))

  const statusData = useMemo(() => {
    const counts = leads.reduce<Record<string, number>>((acc, l) => {
      const key = STATUS_ORDER_STATS.includes(l.status) ? l.status : 'cold'
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})
    const total = leads.length || 1
    return STATUS_ORDER_STATS.map((status) => ({
      status,
      label: STATUS_LABELS[status],
      count: counts[status] ?? 0,
      pct: Math.round(((counts[status] ?? 0) / total) * 1000) / 10,
    }))
  }, [leads])

  const maxStatusCount = Math.max(1, ...statusData.map((s) => s.count))

  return (
    <div className="flex flex-col gap-8">
      {/* ── Por estado del lead ──────────────────────────────────────────── */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-base font-bold text-slate-800">Leads por estado</h2>
        <div className="flex flex-col gap-3">
          {statusData.map((s) => (
            <div key={s.status} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-sm text-slate-600">{s.label}</span>
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${STATUS_BAR_COLOR[s.status]}`}
                  style={{ width: `${(s.count / maxStatusCount) * 100}%` }}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-sm font-semibold text-slate-800 tabular-nums">{s.count}</span>
              <span className="w-12 shrink-0 text-right text-xs text-slate-400 tabular-nums">{s.pct}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Por mes ──────────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-800">Leads por mes</h2>
            {bestMonth && (
              <p className="mt-0.5 text-xs text-slate-400">
                Mes con más leads: <span className="font-semibold text-[#5c8f16]">{bestMonth.label}</span> ({bestMonth.count})
              </p>
            )}
          </div>
          <div className="inline-flex flex-wrap gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
            {(Object.keys(RANGE_LABELS) as RangeOption[]).map((opt) => (
              <button
                key={opt}
                onClick={() => setRange(opt)}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  range === opt ? 'bg-white text-[#5c8f16] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {RANGE_LABELS[opt]}
              </button>
            ))}
          </div>
        </div>

        {monthData.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">No hay leads en este rango.</p>
        ) : (
          <>
            <div className="overflow-x-auto pb-2">
              <div className="flex min-w-fit items-end gap-3" style={{ height: '160px' }}>
                {monthData.map((m) => (
                  <div key={m.key} className="flex w-12 shrink-0 flex-col items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-600">{m.count}</span>
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-[#72b01d] to-[#9bc954]"
                      style={{ height: `${Math.max(4, (m.count / maxMonthCount) * 110)}px` }}
                    />
                    <span className="whitespace-nowrap text-[10px] text-slate-400">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 max-h-56 overflow-y-auto rounded-lg border border-slate-100">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-3 py-2">Mes</th>
                    <th className="px-3 py-2 text-right">Leads</th>
                  </tr>
                </thead>
                <tbody>
                  {[...monthData].reverse().map((m) => (
                    <tr key={m.key} className="border-t border-slate-100">
                      <td className="px-3 py-2 text-slate-600">{m.label}</td>
                      <td className="px-3 py-2 text-right font-semibold text-slate-800 tabular-nums">{m.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      {/* ── Por localidad ────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-bold text-slate-800">
            Leads por localidad <span className="text-sm font-normal text-slate-400">({localityData.length} en total)</span>
          </h2>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
            <input
              value={localitySearch}
              onChange={(e) => setLocalitySearch(e.target.value)}
              placeholder="Buscar localidad…"
              className="w-56 rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-sm outline-none focus:border-[#72b01d] focus:ring-2 focus:ring-[#72b01d]/20"
            />
          </div>
        </div>
        {localityData.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">Sin resultados.</p>
        ) : (
          <div className="max-h-80 overflow-y-auto rounded-lg border border-slate-100">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-3 py-2">Localidad</th>
                  <th className="px-3 py-2">Provincia</th>
                  <th className="px-3 py-2 text-right">Leads</th>
                  <th className="px-3 py-2 text-right">%</th>
                </tr>
              </thead>
              <tbody>
                {localityData.map((l) => (
                  <tr key={`${l.municipio}-${l.provincia}`} className="border-t border-slate-100">
                    <td className="px-3 py-2 font-medium text-slate-700">
                      {l.municipio}
                      {l.pending && (
                        <span className="ml-2 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                          Localidad pendiente de revisar
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-slate-500">{l.provincia}</td>
                    <td className="px-3 py-2 text-right font-semibold text-slate-800 tabular-nums">{l.count}</td>
                    <td className="px-3 py-2 text-right text-slate-400 tabular-nums">{l.pct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ── Por tipo de inmueble ─────────────────────────────────────────── */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-base font-bold text-slate-800">Leads por tipo de inmueble</h2>
        <div className="flex flex-col gap-3">
          {tipoData.map((t) => (
            <div key={t.tipo} className="flex items-center gap-3">
              <span className="w-32 shrink-0 truncate text-sm text-slate-600">{t.tipo}</span>
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#9bc954] to-[#5c8f16]"
                  style={{ width: `${(t.count / maxTipoCount) * 100}%` }}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-sm font-semibold text-slate-800 tabular-nums">{t.count}</span>
              <span className="w-12 shrink-0 text-right text-xs text-slate-400 tabular-nums">{t.pct}%</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
