'use client'

import {
  Award,
  BadgeCheck,
  BookOpen,
  Calculator,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  FileCheck,
  FileText,
  HandshakeIcon,
  Home,
  HelpCircle,
  MapPin,
  Ruler,
  Scale,
  ShieldCheck,
  Star,
  Tag,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

// ─── Stats inline (inside hero) ──────────────────────────────────────────────
export function StatsInline() {
  const stats = [
    { value: '+800', label: 'Propiedades', icon: Home },
    { value: '+30 años', label: 'Experiencia local', icon: Award },
    { value: '24h', label: 'Tiempo de respuesta', icon: Clock },
  ]

  return (
    <div className="mx-auto mb-4 mt-6 max-w-2xl px-4 lg:hidden">
      <div className="grid grid-cols-4 gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
        {stats.map(({ value, label, icon: Icon }) => (
          <div key={label} className="flex flex-col items-center gap-1 text-center">
            <Icon className="size-5 text-[#72b01d]" strokeWidth={1.75} />
            <span className="text-lg font-bold leading-tight tracking-tight text-slate-800 sm:text-xl">
              {value}
            </span>
            <span className="text-[10px] font-medium leading-tight text-slate-500 sm:text-xs">
              {label}
            </span>
          </div>
        ))}
        {/* Bloque de reseñas: estrellas + 4,9 + label */}
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="flex gap-0.5">
            {[1,2,3,4,5].map((i) => (
              <Star key={i} className="size-5 text-yellow-400" fill="#facc15" strokeWidth={0} />
            ))}
          </span>
          <span className="text-lg font-bold leading-tight tracking-tight text-slate-800 sm:text-xl">
            4,9
          </span>
          <span className="text-[10px] font-medium leading-tight text-slate-500 sm:text-xs">
            227 reseñas Google
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Why Casa Facil ──────────────────────────────────────────────────────────
export function WhySection() {
  const reasons = [
    {
      icon: FileText,
      title: 'Valoración real, no automática',
      body: 'Cruzamos datos del Catastro con ventas recientes de tu zona.',
    },
    {
      icon: MapPin,
      title: 'Especialistas en Valencia',
      body: 'Conocemos el mercado local de Valencia ciudad y provincia.',
    },
    {
      icon: ShieldCheck,
      title: 'Te guiamos con el papeleo',
      body: 'Arras, notaría, certificado energético y documentación clave.',
    },
    {
      icon: HandshakeIcon,
      title: 'Sin exclusividad obligatoria',
      body: 'Tú decides cómo avanzar. Sin compromisos que no necesitas.',
    },
  ]

  return (
    <section id="por-que" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-[#f0f7e4] px-3 py-1 text-xs font-semibold text-[#5c8f16]">
            ¿Por qué Casa Fácil?
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            ¿Por qué elegir Casa Fácil para{' '}
            <span className="text-[#72b01d]">valorar tu vivienda?</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-slate-500 sm:text-base">
            Vendemos con criterio. No somos una plataforma de pisos: somos una
            agencia local con asesores que conocen cada calle de tu municipio.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-2xl border border-t-2 border-slate-200 border-t-[#c9a875]/50 bg-gradient-to-b from-white to-[#f7f8f2] p-6 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#86c232] to-[#4a7a0f] shadow-md ring-2 ring-[#c9a875]/40">
                <Icon className="size-6 text-white" />
              </span>
              <h3 className="mb-1.5 text-base font-semibold text-slate-800">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA banner ───────────────────────────────────────────────────────────────
export function CtaBanner() {
  function scrollToForm(e: React.MouseEvent) {
    e.preventDefault()
    document.getElementById('valoracion')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto max-w-[1000px] px-4">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#5ba81f]/15 bg-white px-6 py-5 text-center sm:flex-row sm:justify-between sm:gap-8 sm:px-8 sm:py-6 sm:text-left">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-800 sm:text-xl">
              ¿Quieres una <span className="text-[#72b01d]">valoración real</span> de tu vivienda?
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              Un asesor local revisa tu caso y te responde en menos de 24h. Sin compromiso y sin estimaciones automáticas.
            </p>
          </div>
          <a
            href="#valoracion"
            onClick={scrollToForm}
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#72b01d] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#65a015]"
          >
            Solicitar valoración gratuita
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Google Reviews carousel (5 curated reviews) ─────────────────────────────
const REVIEWS = [
  {
    name: 'Cristina Beltrán',
    initials: 'CB',
    stars: 5,
    date: 'hace 2 semanas',
    text: 'Estoy muy contenta con la gestión de Casa Fácil. Han sido muy profesionales, resolutivos y siempre disponibles para cualquier duda. El proceso de venta fue rápido y sin problemas gracias a su equipo.',
  },
  {
    name: 'José Antonio Muñoz',
    initials: 'JA',
    stars: 5,
    date: 'hace 3 semanas',
    text: 'Excelente servicio. Vendí mi piso en menos de un mes y al precio que pedía. Me asesoraron muy bien durante todo el proceso y resolvieron todas mis dudas con rapidez y profesionalidad.',
  },
  {
    name: 'Patricia Hernández',
    initials: 'PH',
    stars: 5,
    date: 'hace 5 meses',
    text: 'Nos trataron de maravilla. Desde la primera visita hasta la firma todo fue perfecto. Son serios, transparentes y conocen muy bien el mercado de la zona. Los recomiendo al 100%.',
  },
  {
    name: 'Fernando Alonso Ruiz',
    initials: 'FA',
    stars: 5,
    date: 'hace 3 meses',
    text: 'Profesionales, eficaces y con mucho conocimiento del mercado local. Vendieron mi piso por encima de mis expectativas y en tiempo récord. Repetiría sin dudarlo.',
  },
  {
    name: 'Isabel Ferrer Blasco',
    initials: 'IF',
    stars: 5,
    date: 'hace 6 meses',
    text: 'Me asesoraron perfectamente sobre el valor real de mi piso y consiguieron cerrarlo en menos de dos meses. Muy satisfecha con el resultado y con el trato recibido.',
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [cardPx, setCardPx] = useState({ width: 300, visible: 1 })

  useEffect(() => {
    function measure() {
      const screenWidth = window.innerWidth
      const vis = screenWidth < 640 ? 1 : screenWidth < 1024 ? 2 : 3
      const containerWidth = carouselRef.current?.offsetWidth ?? 760
      const w = Math.floor((containerWidth - (vis - 1) * 20) / vis)
      setCardPx({ width: w, visible: vis })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const maxIndex = REVIEWS.length - cardPx.visible
  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), [])
  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, maxIndex)), [maxIndex])

  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIndex))
  }, [maxIndex])

  useEffect(() => {
    if (isPaused) return
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c >= maxIndex ? 0 : c + 1))
    }, 4500)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isPaused, maxIndex])

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

  return (
    <section id="opiniones" className="scroll-mt-24 overflow-x-hidden bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-6">

        {/* Header */}
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full bg-[#f0f7e4] px-3 py-1 text-xs font-semibold text-[#5c8f16]">
            Clientes satisfechos
          </span>
          <h2 className="mt-3 text-3xl font-bold leading-snug tracking-tight text-slate-800 sm:text-4xl">
            Opiniones de clientes<br />
            que han <span className="text-[#e63946]">valorado</span> y{' '}
            <span className="text-[#e63946]">vendido</span> con{' '}
            <span className="text-[#72b01d]">nosotros</span>
          </h2>
        </div>

        {/* Google summary bar — horizontal, full width */}
        <div className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-br from-[#72b01d] to-[#4a7a0f] px-6 py-6 shadow-md sm:px-10">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 left-1/3 h-28 w-28 rounded-full bg-white/5" />

          <div className="relative z-10 flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:gap-6 sm:text-left">
            <img src={`${base}/logo.png`} alt="Casa Fácil" className="h-9 w-auto shrink-0 brightness-0 invert" />

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-white">4,9</span>
              <div className="flex flex-col items-start gap-1">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-white/90">227 reseñas verificadas</span>
              </div>
            </div>

            <p className="hidden max-w-xs text-sm italic leading-snug text-white/80 lg:block">
              "La inmobiliaria de referencia en Valencia y provincia"
            </p>

            <a
              href="https://share.google/axkDFzU5FUsP0lA73"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#4a7a0f] shadow-sm transition-colors hover:bg-white/90"
            >
              Ver en Google
            </a>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div ref={carouselRef} className="overflow-hidden">
            <div
              className="flex gap-5 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * (cardPx.width + 20)}px)` }}
            >
              {REVIEWS.map((r) => (
                <div
                  key={r.name}
                  className="flex shrink-0 flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                  style={{ width: `${cardPx.width}px` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">{r.date}</span>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-slate-600">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 border-t border-slate-200 pt-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#72b01d] text-xs font-bold text-white">
                      {r.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">{r.name}</p>
                      <p className="flex items-center gap-1 text-xs text-slate-400">
                        <span className="font-medium text-[#4285F4]">Google</span>
                        <span>· Reseña verificada</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fade hint — indica que hay más cards */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              disabled={current === 0}
              aria-label="Anterior reseña"
              className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-[#72b01d] hover:text-[#72b01d] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={next}
              disabled={current >= maxIndex}
              aria-label="Siguiente reseña"
              className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-[#72b01d] hover:text-[#72b01d] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── How it works ────────────────────────────────────────────────────────────
export function HowItWorksSection() {
  const steps = [
    {
      n: '01',
      title: 'Rellenas el formulario',
      body: 'Nos indicas la información básica del inmueble para empezar a valorar tu caso.',
      points: [
        { icon: MapPin, label: 'Dirección y municipio' },
        { icon: Home, label: 'Tipo de inmueble' },
        { icon: Ruler, label: 'Metros aproximados' },
        { icon: ClipboardList, label: 'Características básicas' },
      ],
    },
    {
      n: '02',
      title: 'Analizamos tu zona y tu inmueble',
      body: 'Revisamos la información clave del mercado para preparar una valoración ajustada.',
      points: [
        { icon: FileText, label: 'Datos catastrales' },
        { icon: TrendingUp, label: 'Ventas comparables' },
        { icon: Users, label: 'Demanda actual de compradores' },
      ],
    },
    {
      n: '03',
      title: 'Te llamamos en menos de 24h',
      body: 'Un asesor local revisa contigo el caso y te orienta sin compromiso.',
      points: [
        { icon: Calculator, label: 'Valor aproximado de mercado' },
        { icon: HelpCircle, label: 'Resolución de dudas' },
        { icon: ShieldCheck, label: 'Sin obligación de vender' },
      ],
    },
    {
      n: '04',
      title: 'Definimos la mejor estrategia',
      body: 'Si quieres vender, te proponemos cómo enfocar la salida al mercado.',
      points: [
        { icon: Tag, label: 'Precio recomendado' },
        { icon: Target, label: 'Estrategia de salida' },
        { icon: FileCheck, label: 'Documentación necesaria' },
        { icon: HandshakeIcon, label: 'Asesoramiento inicial' },
      ],
    },
    {
      n: '05',
      title: 'Te acompañamos durante todo el proceso',
      body: 'Gestionamos la comercialización y te acompañamos hasta el cierre.',
      points: [
        { icon: Users, label: 'Gestión de interesados' },
        { icon: Calendar, label: 'Organización de visitas' },
        { icon: Scale, label: 'Negociación de ofertas' },
        { icon: CheckCircle2, label: 'Acompañamiento hasta la firma' },
      ],
    },
  ]

  return (
    <section id="como-funciona" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-[#f0f7e4] px-3 py-1 text-xs font-semibold text-[#5c8f16]">
            Proceso
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            ¿Cómo funciona la valoración y venta de tu vivienda?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-slate-500 sm:text-base">
            Te explicamos qué pasa desde que envías tus datos hasta que decides si quieres vender.
            Sin compromiso y con asesoramiento real.
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-8 top-2 bottom-2 w-px bg-gradient-to-b from-[#72b01d]/25 via-[#c9a875]/25 to-transparent sm:left-9" />
          <div className="flex flex-col gap-14 sm:gap-16">
            {steps.map(({ n, title, body, points }) => (
              <div key={n} className="relative flex gap-5 sm:gap-6">
                <span className="relative z-10 flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#86c232] via-[#72b01d] to-[#3f6b0d] text-xl font-bold text-white shadow-lg ring-[3px] ring-[#c9a875]/50 sm:size-[72px] sm:text-2xl">
                  <span className="absolute inset-0 bg-gradient-to-b from-white/35 to-transparent" />
                  <span className="relative">{n}</span>
                </span>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-bold text-slate-800 sm:text-2xl">{title}</h3>
                  <p className="mt-1.5 text-sm text-slate-500 sm:text-base">{body}</p>
                  <ul className="mt-5 flex flex-col gap-3">
                    {points.map(({ icon: Icon, label }) => (
                      <li key={label} className="flex items-center gap-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#86c232] to-[#4a7a0f] shadow-sm">
                          <Icon className="size-3.5 text-white" />
                        </span>
                        <span className="text-sm font-medium text-slate-700">{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ section ─────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: '¿La valoración de mi vivienda tiene algún coste?',
    a: 'No. La valoración es completamente gratuita y sin compromiso. Rellenamos el informe, te lo explicamos en una llamada y, si decides no vender, el informe es tuyo.',
  },
  {
    q: '¿En cuánto tiempo me contactáis?',
    a: 'Un asesor especializado en tu municipio te llama en menos de 24 horas laborables desde que recibes la confirmación de tu solicitud.',
  },
  {
    q: '¿Estoy obligado a vender si pido la valoración?',
    a: 'En absoluto. Puedes solicitar la valoración con total libertad. Si finalmente decides no vender, el informe personalizado es tuyo sin ningún coste ni compromiso.',
  },
  {
    q: '¿Operáis en mi municipio?',
    a: 'Cubrimos toda la provincia de Valencia, con asesores especializados en cada municipio. Si tienes dudas sobre tu zona, llámanos al 961 22 14 68 y te confirmamos al momento.',
  },
  {
    q: '¿Qué diferencia hay entre vuestra valoración y las de Idealista o Fotocasa?',
    a: 'Las valoraciones automáticas se equivocan hasta un 30% porque no tienen en cuenta el estado real del inmueble, las reformas o las ventas concretas de tu calle. Nosotros cruzamos datos catastrales reales con operaciones cerradas recientemente en tu zona.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-slate-800 sm:text-base">{q}</span>
        <ChevronDown
          className={`mt-0.5 size-5 shrink-0 text-[#72b01d] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="animate-fade-up pb-5 text-sm leading-relaxed text-slate-500">{a}</p>
      )}
    </div>
  )
}

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full bg-[#f0f7e4] px-3 py-1 text-xs font-semibold text-[#5c8f16]">
            Preguntas frecuentes
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            Resolvemos tus dudas
          </h2>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-6 shadow-sm">
          {FAQS.map(({ q, a }) => (
            <FaqItem key={q} q={q} a={a} />
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
          <HelpCircle className="size-4 text-[#72b01d]" />
          <span>
            ¿Tienes otra pregunta?{' '}
            <a href="tel:+34961221468" className="font-semibold text-[#72b01d] hover:underline">
              Llámanos al 961 22 14 68
            </a>
          </span>
        </div>
      </div>
    </section>
  )
}

// ─── Coverage zones — SVG map ─────────────────────────────────────────────────
export function ZonesSection() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  return (
    <section id="cobertura" className="bg-[#f0f7e4] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#5c8f16]">
            Cobertura local
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            Valoramos viviendas en toda la{' '}
            <span className="text-[#72b01d]">provincia de Valencia</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
            Asesores especializados en Valencia ciudad y todos sus municipios.
            Conocemos el mercado real de cada zona: no somos una agencia de ciudad que visita
            tu pueblo de vez en cuando.
          </p>
        </div>

        {/* Columnas fijas + justify-center */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[440px_390px] sm:items-center sm:justify-center sm:gap-7">

          {/* Columna izquierda: mapa — 440px fijos */}
          <div className="flex items-center justify-center">
            <img
              src={`${base}/mapa-valencia.png`}
              alt="Mapa de la Comunitat Valenciana con la provincia de Valencia destacada en verde"
              className="h-auto w-full max-w-[320px] sm:max-w-[440px]"
            />
          </div>

          {/* Columna derecha: tarjetas — 390px fijos */}
          <div className="flex flex-col gap-[18px]">
            <div className="rounded-2xl border border-[#72b01d]/25 bg-white p-5 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-[#72b01d]">
                  <MapPin className="size-3.5 text-white" />
                </span>
                <span className="text-sm font-semibold text-slate-800">Valencia y toda su provincia</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                Capital, municipios del Área Metropolitana, l'Horta, la Ribera y comarca interior. Toda la provincia de Valencia.
              </p>
            </div>
            <div className="rounded-2xl border border-[#72b01d]/25 bg-white p-5 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-[#72b01d]">
                  <Home className="size-3.5 text-white" />
                </span>
                <span className="text-sm font-semibold text-slate-800">Asesores locales en Valencia</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                Nuestros asesores viven y trabajan en Valencia. Conocen de primera mano los precios reales de cada barrio y municipio.
              </p>
            </div>
            <div className="rounded-2xl border border-[#72b01d]/25 bg-white p-5 shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-[#72b01d]">
                  <TrendingUp className="size-3.5 text-white" />
                </span>
                <span className="text-sm font-semibold text-slate-800">Precios reales del mercado valenciano</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                Accedemos a operaciones cerradas recientemente en tu calle para darte el precio más preciso del mercado actual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Trust / legal badges ────────────────────────────────────────────────────
export function TrustSection() {
  const badges = [
    { icon: BadgeCheck, label: 'Agencia registrada RAICV' },
    { icon: ShieldCheck, label: 'RGPD & privacidad garantizada' },
    { icon: BookOpen, label: 'Asesoría jurídica incluida' },
    { icon: FileText, label: 'Valoración sin compromiso' },
  ]

  return (
    <section className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-5 sm:grid-cols-4 sm:gap-x-6">
          {badges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Icon className="size-4 shrink-0 text-[#72b01d]" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
