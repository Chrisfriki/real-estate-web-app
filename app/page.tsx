'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'
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
import { FloatingHeader } from '@/components/floating-header'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { signOut, useSession } from '@/lib/auth-client'

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
        <AdminLogin
          onSuccess={() => setShowLogin(false)}
          onClose={() => setShowLogin(false)}
        />
      )}
      <WhatsAppButton />

      <div className="min-h-screen bg-slate-50">
        <FloatingHeader />

        <main>
          {/* 1. Hero + Stats + Funnel */}
          <section
            id="valoracion"
            className="relative scroll-mt-24 pb-6 pt-24 sm:pt-28"
            style={{
              backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/hero.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay semitransparente para legibilidad */}
            <div className="absolute inset-0 bg-white/5" />
            {/* Contenido por encima del overlay */}
            <div className="relative z-10">
              <StatsInline />
              <p className="mx-auto mb-2 max-w-xl px-4 text-center text-xs">
                <span className="rounded-full bg-white/80 px-3 py-1 text-slate-600 backdrop-blur-sm">
                  Valoración gratuita de pisos, casas y áticos en Valencia y provincia
                </span>
              </p>
              <PublicFunnel />
            </div>
          </section>

          {/* 2. Reviews — social proof right after the form */}
          <TestimonialsSection />

          {/* 3. Why Casa Facil */}
          <WhySection />

          {/* 4. CTA banner */}
          <CtaBanner />

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
                © {new Date().getFullYear()} Casa Fácil · Soluciones Inmobiliarias · Valencia y provincia
              </p>
              <div className="flex items-center gap-5 text-xs text-slate-400">
                <a href="/politica-privacidad" className="transition-colors hover:text-slate-600">Política de privacidad</a>
                <a href="/aviso-legal" className="transition-colors hover:text-slate-600">Aviso legal</a>
                <a href="/politica-cookies" className="transition-colors hover:text-slate-600">Cookies</a>
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
