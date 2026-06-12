'use client'

import {
  Award,
  BadgeCheck,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  HandshakeIcon,
  Home,
  HelpCircle,
  MapPin,
  ShieldCheck,
  Star,
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
    <div className="mx-auto mb-4 mt-6 max-w-2xl px-4">
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
      title: 'Informe catastral real',
      body: 'Cruzamos los datos reales del Catastro con ventas recientes en tu calle. Sin estimaciones automáticas que se equivocan hasta un 30%.',
    },
    {
      icon: MapPin,
      title: 'Especialistas en Valencia',
      body: 'Nuestros asesores operan en Valencia y provincia. Conocemos el mercado real de cada municipio y barrio.',
    },
    {
      icon: Users,
      title: 'Trato personal',
      body: 'Un único asesor acompaña tu operación de principio a fin. Sin centralitas ni formularios perdidos.',
    },
    {
      icon: TrendingUp,
      title: 'Máximo precio de venta',
      body: 'Nuestra estrategia de marketing y red de compradores cualificados consigue los mejores precios del mercado local.',
    },
    {
      icon: ShieldCheck,
      title: 'Asesoramiento jurídico',
      body: 'Te asesoramos en toda la documentación: contrato de arras, notaría, certificado energético, plusvalía y más.',
    },
    {
      icon: HandshakeIcon,
      title: 'Sin exclusividad obligatoria',
      body: 'Trabajamos con transparencia. Te ofrecemos un contrato de colaboración flexible adaptado a tus necesidades.',
    },
  ]

  return (
    <section id="por-que" className="bg-slate-50 py-14 sm:py-16">
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-[#f0f7e4]">
                <Icon className="size-5 text-[#72b01d]" />
              </span>
              <h3 className="mb-2 text-base font-semibold text-slate-800">{title}</h3>
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
    <section className="bg-[#72b01d] py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            ¿Sabes cuánto vale realmente tu casa?
          </h2>
          <p className="mt-1 text-sm text-white/80">
            Sin robots. Sin estimaciones erróneas. Un asesor local te responde en menos de 24h.
          </p>
        </div>
        <a
          href="#valoracion"
          onClick={scrollToForm}
          className="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#5c8f16] shadow-sm transition-all hover:bg-slate-50 hover:shadow-md"
        >
          Solicitar valoración gratuita
        </a>
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

  const [visible, setVisible] = useState(3)
  useEffect(() => {
    function update() {
      setVisible(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIndex = REVIEWS.length - visible
  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), [])
  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, maxIndex)), [maxIndex])

  useEffect(() => {
    if (isPaused) return
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c >= maxIndex ? 0 : c + 1))
    }, 4500)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isPaused, maxIndex])

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

  return (
    <section id="opiniones" className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-5xl px-4">

        {/* Header centrado sobre el ancho completo */}
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full bg-[#f0f7e4] px-3 py-1 text-xs font-semibold text-[#5c8f16]">
            Reseñas de Google
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            Opiniones de clientes que han valorado y vendido con nosotros
          </h2>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-10">

          {/* Vertical brand panel — desktop only */}
          <div className="hidden lg:flex lg:w-64 lg:shrink-0">
            <div className="relative flex w-full flex-col items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-b from-[#72b01d] to-[#4a7a0f] p-8 text-center shadow-lg">
              {/* Decorative circles */}
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10" />
              <div className="absolute right-4 bottom-32 h-16 w-16 rounded-full bg-white/5" />

              <div className="relative z-10 flex flex-col items-center">
                <img
                  src={`${base}/logo.png`}
                  alt="Casa Fácil"
                  className="w-44 brightness-0 invert"
                />
                <p className="mt-2 text-xs font-medium tracking-wide text-white/70 uppercase">
                  Soluciones Inmobiliarias
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-3">
                <span className="text-6xl font-bold text-white">4,9</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-900">
                  227 reseñas verificadas
                </span>
                <a
                  href="https://share.google/axkDFzU5FUsP0lA73"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white transition-colors hover:bg-white/30"
                >
                  Ver en Google
                </a>
              </div>

              <div className="relative z-10 mt-4 rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                <p className="text-xs italic leading-relaxed text-white/80">
                  "La inmobiliaria de referencia en Valencia y provincia"
                </p>
              </div>
            </div>
          </div>

          {/* Carousel column */}
          <div className="flex flex-1 flex-col">

            <div
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="overflow-hidden">
                <div
                  className="flex gap-5 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(calc(-${current} * (100% / ${visible}) - ${current} * 20px / ${visible}))`,
                  }}
                >
                  {REVIEWS.map((r) => (
                    <div
                      key={r.name}
                      className="flex shrink-0 flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                      style={{ width: `calc(${100 / visible}% - ${((visible - 1) * 20) / visible}px)` }}
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
      body: 'Cuéntanos los detalles de tu vivienda en menos de 3 minutos. Cuanta más información, más preciso será tu informe.',
    },
    {
      n: '02',
      title: 'Analizamos tu calle',
      body: 'Un asesor de tu zona cruza los datos catastrales, ventas reales recientes y la demanda actual de compradores activos.',
    },
    {
      n: '03',
      title: 'Te llamamos en 24h',
      body: 'Recibirás una llamada personalizada con el valor real de mercado de tu vivienda, sin presiones ni compromisos.',
    },
    {
      n: '04',
      title: 'Empezamos a trabajar juntos',
      body: 'Si decides vender, diseñamos juntos la mejor estrategia de precio y marketing. Si no, el informe es tuyo sin ningún coste.',
    },
  ]

  return (
    <section id="como-funciona" className="bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-[#f0f7e4] px-3 py-1 text-xs font-semibold text-[#5c8f16]">
            Proceso
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            Cómo funciona la valoración de tu casa:{' '}
            <span className="text-[#72b01d]">4 pasos</span>
          </h2>
        </div>

        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-slate-200 lg:block" />
          {steps.map(({ n, title, body }) => (
            <div key={n} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 flex size-[68px] items-center justify-center rounded-full border-4 border-white bg-[#72b01d] text-xl font-bold text-white shadow-md">
                {n}
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-800">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{body}</p>
            </div>
          ))}
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
    <section id="faq" className="bg-white py-14 sm:py-16">
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
    <section id="cobertura" className="bg-[#f0f7e4] py-14 sm:py-16">
      <div className="mx-auto max-w-4xl px-4">
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

        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-stretch sm:justify-center">
          {/* Map image — se estira hasta la altura de los cards */}
          <div className="flex w-64 shrink-0 items-center sm:w-72 lg:w-80">
            <img
              src={`${base}/mapa-valencia.png`}
              alt="Mapa de la Comunitat Valenciana con la provincia de Valencia destacada en verde"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Info cards */}
          <div className="flex flex-col gap-3 sm:max-w-xs">
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
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {badges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-sm font-medium text-slate-500">
              <Icon className="size-5 text-[#72b01d]" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
