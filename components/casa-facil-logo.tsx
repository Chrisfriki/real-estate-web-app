export function CasaFacilLogo({ className }: { className?: string }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  return (
    <div className={className}>
      <img
        src={`${base}/logo.png`}
        alt="Casa Fácil Soluciones Inmobiliarias"
        height={48}
        className="h-16 w-auto"
      />
    </div>
  )
}
