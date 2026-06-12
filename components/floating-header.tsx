'use client'

import { useState, useEffect } from 'react'
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
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

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

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Floating island */}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div className="pointer-events-auto flex w-full max-w-[1040px] items-center gap-3 rounded-full border border-slate-200/80 bg-white/85 px-5 py-4 shadow-xl shadow-black/[0.08] backdrop-blur-xl">

          {/* Logo */}
          <img
            src={`${base}/logo.png`}
            alt="Casa Fácil"
            className="h-10 w-auto shrink-0"
          />

          {/* Desktop nav — centrado */}
          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {NAV.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.href)}
                className={`rounded-full px-4 py-2 text-[15px] font-medium transition-all duration-200 ${
                  active === item.id
                    ? 'bg-[#eaf5d3] text-[#4a7a0f] font-semibold shadow-sm ring-1 ring-[#72b01d]/30'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Spacer en móvil */}
          <div className="flex-1 lg:hidden" />

          {/* Teléfono */}
          <a
            href="tel:+34961221468"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            <Phone className="size-[18px] text-[#72b01d]" />
            <span className="hidden sm:inline">961 22 14 68</span>
          </a>

          {/* Hamburger — solo móvil */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed inset-x-4 top-[100px] z-40 rounded-2xl border border-slate-200/70 bg-white/95 p-2 shadow-xl shadow-black/10 backdrop-blur-xl">
            <nav className="flex flex-col gap-0.5">
              {NAV.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.href)}
                  className={`w-full rounded-xl px-4 py-3.5 text-left text-[15px] font-medium transition-all ${
                    active === item.id
                      ? 'bg-[#eaf5d3] text-[#4a7a0f] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
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
