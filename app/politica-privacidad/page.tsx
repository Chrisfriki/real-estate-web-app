import Link from 'next/link'

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const PH = ({ children }: { children: string }) => (
  <span className="rounded bg-amber-100 px-1 font-mono text-xs font-semibold text-amber-800">
    {children}
  </span>
)

export const metadata = {
  title: 'Política de Privacidad | Casa Fácil',
  robots: { index: false },
}

export default function PoliticaPrivacidadPage() {
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
            Protección de datos
          </p>
          <h1 className="text-3xl font-bold text-slate-800">Política de Privacidad</h1>
          <p className="mt-2 text-sm text-slate-400">
            Última actualización: junio de 2025
          </p>

          <div className="mt-6 rounded-xl bg-[#f0f7e4] px-5 py-4 text-sm leading-relaxed text-[#4a7212]">
            En Casa Fácil nos comprometemos a proteger tu privacidad y a tratar tus datos
            personales con total transparencia, de conformidad con el Reglamento (UE) 2016/679
            (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).
          </div>

          <div className="mt-8 border-t border-slate-100" />

          {/* 1 */}
          <h2 className="mt-8 text-lg font-bold text-[#4a7a0f]">
            1. Responsable del tratamiento
          </h2>
          <ul className="mt-3 space-y-1.5 text-slate-600 leading-relaxed">
            <li>
              <strong>Denominación social:</strong> <PH>[NOMBRE LEGAL DE LA EMPRESA]</PH>
            </li>
            <li>
              <strong>NIF/CIF:</strong> <PH>[CIF/NIF]</PH>
            </li>
            <li>
              <strong>Domicilio:</strong> Avinguda del Nord, 31, 46220 Picassent (Valencia)
            </li>
            <li>
              <strong>Teléfono:</strong> 961 22 14 68
            </li>
            <li>
              <strong>Email de contacto:</strong> <PH>[EMAIL DE CONTACTO]</PH>
            </li>
          </ul>

          {/* 2 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            2. Datos personales que recogemos
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            A través del formulario de valoración, recogemos los siguientes datos:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6 text-slate-600 leading-relaxed">
            <li>Nombre y apellidos.</li>
            <li>Número de teléfono móvil.</li>
            <li>Dirección de correo electrónico.</li>
            <li>Dirección del inmueble a valorar (municipio, dirección, código postal).</li>
            <li>
              Características de la vivienda: tipo de inmueble, metros cuadrados, habitaciones,
              baños, estado de conservación, extras (garaje, trastero, piscina, etc.).
            </li>
            <li>
              Documento catastral adjunto (opcional): PDF o imagen que el usuario decida aportar.
            </li>
            <li>Plazo estimado de venta y comentarios adicionales (opcionales).</li>
          </ul>
          <p className="mt-3 text-slate-600 leading-relaxed">
            No se recogen datos de categorías especiales (salud, ideología, religión, etc.).
          </p>

          {/* 3 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            3. Finalidad del tratamiento
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Los datos facilitados se utilizan exclusivamente para:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6 text-slate-600 leading-relaxed">
            <li>
              Gestionar la solicitud de valoración inmobiliaria y elaborar el informe de mercado
              personalizado solicitado.
            </li>
            <li>
              Contactarte (por teléfono o email) para hacer entrega del informe y resolver
              cualquier duda relacionada.
            </li>
            <li>
              Mantener el registro de solicitudes recibidas para la gestión interna del negocio.
            </li>
          </ul>
          <p className="mt-3 text-slate-600 leading-relaxed">
            No utilizamos tus datos para elaborar perfiles automatizados ni para la toma de
            decisiones automatizadas con efectos jurídicos sobre ti.
          </p>

          {/* 4 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            4. Base legal del tratamiento
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            La base legal para el tratamiento de tus datos es el{' '}
            <strong>consentimiento del interesado</strong> (Art. 6.1.a RGPD), que prestas
            libremente al marcar la casilla de aceptación de esta política antes de enviar el
            formulario.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Puedes retirar tu consentimiento en cualquier momento. La retirada del consentimiento
            no afecta a la licitud del tratamiento basado en el consentimiento previo a su
            retirada.
          </p>

          {/* 5 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            5. Conservación de los datos
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Tus datos se conservarán durante el tiempo necesario para la gestión de tu solicitud
            de valoración. Si no llegamos a establecer ninguna relación comercial, los datos se
            suprimirán transcurridos <strong>12 meses</strong> desde la recepción de la solicitud,
            salvo que el usuario solicite su supresión antes o que exista obligación legal de
            conservarlos por un período mayor.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            En caso de formalizarse una relación comercial (encargo de venta), los datos se
            conservarán durante la vigencia del contrato y, una vez finalizado, durante los plazos
            de prescripción legales aplicables (con carácter general, 5 años para obligaciones
            civiles y 4 años para obligaciones fiscales).
          </p>

          {/* 6 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            6. Destinatarios y comunicaciones a terceros
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Como norma general, Casa Fácil no cede tus datos a terceros salvo obligación legal.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            No obstante, para la prestación del servicio utilizamos los siguientes proveedores de
            servicios que pueden tener acceso a tus datos en calidad de encargados del
            tratamiento, con los que mantenemos el correspondiente contrato de encargo:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6 text-slate-600 leading-relaxed">
            <li>
              <strong>Proveedor de alojamiento web (hosting):</strong>{' '}
              <PH>[NOMBRE DEL PROVEEDOR — ej. Vercel Inc. / AWS]</PH> — para el almacenamiento y
              servicio de la plataforma.
            </li>
            <li>
              <strong>Servicio de correo electrónico:</strong>{' '}
              <PH>[NOMBRE DEL PROVEEDOR — ej. Resend / Brevo / Mailgun]</PH> — para el envío de
              notificaciones internas de nuevas solicitudes.
            </li>
          </ul>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Todos los encargados del tratamiento están sometidos a las instrucciones de Casa Fácil
            y operan dentro del Espacio Económico Europeo o bajo garantías adecuadas conforme al
            RGPD.
          </p>

          {/* 7 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            7. Tus derechos
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Como interesado, puedes ejercer en cualquier momento los siguientes derechos:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6 text-slate-600 leading-relaxed">
            <li>
              <strong>Acceso:</strong> conocer qué datos personales tratamos sobre ti.
            </li>
            <li>
              <strong>Rectificación:</strong> corregir datos inexactos o incompletos.
            </li>
            <li>
              <strong>Supresión («derecho al olvido»):</strong> solicitar la eliminación de tus
              datos cuando ya no sean necesarios.
            </li>
            <li>
              <strong>Limitación del tratamiento:</strong> solicitar que suspendamos el
              tratamiento en determinadas circunstancias.
            </li>
            <li>
              <strong>Portabilidad:</strong> recibir tus datos en un formato estructurado y de
              uso común.
            </li>
            <li>
              <strong>Oposición:</strong> oponerte al tratamiento de tus datos por motivos
              relacionados con tu situación particular.
            </li>
            <li>
              <strong>Retirada del consentimiento:</strong> en cualquier momento, sin que ello
              afecte a la licitud del tratamiento previo.
            </li>
          </ul>

          {/* 8 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            8. Cómo ejercer tus derechos
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Puedes ejercer tus derechos enviando una solicitud escrita, acompañada de copia de tu
            DNI u otro documento identificativo, a:
          </p>
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-600 leading-relaxed">
            <p>
              <strong>Casa Fácil Soluciones Inmobiliarias</strong>
            </p>
            <p>Avinguda del Nord, 31, 46220 Picassent (Valencia)</p>
            <p>
              Email: <PH>[EMAIL DE CONTACTO]</PH>
            </p>
            <p>Teléfono: 961 22 14 68</p>
          </div>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Responderemos a tu solicitud en el plazo máximo de <strong>un mes</strong> desde su
            recepción, salvo que por la complejidad o el número de solicitudes sea necesario
            prorrogar dicho plazo hasta dos meses adicionales, informándote en tal caso.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Si consideras que el tratamiento de tus datos vulnera la normativa vigente, tienes
            derecho a presentar una reclamación ante la{' '}
            <a
              href="https://www.aepd.es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#72b01d] underline hover:text-[#4a7a0f]"
            >
              Agencia Española de Protección de Datos (AEPD)
            </a>
            , autoridad de control competente.
          </p>

          {/* 9 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            9. Comunicaciones comerciales
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Casa Fácil no envía comunicaciones comerciales o publicitarias sin consentimiento
            previo y expreso del usuario. Si en algún momento deseas recibir información sobre
            nuestros servicios, te la solicitaremos de forma separada y específica.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Puedes oponerte en cualquier momento al envío de comunicaciones comerciales mediante
            solicitud a los datos de contacto indicados en el apartado anterior.
          </p>

          {/* 10 */}
          <h2 className="mt-10 text-lg font-bold text-[#4a7a0f]">
            10. Seguridad de los datos
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Casa Fácil aplica las medidas técnicas y organizativas necesarias para garantizar la
            seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o
            acceso no autorizado, habida cuenta del estado de la tecnología, la naturaleza de los
            datos y los riesgos a los que están expuestos.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            La transmisión de datos entre tu navegador y nuestros servidores se realiza de forma
            cifrada mediante protocolo HTTPS/TLS.
          </p>

          <div className="mt-10 border-t border-slate-100 pt-6">
            <p className="text-xs text-slate-400">
              Esta política puede ser actualizada en cualquier momento. La versión vigente será
              siempre la disponible en esta página. Fecha de la última revisión: junio de 2025.
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
            <Link
              href="/politica-privacidad"
              className="font-medium text-slate-600 hover:text-[#72b01d] transition-colors"
            >
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
