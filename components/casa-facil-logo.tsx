export function CasaFacilLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <svg
          width="44"
          height="44"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="shrink-0"
        >
          {/* Roof / house silhouette */}
          <path
            d="M24 4 L44 21 L38 21 L38 43 L10 43 L10 21 L4 21 Z"
            fill="#72b01d"
          />
          {/* Inner cut to make it a roof outline house */}
          <path d="M24 11 L33 19 L33 43 L15 43 L15 19 Z" fill="#ffffff" />
          {/* Keyhole in red */}
          <circle cx="24" cy="27" r="4.4" fill="#e62020" />
          <path d="M22.1 30 L25.9 30 L27 39 L21 39 Z" fill="#e62020" />
        </svg>
        <div className="leading-none">
          <div className="text-xl font-bold tracking-tight text-slate-800">
            CASA <span className="text-[#72b01d]">FÁCIL</span>
          </div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e62020]">
            Soluciones Inmobiliarias
          </div>
        </div>
      </div>
    </div>
  )
}
