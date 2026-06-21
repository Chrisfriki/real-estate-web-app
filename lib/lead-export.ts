import type { LeadRow } from './db/schema'
import { getAdvice } from './casa-facil-data'

const FALLBACK = '—'
const siNo = (v: boolean) => (v ? 'Sí' : 'No')

export type LeadExportData = {
  propietario: { nombre: string; email: string; telefono: string; localidad: string; fechaEntrada: string }
  inmueble: {
    tipo: string
    metros: number
    habitaciones: number
    banos: number
    planta: string
    ascensor: string
    garaje: string
    trastero: string
    exteriores: string
    piscina: string
    orientacion: string
  }
  calidades: { estado: string; anio: string; vistas: string; climatizacion: string }
  ubicacion: { provincia: string; municipio: string; direccion: string; codigoPostal: string }
  recomendacion_agente: { temperatura: string; recomendacion: string; observaciones: string }
}

const TEMPERATURA_LABEL: Record<'hot' | 'warm' | 'cool', string> = {
  hot: 'Caliente',
  warm: 'Templado',
  cool: 'Frío',
}

export function formatLeadDate(d: Date | string): string {
  return new Date(d).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function buildLeadExportData(lead: LeadRow): LeadExportData {
  const advice = getAdvice(lead)
  return {
    propietario: {
      nombre: lead.nombre,
      email: lead.email,
      telefono: lead.telefono,
      localidad: `${lead.municipio} (${lead.provincia})`,
      fechaEntrada: formatLeadDate(lead.createdAt),
    },
    inmueble: {
      tipo: lead.tipo,
      metros: lead.metros,
      habitaciones: lead.habitaciones,
      banos: lead.banos,
      planta: lead.planta,
      ascensor: siNo(lead.ascensor),
      garaje: lead.garaje,
      trastero: siNo(lead.trastero),
      exteriores: lead.exteriores ?? FALLBACK,
      piscina: siNo(lead.piscina),
      orientacion: lead.orientacion ?? FALLBACK,
    },
    calidades: {
      estado: lead.estado,
      anio: lead.anio ? String(lead.anio) : FALLBACK,
      vistas: lead.vistas ?? FALLBACK,
      climatizacion: lead.climatizacion ?? FALLBACK,
    },
    ubicacion: {
      provincia: lead.provincia,
      municipio: lead.municipio,
      direccion: lead.direccion,
      codigoPostal: lead.codigoPostal,
    },
    recomendacion_agente: {
      temperatura: TEMPERATURA_LABEL[advice.tone],
      recomendacion: advice.text,
      observaciones: lead.comentarios ?? FALLBACK,
    },
  }
}

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '')
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export function leadPdfFilename(lead: LeadRow): string {
  return `valoracion-casa-facil-${slugify(lead.nombre)}-${slugify(lead.municipio)}-${todayIso()}.pdf`
}

export function leadExcelFilename(lead: LeadRow): string {
  return `lead-casa-facil-${slugify(lead.nombre)}-${slugify(lead.municipio)}-${todayIso()}.xlsx`
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export async function generateLeadExcelBlob(lead: LeadRow): Promise<Blob> {
  const ExcelJS = (await import('exceljs')).default
  const data = buildLeadExportData(lead)
  const wb = new ExcelJS.Workbook()
  wb.creator = 'Casa Fácil'
  wb.created = new Date()

  function addSheet(name: string, rows: [string, string | number][]) {
    const sheet = wb.addWorksheet(name)
    sheet.columns = [
      { header: 'Campo', key: 'campo', width: 26 },
      { header: 'Valor', key: 'valor', width: 50 },
    ]
    sheet.getRow(1).font = { bold: true }
    sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0F7E4' } }
    rows.forEach(([campo, valor]) => sheet.addRow({ campo, valor }))
  }

  addSheet('Resumen lead', [
    ['Nombre', data.propietario.nombre],
    ['Email', data.propietario.email],
    ['Teléfono', data.propietario.telefono],
    ['Localidad', data.propietario.localidad],
    ['Fecha de entrada', data.propietario.fechaEntrada],
    ['Tipo de inmueble', data.inmueble.tipo],
    ['Metros aproximados', data.inmueble.metros],
    ['Temperatura del lead', data.recomendacion_agente.temperatura],
  ])

  addSheet('Datos técnicos inmueble', [
    ['Provincia', data.ubicacion.provincia],
    ['Municipio', data.ubicacion.municipio],
    ['Dirección', data.ubicacion.direccion],
    ['Código postal', data.ubicacion.codigoPostal],
    ['Tipo de inmueble', data.inmueble.tipo],
    ['Metros aproximados', data.inmueble.metros],
    ['Habitaciones', data.inmueble.habitaciones],
    ['Baños', data.inmueble.banos],
    ['Planta', data.inmueble.planta],
    ['Ascensor', data.inmueble.ascensor],
    ['Garaje', data.inmueble.garaje],
    ['Trastero', data.inmueble.trastero],
    ['Exteriores', data.inmueble.exteriores],
    ['Piscina', data.inmueble.piscina],
    ['Orientación', data.inmueble.orientacion],
    ['Estado de conservación', data.calidades.estado],
    ['Año de construcción', data.calidades.anio],
    ['Vistas', data.calidades.vistas],
    ['Climatización', data.calidades.climatizacion],
  ])

  addSheet('Recomendación agente', [
    ['Temperatura del lead', data.recomendacion_agente.temperatura],
    ['Recomendación automática', data.recomendacion_agente.recomendacion],
    ['Observaciones (comentarios del lead)', data.recomendacion_agente.observaciones],
    ['Fecha de creación', data.propietario.fechaEntrada],
  ])

  const buffer = await wb.xlsx.writeBuffer()
  return new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
}
