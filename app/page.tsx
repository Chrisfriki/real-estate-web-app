'use client'

import { useState } from 'react'
import { Lock, Phone } from 'lucide-react'
import { CasaFacilLogo } from '@/components/casa-facil-logo'
import { CrmDashboard } from '@/components/crm-dashboard'
import { PublicFunnel } from '@/components/public-funnel'
import { ToastProvider } from '@/components/toast'
import { AdminLogin } from '@/components/admin-login'
import {
  CtaBanner,
  FaqSection,
  HowItWorksSection,
  StatsInline,
  TestimonialsSection,
  TrustSection,
  WhySection,
  ZonesSection,
} from '@/components/landing-sections'
import { signOut, useSession } from '@/lib/auth-client'

// ─── Floating WhatsApp button ─────────────────────────────────────────────────
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/34961221468?text=Hola%2C%20quiero%20saber%20cu%C3%A1nto%20vale%20mi%20vivienda"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#1ebe5a]"
    >
      {/* WhatsApp SVG icon */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-7" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  )
}

export default function Page() {
  const { data: session, isPending } = useSession()
  const isAuthenticated = !!session?.user
  const [showLogin, setShowLogin] = useState(false)

  // ── Authenticated: show CRM panel ────────────────────────────────────────
  if (!isPending && isAuthenticated) {
    return (
      <ToastProvider>
        <div className="min-h-screen bg-slate-50">
          <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
              <CasaFacilLogo />
              <div className="flex items-center gap-3">
                <span className="hidden text-xs text-slate-400 sm:block">
                  {session.user.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-50"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </header>
          <main>
            <CrmDashboard />
          </main>
        </div>
      </ToastProvider>
    )
  }

  // ── Public landing page ───────────────────────────────────────────────────
  return (
    <ToastProvider>
      {showLogin && (
        <AdminLogin onSuccess={() => setShowLogin(false)} />
      )}
      <WhatsAppButton />

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <CasaFacilLogo />
            <a
              href="tel:+34961221468"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              <Phone className="size-4 text-[#72b01d]" />
              <span className="hidden sm:inline">961 22 14 68</span>
            </a>
          </div>
        </header>

        <main>
          {/* 1. Hero + Stats + Funnel */}
          <section
            id="valoracion"
            className="relative pb-6 pt-2"
            style={{
              backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/hero.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay semitransparente para legibilidad */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
            {/* Contenido por encima del overlay */}
            <div className="relative z-10">
              <StatsInline />
              <p className="mx-auto mb-2 max-w-xl px-4 text-center text-xs text-slate-500">
                Valoración gratuita de pisos, casas y áticos en Valencia, Alicante y Castellón
              </p>
              <PublicFunnel />
            </div>
          </section>

          {/* 2. Why Casa Facil */}
          <WhySection />

          {/* 3. CTA banner */}
          <CtaBanner />

          {/* 4. Reviews — social proof before process */}
          <TestimonialsSection />

          {/* 5. How it works */}
          <HowItWorksSection />

          {/* 6. FAQ */}
          <FaqSection />

          {/* 7. Zones */}
          <ZonesSection />

          {/* 8. Trust badges */}
          <TrustSection />
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-8">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
              <CasaFacilLogo />
              <p className="text-center text-xs text-slate-400 sm:text-left">
                © {new Date().getFullYear()} Casa Fácil · Soluciones Inmobiliarias · Comunidad Valenciana
              </p>
              <div className="flex items-center gap-5 text-xs text-slate-400">
                <span className="cursor-pointer transition-colors hover:text-slate-600">Política de privacidad</span>
                <span className="cursor-pointer transition-colors hover:text-slate-600">Aviso legal</span>
                <button
                  onClick={() => setShowLogin(true)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-400 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Acceso privado"
                >
                  <Lock className="size-3" />
                  Acceso
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ToastProvider>
  )
}
