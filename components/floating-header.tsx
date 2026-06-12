'use client'

import { useState, useEffect, useRef } from 'react'
import { Phone, Menu, X } from 'lucide-react'

const NAV = [
  { label: 'Valoración',      href: '#valoracion',    id: 'valoracion'    },
  { label: 'Ventajas',        href: '#por-que',       id: 'por-que'       },
  { label: 'Opiniones',       href: '#opiniones',     id: 'opiniones'     },
  { label: 'Proceso y dudas', href: '#como-funciona', id: 'como-funciona' },
]

export function FloatingHeader() {
  const [active, setActive]     = useState('valoracion')
  const [menuOpen, setMenuOpen] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const lastScrollY = useRef(0)
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const ids = [...NAV.map(n => n.id), 'faq']
    const els = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id === 'faq' ? 'como-funciona' : entry.target.id
            setActive(id)
          }
        })
      },
      { rootMargin: '-80px 0px -55% 0px', threshold: 0 },
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Dirección de scroll → estado compacto / grande
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      const goingDown = y > lastScrollY.current
      setIsCompact(goingDown && y > 80)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  // ─── Estilos inline para glass + transición de tamaño ─────────────────────
  const islandStyle: React.CSSProperties = {
    maxWidth:        isCompact ? '880px'  : '980px',
    padding:         isCompact ? '7px 16px' : '10px 22px',
    background:      'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.62))',
    backdropFilter:  'blur(24px) saturate(160%)',
    WebkitBackdropFilter: 'blur(24px) saturate(160%)',
    border:          '1px solid rgba(255,255,255,0.65)',
    boxShadow:       isCompact
      ? '0 10px 28px rgba(15,23,42,0.10), inset 0 1px 0 rgba(255,255,255,0.65)'
      : '0 20px 50px rgba(15,23,42,0.16), inset 0 1px 0 rgba(255,255,255,0.80)',
    transition:      'max-width 0.28s ease, padding 0.28s ease, box-shadow 0.28s ease',
  }

  const logoStyle: React.CSSProperties = {
    height:     isCompact ? '32px' : '40px',
    width:      'auto',
    transition: 'height 0.28s ease',
  }

  const dropdownTop = isCompact ? '72px' : '88px'

  return (
    <>
      {/* ── Floating island ──────────────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div
          className="pointer-events-auto relative flex w-full items-center gap-3 overflow-hidden rounded-full"
          style={islandStyle}
        >
          {/* Reflejo interno superior (sustituye ::before) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: 'inherit',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 55%)',
            }}
          />

          {/* Logo */}
          <img
            src={`${base}/logo.png`}
            alt="Casa Fácil"
            className="relative z-10 shrink-0"
            style={logoStyle}
          />

          {/* Desktop nav — centrado */}
          <nav className="relative z-10 hidden flex-1 items-center justify-center gap-1 lg:flex">
            {NAV.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.href)}
                className={[
                  'rounded-full px-4 py-2 text-[15px] font-medium transition-all duration-200',
                  active === item.id
                    ? 'bg-[#eaf5d3] font-semibold text-[#4a7a0f] shadow-sm ring-1 ring-[#72b01d]/30'
                    : 'text-slate-600 hover:bg-white/60 hover:text-slate-900',
                ].join(' ')}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Spacer móvil */}
          <div className="relative z-10 flex-1 lg:hidden" />

          {/* Botón teléfono */}
          <a
            href="tel:+34961221468"
            className="relative z-10 inline-flex shrink-0 items-center gap-2 rounded-full bg-white/70 px-5 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200/60 transition-colors hover:bg-white/90"
          >
            <Phone className="size-[18px] text-[#72b01d]" />
            <span className="hidden sm:inline">961 22 14 68</span>
          </a>

          {/* Hamburger — solo móvil */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-white/60 lg:hidden"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ──────────────────────────────────────────────── */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
          <div
            className="fixed inset-x-4 z-40 rounded-2xl p-2"
            style={{
              top: dropdownTop,
              background:          'rgba(255,255,255,0.95)',
              backdropFilter:      'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border:              '1px solid rgba(255,255,255,0.70)',
              boxShadow:           '0 16px 40px rgba(15,23,42,0.12)',
              transition:          'top 0.28s ease',
            }}
          >
            <nav className="flex flex-col gap-0.5">
              {NAV.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.href)}
                  className={[
                    'w-full rounded-xl px-4 py-3.5 text-left text-[15px] font-medium transition-all',
                    active === item.id
                      ? 'bg-[#eaf5d3] font-semibold text-[#4a7a0f]'
                      : 'text-slate-700 hover:bg-slate-50',
                  ].join(' ')}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  )
}
