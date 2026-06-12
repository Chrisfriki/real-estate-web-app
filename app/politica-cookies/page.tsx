import Link from 'next/link'

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const metadata = {
  title: 'Política de Cookies | Casa Fácil',
  robots: { index: false },
}

export default function PoliticaCookiesPage() {
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
            Cookies
          </p>
          <h1 className="text-3xl font-bold text-slate-800">Política de Cookies</h1>
          <p className="mt-2 text-sm text-slate-400">
            Última actualización: junio de 2025
          </p>

          {/* Resumen visual */}
          <div className="mt-6 rounded-xl bg-[#f0f7e4] px-5 py-4 text-sm leading-relaxed text-[#4a7212]">
            <strong>Resumen:</strong> este sitio web únicamente utiliza cookies técnicas
            estrictamente necesarias para su funcionamiento. No instalamos cookies analíticas,
            publicitarias ni de seguimiento de terceros. No se requiere tu consentimiento para
            estas cookies.
          </div>

          <div className="mt-8 border-t border-slate-100" />

          {/* 1 */}
          <h2 className="mt-8 text-lg font-bold text-[#4a7a0f]">
            1. ¿Qué son las cookies?
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Las cookies son pequeños archivos de texto que los sitios web almacenan en el
            navegador del usuario cuando este los visita. Su función principal es recordar
            preferencias y facilitar la navegación.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Existen distintos tipos según su finalidad:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6 text-slate-600 leading-relaxed">
            <li>
              <strong>Técnicas o necesarias:</strong> imprescindibles para el correcto
              funcionamiento del sitio. No requieren consentimiento del usuario.
            </li>
            <li>
              <strong>Analíticas:</strong> recogen información sobre el uso del sitio para
              mejorar su rendimiento. Requieren consentimiento.
            </li>
            <li>
              <strong>Publicitarias / de seguimiento:</strong> permiten mostrar publicidad
              personalizada. Requieren consentimiento.
            </li>
          </ul>

          {/* 2 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            2. Cookies que utilizamos
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Este sitio web solo utiliza cookies técnicas propias, necesarias para el
            funcionamiento del sistema de autenticación y la gestión de sesiones. No se
            instalan cookies analíticas, publicitarias ni de terceros.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Cookie</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Finalidad</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Duración</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Tipo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-slate-700">better-auth.session</td>
                  <td className="px-4 py-3 text-slate-600">
                    Mantiene la sesión del usuario autenticado en el panel de administración.
                    Solo se activa tras el inicio de sesión del equipo de Casa Fácil.
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">Sesión / 7 días</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[#f0f7e4] px-2 py-0.5 text-xs font-semibold text-[#5c8f16]">
                      Técnica
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Los usuarios públicos que únicamente visitan la landing y utilizan el formulario de
            valoración no tienen ninguna cookie de sesión instalada en su navegador.
          </p>

          {/* 3 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            3. Herramientas de terceros
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Actualmente este sitio web <strong>no utiliza</strong> ninguna de las siguientes
            herramientas que habitualmente generan cookies de terceros:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-600 leading-relaxed">
            <li>Google Analytics ni ninguna otra herramienta de analítica web.</li>
            <li>Meta Pixel (Facebook), TikTok Pixel ni píxeles publicitarios similares.</li>
            <li>Google Maps embebido ni otros mapas interactivos externos.</li>
            <li>reCAPTCHA de Google.</li>
            <li>Herramientas de chat o atención al cliente externas.</li>
            <li>Botones de redes sociales con seguimiento.</li>
          </ul>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Si en el futuro se incorporasen herramientas de este tipo, esta política de cookies
            se actualizará con la información correspondiente y se implementará un banner de
            consentimiento conforme a las directrices de la AEPD.
          </p>

          {/* 4 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            4. ¿Necesito aceptar las cookies?
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Dado que únicamente utilizamos cookies técnicas necesarias, no es preciso obtener tu
            consentimiento para su uso, de acuerdo con el artículo 22.2 de la Ley 34/2002
            (LSSI-CE) y las directrices de la Agencia Española de Protección de Datos (AEPD).
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Por ello, en este sitio web no se muestra un banner de aceptación de cookies.
          </p>

          {/* 5 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            5. Cómo gestionar o eliminar las cookies
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Puedes configurar tu navegador para bloquear o eliminar las cookies almacenadas en
            tu dispositivo. Ten en cuenta que deshabilitar las cookies técnicas puede afectar
            al correcto funcionamiento del sitio (por ejemplo, no podrás iniciar sesión en el
            panel de administración).
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A continuación encontrarás las instrucciones de los navegadores más comunes:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6 text-slate-600 leading-relaxed">
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#72b01d] underline hover:text-[#4a7a0f]"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#72b01d] underline hover:text-[#4a7a0f]"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#72b01d] underline hover:text-[#4a7a0f]"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#72b01d] underline hover:text-[#4a7a0f]"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>

          {/* 6 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            6. Más información
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Para cualquier consulta sobre el uso de cookies en este sitio, puedes contactar con
            nosotros a través del teléfono <strong>961 22 14 68</strong>. Puedes consultar
            también nuestra{' '}
            <Link
              href="/politica-privacidad"
              className="text-[#72b01d] underline hover:text-[#4a7a0f]"
            >
              Política de Privacidad
            </Link>{' '}
            para más información sobre el tratamiento de datos personales.
          </p>

          <div className="mt-10 border-t border-slate-100 pt-6">
            <p className="text-xs text-slate-400">
              Guía de cookies de la AEPD:{' '}
              <a
                href="https://www.aepd.es/guias/guia-cookies.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-slate-600"
              >
                www.aepd.es
              </a>
              . Fecha de la última revisión: junio de 2025.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <Link href="/aviso-legal" className="hover:text-[#72b01d] transition-colors">
              Aviso legal
            </Link>
            <Link href="/politica-privacidad" className="hover:text-[#72b01d] transition-colors">
              Política de privacidad
            </Link>
            <Link
              href="/politica-cookies"
              className="font-medium text-slate-600 hover:text-[#72b01d] transition-colors"
            >
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
