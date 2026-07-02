import { Award, Home, MessageCircle, Phone, Star } from 'lucide-react'
import { CasaFacilLogo } from './casa-facil-logo'

const STATS = [
  { icon: Home, value: '+800', label: 'Propiedades vendidas' },
  { icon: Award, value: '+30 años', label: 'Experiencia local' },
]

export function TrustSidebar() {
  return (
    <aside className="hidden lg:sticky lg:top-24 lg:block">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <CasaFacilLogo className="mx-auto w-fit" />

        <div className="flex flex-col gap-3 border-t border-slate-100 pt-4">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#f0f7e4]">
                <Icon className="size-4 text-[#72b01d]" strokeWidth={1.75} />
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-tight text-slate-800">{value}</span>
                <span className="text-[11px] leading-tight text-slate-500">{label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 border-t border-slate-100 pt-4">
          <span className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="size-3.5 text-yellow-400" fill="#facc15" strokeWidth={0} />
            ))}
          </span>
          <span className="text-sm font-bold text-slate-800">4,9</span>
          <span className="text-[11px] text-slate-500">· 227 reseñas Google</span>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
          <a
            href="tel:+34647679553"
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Phone className="size-4 text-[#72b01d]" />
            647 67 95 53
          </a>
          <a
            href="https://wa.me/34647679553?text=Hola%2C%20quiero%20hacer%20una%20consulta%20sobre%20la%20valoraci%C3%B3n%20de%20mi%20vivienda."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-[#72b01d] px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#65a015]"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </a>
        </div>

        <p className="text-center text-[11px] leading-relaxed text-slate-400">
          Sin compromiso · Asesor local · Valoración real
        </p>
      </div>
    </aside>
  )
}
