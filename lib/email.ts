import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface LeadEmailData {
  provincia: string
  municipio: string
  direccion: string
  codigoPostal: string
  tipo: string
  metros: number
  habitaciones: number
  banos: number
  estado: string
  planta: string
  ascensor: boolean
  anio: number | null
  vistas: string | null
  garaje: string
  trastero: boolean
  exteriores: string | null
  climatizacion: string | null
  orientacion: string | null
  piscina: boolean
  nombre: string
  telefono: string
  email: string
  plazo: string
  comentarios: string | null
  catastralDocName: string | null
}

// ─── Email interno al equipo ──────────────────────────────────────────────────

export async function sendInternalLeadEmail(data: LeadEmailData): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY no configurada — email interno omitido')
    return
  }
  const to = process.env.INTERNAL_LEAD_EMAIL
  if (!to) {
    console.warn('[email] INTERNAL_LEAD_EMAIL no configurada — email interno omitido')
    return
  }

  await resend.emails.send({
    from: process.env.FROM_EMAIL ?? 'Casa Fácil <noreply@casafacil.es>',
    to,
    subject: `🏠 Nuevo lead: ${data.nombre} — ${data.municipio} (${data.tipo})`,
    html: internalHtml(data),
  })
}

// ─── Email de confirmación al usuario ────────────────────────────────────────

export async function sendUserConfirmationEmail(nombre: string, email: string): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY no configurada — email de confirmación omitido')
    return
  }

  await resend.emails.send({
    from: process.env.FROM_EMAIL ?? 'Casa Fácil <noreply@casafacil.es>',
    to: email,
    subject: 'Hemos recibido tu solicitud de valoración',
    html: confirmationHtml(nombre),
  })
}

// ─── Templates HTML ───────────────────────────────────────────────────────────

function row(label: string, value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined || value === '') return ''
  const display =
    typeof value === 'boolean'
      ? value ? 'Sí' : 'No'
      : String(value)
  return `
    <tr>
      <td style="padding:7px 12px;font-size:13px;color:#64748b;white-space:nowrap;width:42%;">${label}</td>
      <td style="padding:7px 12px;font-size:13px;color:#1e293b;font-weight:600;">${display}</td>
    </tr>`
}

function section(title: string, rows: string): string {
  return `
    <tr><td style="padding:20px 32px 4px;">
      <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#72b01d;">${title}</p>
    </td></tr>
    <tr><td style="padding:0 32px 16px;">
      <table width="100%" cellpadding="0" cellspacing="0"
        style="border-radius:8px;border:1px solid #e2e8f0;overflow:hidden;">
        <tbody>${rows}</tbody>
      </table>
    </td></tr>`
}

function internalHtml(d: LeadEmailData): string {
  const ubicacion = [
    row('Provincia', d.provincia),
    row('Municipio', d.municipio),
    row('Dirección', d.direccion),
    row('Código postal', d.codigoPostal),
  ].join('')

  const vivienda = [
    row('Tipo', d.tipo),
    row('Metros útiles', `${d.metros} m²`),
    row('Habitaciones', d.habitaciones),
    row('Baños', d.banos),
  ].join('')

  const conservacion = [
    row('Estado', d.estado),
    row('Planta', d.planta),
    row('Ascensor', d.ascensor),
    row('Año edificación', d.anio ?? '—'),
    row('Vistas', d.vistas),
  ].join('')

  const extras = [
    row('Garaje', d.garaje),
    row('Trastero', d.trastero),
    row('Exteriores', d.exteriores),
    row('Climatización', d.climatizacion),
    row('Orientación', d.orientacion),
    row('Piscina / zonas comunes', d.piscina),
  ].join('')

  const contacto = [
    row('Nombre', d.nombre),
    row('Teléfono', d.telefono),
    row('Email', d.email),
    row('Plazo de venta', d.plazo),
    row('Comentarios', d.comentarios),
    row('Documento catastral', d.catastralDocName),
  ].join('')

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0"
  style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

  <!-- Cabecera -->
  <tr>
    <td style="background:#72b01d;padding:28px 32px;">
      <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#d4edaa;">
        Casa Fácil · Soluciones Inmobiliarias
      </p>
      <h1 style="margin:8px 0 0;font-size:22px;color:#ffffff;font-weight:700;">
        🏠 Nuevo lead de valoración
      </h1>
    </td>
  </tr>

  <!-- Aviso -->
  <tr><td style="padding:20px 32px 0;">
    <p style="margin:0;font-size:14px;color:#475569;line-height:1.6;">
      Se ha recibido una nueva solicitud desde la landing de <strong>casafacil.es</strong>.
      A continuación tienes todos los datos del formulario.
    </p>
  </td></tr>

  ${section('📍 Ubicación', ubicacion)}
  ${section('🏠 Vivienda', vivienda)}
  ${section('🔧 Estado y conservación', conservacion)}
  ${section('✨ Extras e instalaciones', extras)}
  ${section('👤 Contacto', contacto)}

  <!-- Footer -->
  <tr><td style="padding:24px 32px;border-top:1px solid #e2e8f0;">
    <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">
      Casa Fácil · Soluciones Inmobiliarias · Valencia y provincia
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

function confirmationHtml(nombre: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0"
  style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

  <!-- Cabecera verde -->
  <tr>
    <td style="background:#72b01d;padding:28px 32px;text-align:center;">
      <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#d4edaa;">
        Casa Fácil · Soluciones Inmobiliarias
      </p>
      <h1 style="margin:10px 0 0;font-size:22px;color:#ffffff;font-weight:700;">
        ¡Hemos recibido tu solicitud!
      </h1>
    </td>
  </tr>

  <!-- Cuerpo -->
  <tr><td style="padding:36px 40px;">
    <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
      Hola <strong>${nombre}</strong>,
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
      Hemos recibido correctamente tu solicitud de valoración de vivienda.
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
      Nuestro equipo revisará la información y se pondrá en contacto contigo
      lo antes posible.
    </p>

    <!-- Caja destacada -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
      <tr>
        <td style="background:#f0f7e4;border-left:4px solid #72b01d;border-radius:6px;padding:16px 20px;">
          <p style="margin:0;font-size:14px;color:#4a7a0f;line-height:1.6;">
            ⏱ <strong>Te llamamos en menos de 24 h</strong><br>
            Un asesor especialista de tu zona revisará tu solicitud y preparará
            un informe de valoración personalizado.
          </p>
        </td>
      </tr>
    </table>

    <p style="margin:0;font-size:15px;color:#334155;line-height:1.7;">
      Gracias por confiar en Casa Fácil.
    </p>
    <p style="margin:20px 0 0;font-size:15px;color:#334155;line-height:1.7;">
      Un saludo,<br>
      <strong>Equipo Casa Fácil</strong>
    </p>
  </td></tr>

  <!-- Contacto -->
  <tr><td style="padding:0 40px 32px;">
    <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.6;">
      Si tienes alguna duda puedes llamarnos al
      <a href="tel:+34961221468" style="color:#72b01d;text-decoration:none;font-weight:600;">961 22 14 68</a>.
    </p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center;">
    <p style="margin:0;font-size:12px;color:#94a3b8;">
      Casa Fácil · Soluciones Inmobiliarias · Valencia y provincia<br>
      <a href="https://www.casafacil.es" style="color:#72b01d;text-decoration:none;">www.casafacil.es</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}
