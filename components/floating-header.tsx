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

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const ids = [...NAV.map(n => n.id), 'faq']
    const els = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // faq comparte item con como-funciona
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
        <div className="pointer-events-auto flex w-full max-w-3xl items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-3 py-2 shadow-lg shadow-black/[0.06] backdrop-blur-xl">

          {/* Logo */}
          <img
            src={`${base}/logo.png`}
            alt="Casa Fácil"
            className="h-9 w-auto shrink-0"
          />

          {/* Desktop nav — centrado */}
          <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
            {NAV.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.href)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                  active === item.id
                    ? 'bg-[#f0f7e4] text-[#5c8f16]'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Spacer en móvil para empujar teléfono a la derecha */}
          <div className="flex-1 lg:hidden" />

          {/* Teléfono */}
          <a
            href="tel:+34961221468"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            <Phone className="size-4 text-[#72b01d]" />
            <span className="hidden sm:inline">961 22 14 68</span>
          </a>

          {/* Hamburger — solo móvil */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <>
          {/* Backdrop para cerrar al clicar fuera */}
          <div
            className="fixed inset-0 z-30"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed inset-x-4 top-[72px] z-40 rounded-2xl border border-slate-200/70 bg-white/95 p-2 shadow-xl shadow-black/10 backdrop-blur-xl">
            <nav className="flex flex-col gap-0.5">
              {NAV.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.href)}
                  className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
                    active === item.id
                      ? 'bg-[#f0f7e4] text-[#5c8f16]'
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
