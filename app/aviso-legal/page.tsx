import Link from 'next/link'

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const PH = ({ children }: { children: string }) => (
  <span className="rounded bg-amber-100 px-1 font-mono text-xs font-semibold text-amber-800">
    {children}
  </span>
)

export const metadata = {
  title: 'Aviso Legal | Casa Fácil',
  robots: { index: false },
}

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link href="/">
            <img src={`${base}/logo.png`} alt="Casa Fácil" className="h-8 w-auto" />
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 transition-colors hover:text-[#72b01d]"
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-12">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#72b01d]">
            Información legal
          </p>
          <h1 className="text-3xl font-bold text-slate-800">Aviso Legal</h1>
          <p className="mt-2 text-sm text-slate-400">
            Última actualización: junio de 2025
          </p>

          <div className="mt-8 border-t border-slate-100" />

          {/* 1 */}
          <h2 className="mt-8 text-lg font-bold text-[#4a7a0f]">
            1. Titular del sitio web
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
            Información y del Comercio Electrónico (LSSI), se facilitan a continuación los datos
            identificativos del titular de este sitio web:
          </p>
          <ul className="mt-4 space-y-1.5 text-slate-600 leading-relaxed">
            <li>
              <strong>Denominación social:</strong> <PH>[NOMBRE LEGAL DE LA EMPRESA]</PH>
            </li>
            <li>
              <strong>NIF/CIF:</strong> <PH>[CIF/NIF]</PH>
            </li>
            <li>
              <strong>Domicilio social:</strong> Avinguda del Nord, 31, 46220 Picassent (Valencia)
            </li>
            <li>
              <strong>Datos registrales:</strong> <PH>[DATOS REGISTRALES — ej. Registro Mercantil de Valencia, Tomo X, Folio X, Hoja V-XXXXX]</PH>
            </li>
            <li>
              <strong>Teléfono de contacto:</strong> 961 22 14 68
            </li>
            <li>
              <strong>Correo electrónico:</strong> <PH>[EMAIL DE CONTACTO]</PH>
            </li>
            <li>
              <strong>Sitio web:</strong>{' '}
              <a
                href="https://www.casafacil.es"
                className="text-[#72b01d] underline hover:text-[#4a7a0f]"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.casafacil.es
              </a>
            </li>
          </ul>

          {/* 2 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            2. Condiciones generales de uso
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            El acceso y uso de este sitio web está sujeto a las presentes condiciones legales y a la
            legislación española vigente. El mero acceso al sitio implica la aceptación de estas
            condiciones.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Casa Fácil se reserva el derecho a modificar en cualquier momento la presentación,
            configuración, especificaciones técnicas y servicios del sitio web. Se recomienda al
            usuario revisar periódicamente las presentes condiciones.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            El usuario se compromete a hacer un uso adecuado y lícito del sitio web de conformidad
            con la legislación aplicable, la buena fe, el orden público y las presentes condiciones,
            absteniéndose de utilizar el sitio con fines ilícitos o lesivos.
          </p>

          {/* 3 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            3. Propiedad intelectual e industrial
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Todos los contenidos del sitio web —incluyendo textos, fotografías, gráficos, imágenes,
            iconos, tecnología, software, logotipos, marcas y demás elementos— son titularidad de
            Casa Fácil o de terceros que han autorizado su uso, y están protegidos por la legislación
            española e internacional sobre propiedad intelectual e industrial.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Queda prohibida la reproducción, distribución, comunicación pública, transformación o
            cualquier otro tipo de explotación de los contenidos sin autorización expresa y escrita
            del titular. El uso del sitio web no otorga al usuario ningún derecho sobre dichos
            contenidos.
          </p>

          {/* 4 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            4. Exclusión de responsabilidad
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Casa Fácil no se responsabiliza de los daños o perjuicios que puedan derivarse de:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6 text-slate-600 leading-relaxed">
            <li>Interrupciones, errores o fallos en el acceso al sitio web.</li>
            <li>
              El uso de la información contenida en el sitio web por parte de terceros para fines
              distintos a los previstos.
            </li>
            <li>
              La existencia de virus o elementos dañinos que puedan causar daños en el sistema
              informático del usuario o en sus ficheros.
            </li>
            <li>
              Los contenidos de páginas web de terceros a las que pueda accederse mediante enlaces
              o vínculos desde este sitio.
            </li>
          </ul>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Las valoraciones inmobiliarias ofrecidas a través de este sitio tienen carácter
            orientativo. Casa Fácil no garantiza que dichas valoraciones coincidan con el precio
            final de mercado ni asume responsabilidad por las decisiones tomadas en base a ellas.
          </p>

          {/* 5 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            5. Enlaces a terceros
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Este sitio web puede contener enlaces a páginas de terceros. Casa Fácil no controla ni
            es responsable de los contenidos, políticas de privacidad o prácticas de dichos sitios.
            La inclusión de un enlace no implica recomendación ni endorsement del sitio enlazado.
          </p>

          {/* 6 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            6. Legislación aplicable y jurisdicción
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Las presentes condiciones se rigen por la legislación española. Para la resolución de
            cualquier controversia derivada del acceso o uso de este sitio web, las partes se
            someten, con renuncia expresa a cualquier otro fuero, a los Juzgados y Tribunales de
            Valencia (España).
          </p>

          <div className="mt-10 border-t border-slate-100 pt-6">
            <p className="text-xs text-slate-400">
              Para cualquier consulta relacionada con este aviso legal, puede contactar con nosotros
              en el teléfono <strong>961 22 14 68</strong> o en la dirección indicada anteriormente.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <Link href="/aviso-legal" className="font-medium text-slate-600 hover:text-[#72b01d] transition-colors">
              Aviso legal
            </Link>
            <Link href="/politica-privacidad" className="hover:text-[#72b01d] transition-colors">
              Política de privacidad
            </Link>
            <Link href="/politica-cookies" className="hover:text-[#72b01d] transition-colors">
              Política de cookies
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            © {new Date().getFullYear()} Casa Fácil · Soluciones Inmobiliarias · Valencia y provincia
          </p>
        </div>
      </footer>
    </div>
  )
}
