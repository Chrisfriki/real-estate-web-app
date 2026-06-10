'use client'

import {
  ArrowDownUp,
  Bath,
  BedDouble,
  Building2,
  CalendarClock,
  Car,
  Clock,
  Compass,
  Download,
  FileText,
  Inbox,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Ruler,
  Search,
  Snowflake,
  Sparkles,
  Trash2,
  TrendingUp,
  Trees,
  UserRound,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import useSWR from 'swr'
import type { LeadRow } from '@/lib/db/schema'
import { useToast } from './toast'

// ─── Types ──────────────────────────────────────────────────────────────────

const plazoStyle: Record<string, string> = {
  Inmediato: 'bg-[#fdeaea] text-[#c41616]',
  '3-6 meses': 'bg-[#f0f7e4] text-[#5c8f16]',
  '6-12 meses': 'bg-amber-50 text-amber-700',
  'Solo curiosidad': 'bg-slate-100 text-slate-500',
}

function getAdvice(lead: LeadRow): { tone: 'hot' | 'warm' | 'cool'; text: string } {
  if (lead.plazo === 'Inmediato') {
    return {
      tone: 'hot',
      text: `Lead CALIENTE: quiere vender de inmediato. Prioriza la llamada hoy mismo y propón visita en 24-48h. ${
        lead.estado === 'Para reformar'
          ? 'Inmueble para reformar: posiciona precio realista y destaca el potencial de la zona.'
          : 'Inmueble en buen estado: puedes defender precio de mercado alto.'
      }`,
    }
  }
  if (lead.plazo === '3-6 meses' || lead.plazo === '6-12 meses') {
    return {
      tone: 'warm',
      text: `Lead templado (${lead.plazo}). Cultiva la relación con el informe de mercado y un seguimiento mensual. ${
        lead.estado === 'A estrenar' || lead.estado === 'Reformado'
          ? 'Inmueble listo para entrar: ideal para captar en exclusiva con buenas fotos.'
          : 'Sugiere mejoras de bajo coste que aumenten el valor antes de publicar.'
      }`,
    }
  }
  return {
    tone: 'cool',
    text: 'Lead frío (solo curiosidad). Envía el informe de valor y nútrelo con datos de la zona. No presiones la venta; gánate la confianza para cuando decida dar el paso.',
  }
}

function formatDate(d: Date | string): string {
  return new Date(d).toLocaleString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// ─── Fetcher ────────────────────────────────────────────────────────────────

const fetcher = (url: string) => fetch(url).then((r) => r.json())

// ─── Main component ─────────────────────────────────────────────────────────

export function CrmDashboard() {
  const { notify } = useToast()
  const [query, setQuery] = useState('')
  const [order, setOrder] = useState<'recent' | 'urgent'>('recent')

  const { data, error, isLoading, mutate } = useSWR<{ leads: LeadRow[] }>(
    '/api/leads/list',
    fetcher,
    { refreshInterval: 30000 },
  )

  const leads = data?.leads ?? []

  const filtered = useMemo(() => {
    const urgencyRank: Record<string, number> = {
      Inmediato: 0,
      '3-6 meses': 1,
      '6-12 meses': 2,
      'Solo curiosidad': 3,
    }
    const q = query.trim().toLowerCase()
    return [...leads]
      .filter(
        (l) =>
          !q ||
          l.nombre.toLowerCase().includes(q) ||
          l.municipio.toLowerCase().includes(q) ||
          l.direccion.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q),
      )
      .sort((a, b) =>
        order === 'recent'
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : urgencyRank[a.plazo] - urgencyRank[b.plazo] ||
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
  }, [leads, query, order])

  // Stats
  const hotCount = leads.filter((l) => l.plazo === 'Inmediato').length
  const warmCount = leads.filter((l) => l.plazo === '3-6 meses' || l.plazo === '6-12 meses').length
  const docCount = leads.filter((l) => l.catastralDocPathname).length
  const last24h = leads.filter(
    (l) => Date.now() - new Date(l.createdAt).getTime() < 1000 * 60 * 60 * 24,
  ).length

  async function handleCall(lead: LeadRow) {
    notify({
      tone: 'call',
      title: `Llamando a ${lead.nombre.split(' ')[0]}…`,
      description: `Marcando ${lead.telefono} · ${lead.municipio}`,
    })
  }

  async function handleDelete(lead: LeadRow) {
    try {
      const res = await fetch('/api/leads/list', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: lead.id }),
      })
      if (!res.ok) throw new Error()
      mutate()
      notify({
        tone: 'info',
        title: 'Lead eliminado',
        description: `${lead.nombre} se ha quitado del panel.`,
      })
    } catch {
      notify({
        tone: 'error',
        title: 'Error al eliminar',
        description: 'No se pudo eliminar el lead. Inténtalo de nuevo.',
      })
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Panel de gestión
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Fichas recibidas en tiempo real · actualización automática cada 30 segundos
        </p>
      </div>

      {/* Stats cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Leads totales" value={leads.length} icon={<Inbox className="size-4" />} color="brand" />
        <StatCard label="Calientes" value={hotCount} icon={<TrendingUp className="size-4" />} color="hot" />
        <StatCard label="Templados" value={warmCount} icon={<Clock className="size-4" />} color="warm" />
        <StatCard label="Con doc. catastral" value={docCount} icon={<FileText className="size-4" />} color="neutral" />
      </div>

      {/* Secondary stats row */}
      <div className="mb-8 flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm">
        <span className="font-medium text-slate-700">
          <span className="text-[#72b01d] font-bold">{last24h}</span> nuevos en las últimas 24h
        </span>
        <span className="hidden h-4 w-px bg-slate-200 sm:block" />
        <span className="text-slate-500">
          Provincia más activa:{' '}
          <span className="font-semibold text-slate-700">
            {leads.length
              ? Object.entries(
                  leads.reduce<Record<string, number>>((acc, l) => {
                    acc[l.provincia] = (acc[l.provincia] || 0) + 1
                    return acc
                  }, {}),
                ).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'
              : '—'}
          </span>
        </span>
        <span className="hidden h-4 w-px bg-slate-200 sm:block" />
        <span className="text-slate-500">
          Inmueble más frecuente:{' '}
          <span className="font-semibold text-slate-700">
            {leads.length
              ? Object.entries(
                  leads.reduce<Record<string, number>>((acc, l) => {
                    acc[l.tipo] = (acc[l.tipo] || 0) + 1
                    return acc
                  }, {}),
                ).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'
              : '—'}
          </span>
        </span>
        <button
          onClick={() => mutate()}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100"
        >
          <RefreshCw className="size-3.5" />
          Actualizar
        </button>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, municipio, dirección o email…"
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#72b01d] focus:ring-2 focus:ring-[#72b01d]/20"
          />
        </div>
        <button
          onClick={() => setOrder((o) => (o === 'recent' ? 'urgent' : 'recent'))}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
        >
          <ArrowDownUp className="size-4" />
          {order === 'recent' ? 'Más recientes' : 'Por urgencia'}
        </button>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <svg className="size-8 animate-spin text-[#72b01d]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
          </svg>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#e62020]/30 bg-[#fdeaea] py-16 text-center">
          <p className="text-sm font-medium text-[#c41616]">Error al cargar los datos.</p>
          <button onClick={() => mutate()} className="mt-3 text-xs text-[#e62020] underline">
            Reintentar
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
          <Inbox className="size-10 text-slate-300" />
          <p className="mt-4 text-sm font-medium text-slate-500">
            {leads.length === 0 ? 'Aún no hay leads registrados.' : 'No hay leads que coincidan.'}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Las nuevas fichas aparecerán aquí automáticamente.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {filtered.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onCall={() => handleCall(lead)}
              onDelete={() => handleDelete(lead)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Stat card ──────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string
  value: number
  icon: React.ReactNode
  color: 'brand' | 'hot' | 'warm' | 'neutral'
}) {
  const colorMap = {
    brand: 'bg-[#f0f7e4] text-[#5c8f16]',
    hot: 'bg-[#fdeaea] text-[#c41616]',
    warm: 'bg-amber-50 text-amber-600',
    neutral: 'bg-slate-100 text-slate-500',
  }
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${colorMap[color]}`}>
        {icon}
      </span>
      <div>
        <div className="text-2xl font-bold leading-none text-slate-800 tabular-nums">{value}</div>
        <div className="mt-1 text-xs text-slate-400">{label}</div>
      </div>
    </div>
  )
}

// ─── Lead card ───────────────────────────────────────────────────────────────

function LeadCard({
  lead,
  onCall,
  onDelete,
}: {
  lead: LeadRow
  onCall: () => void
  onDelete: () => void
}) {
  const advice = getAdvice(lead)
  const adviceTone =
    advice.tone === 'hot'
      ? 'border-[#e62020]/30 bg-[#fdeaea]'
      : advice.tone === 'warm'
        ? 'border-amber-200 bg-amber-50'
        : 'border-slate-200 bg-slate-50'
  const adviceText =
    advice.tone === 'hot'
      ? 'text-[#a01212]'
      : advice.tone === 'warm'
        ? 'text-amber-800'
        : 'text-slate-600'

  return (
    <div className="animate-fade-up overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/60 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#72b01d] text-sm font-bold text-white">
            {lead.nombre.charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-800">{lead.nombre}</p>
            <p className="flex items-center gap-1 text-xs text-slate-400">
              <CalendarClock className="size-3" />
              {formatDate(lead.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              plazoStyle[lead.plazo] ?? 'bg-slate-100 text-slate-500'
            }`}
          >
            {lead.plazo}
          </span>
          {lead.catastralDocPathname && (
            <a
              href={`/api/file?pathname=${encodeURIComponent(lead.catastralDocPathname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#72b01d]/30 bg-[#f0f7e4] px-3 py-1.5 text-xs font-semibold text-[#5c8f16] transition-colors hover:bg-[#72b01d]/20"
              title={lead.catastralDocName ?? 'Documento catastral'}
            >
              <Download className="size-3.5" />
              Doc. catastral
            </a>
          )}
          <button
            onClick={onCall}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#e62020] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#c41616]"
          >
            <Phone className="size-3.5" />
            Llamar ahora
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-1.5 text-slate-400 transition-colors hover:border-[#e62020]/30 hover:bg-[#fdeaea] hover:text-[#e62020]"
            aria-label="Eliminar lead"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>

      {/* 3 columns */}
      <div className="grid gap-px bg-slate-100 md:grid-cols-3">
        {/* Owner */}
        <Column title="Propietario" icon={<UserRound className="size-3.5" />}>
          <Row icon={<Mail className="size-3.5" />} value={lead.email} />
          <Row icon={<Phone className="size-3.5" />} value={lead.telefono} />
          <Row icon={<MapPin className="size-3.5" />} value={`${lead.municipio} (${lead.provincia})`} />
          {lead.comentarios && (
            <p className="mt-2 rounded-md bg-slate-50 p-2 text-xs italic leading-relaxed text-slate-500">
              &ldquo;{lead.comentarios}&rdquo;
            </p>
          )}
        </Column>

        {/* Physical */}
        <Column title="Propiedad" icon={<Building2 className="size-3.5" />}>
          <Row icon={<MapPin className="size-3.5" />} value={`${lead.direccion} · ${lead.codigoPostal}`} />
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            <Row icon={<Building2 className="size-3.5" />} value={lead.tipo} />
            <Row icon={<Ruler className="size-3.5" />} value={`${lead.metros} m²`} />
            <Row icon={<BedDouble className="size-3.5" />} value={`${lead.habitaciones} hab.`} />
            <Row icon={<Bath className="size-3.5" />} value={`${lead.banos} baños`} />
          </div>
          <Row
            icon={<Building2 className="size-3.5" />}
            value={`${lead.planta} · Ascensor: ${lead.ascensor ? 'Sí' : 'No'}`}
          />
        </Column>

        {/* Extras */}
        <Column title="Calidades y conservación" icon={<Sparkles className="size-3.5" />}>
          <div className="flex flex-wrap gap-1.5">
            <Tag>{lead.estado}</Tag>
            {lead.anio && <Tag>Año {lead.anio}</Tag>}
            {lead.vistas && <Tag>{lead.vistas}</Tag>}
          </div>
          <Row icon={<Car className="size-3.5" />} value={`Garaje: ${lead.garaje}`} />
          {lead.orientacion && (
            <Row icon={<Compass className="size-3.5" />} value={`Orientación ${lead.orientacion}`} />
          )}
          {lead.exteriores && (
            <Row icon={<Trees className="size-3.5" />} value={`${lead.exteriores} · Trastero: ${lead.trastero ? 'Sí' : 'No'}`} />
          )}
          {lead.climatizacion && (
            <Row icon={<Snowflake className="size-3.5" />} value={`${lead.climatizacion} · Piscina: ${lead.piscina ? 'Sí' : 'No'}`} />
          )}
        </Column>
      </div>

      {/* Advice */}
      <div className={`m-4 flex items-start gap-3 rounded-xl border p-4 ${adviceTone}`}>
        <Lightbulb className={`mt-0.5 size-5 shrink-0 ${adviceText}`} />
        <div>
          <p className={`text-xs font-bold uppercase tracking-wider ${adviceText}`}>
            Recomendación de asesoramiento para el agente
          </p>
          <p className={`mt-1 text-sm leading-relaxed ${adviceText}`}>{advice.text}</p>
        </div>
      </div>
    </div>
  )
}

function Column({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white p-5">
      <div className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#72b01d]">
        {icon}
        {title}
      </div>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  )
}

function Row({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <span className="shrink-0 text-slate-400">{icon}</span>
      <span className="truncate">{value}</span>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-[#f0f7e4] px-2 py-0.5 text-xs font-medium text-[#5c8f16]">
      {children}
    </span>
  )
}
