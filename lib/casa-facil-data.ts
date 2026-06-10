export type Lead = {
  id: string
  createdAt: number
  // Paso 1 — Ubicación
  provincia: string
  municipio: string
  direccion: string
  codigoPostal: string
  // Paso 2 — Tipología y dimensiones
  tipo: string
  metros: number
  habitaciones: number
  banos: number
  // Paso 3 — Conservación e interior
  estado: string
  planta: string
  ascensor: boolean
  anio: string
  vistas: string
  // Paso 4 — Instalaciones y extras
  garaje: string
  trastero: boolean
  exteriores: string
  climatizacion: string
  orientacion: string
  piscina: boolean
  // Paso 5 — Contacto
  nombre: string
  telefono: string
  email: string
  plazo: string
  comentarios: string
}

export type LeadForm = Omit<Lead, 'id' | 'createdAt'>

export const PROVINCIAS = ['Valencia', 'Alicante', 'Castellón'] as const

export const MUNICIPIOS_SUGERIDOS = [
  'Silla',
  'Alcàsser',
  'Beniparrell',
  'Picassent',
  'Catarroja',
  'Albal',
  'Sollana',
  'Almussafes',
]

export const TIPOS_INMUEBLE = [
  'Piso',
  'Ático',
  'Dúplex',
  'Chalet',
  'Casa adosada',
] as const

export const ESTADOS = [
  'Para reformar',
  'Buen estado',
  'Reformado',
  'A estrenar',
] as const

export const PLANTAS = [
  'Planta baja',
  'Planta intermedia',
  'Planta alta',
  'Chalet / unifamiliar',
] as const

export const VISTAS = ['Despejadas', 'A la calle', 'A patio', 'Mar / montaña'] as const

export const GARAJES = ['No tiene', '1 plaza', '2 o más plazas'] as const

export const EXTERIORES = ['Terraza', 'Balcón', 'Jardín', 'Ninguno'] as const

export const CLIMATIZACION = [
  'Calefacción',
  'Splits',
  'Conductos',
  'Ninguna',
] as const

export const ORIENTACIONES = ['Este', 'Oeste', 'Sur', 'Norte'] as const

export const PLAZOS = [
  'Inmediato',
  '3-6 meses',
  '6-12 meses',
  'Solo curiosidad',
] as const

export const EMPTY_FORM: LeadForm = {
  provincia: 'Valencia',
  municipio: '',
  direccion: '',
  codigoPostal: '',
  tipo: 'Piso',
  metros: 90,
  habitaciones: 3,
  banos: 2,
  estado: 'Buen estado',
  planta: 'Planta intermedia',
  ascensor: true,
  anio: '',
  vistas: 'A la calle',
  garaje: 'No tiene',
  trastero: false,
  exteriores: 'Terraza',
  climatizacion: 'Splits',
  orientacion: 'Sur',
  piscina: false,
  nombre: '',
  telefono: '',
  email: '',
  plazo: '3-6 meses',
  comentarios: '',
}

export const STEP_TITLES = [
  'Ubicación completa',
  'Tipología y dimensiones',
  'Conservación e interior',
  'Instalaciones y extras',
  'Tus datos de contacto',
]

export const SEED_LEADS: Lead[] = [
  {
    id: 'seed-1',
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
    provincia: 'Valencia',
    municipio: 'Silla',
    direccion: 'C/ del Sequial 14, 3º B',
    codigoPostal: '46460',
    tipo: 'Piso',
    metros: 104,
    habitaciones: 3,
    banos: 2,
    estado: 'Reformado',
    planta: 'Planta alta',
    ascensor: true,
    anio: '1998',
    vistas: 'Despejadas',
    garaje: '1 plaza',
    trastero: true,
    exteriores: 'Terraza',
    climatizacion: 'Conductos',
    orientacion: 'Sur',
    piscina: false,
    nombre: 'María Tarazona Gimeno',
    telefono: '612 33 44 55',
    email: 'maria.tarazona@gmail.com',
    plazo: 'Inmediato',
    comentarios: 'Quiero vender rápido por traslado laboral a Madrid.',
  },
  {
    id: 'seed-2',
    createdAt: Date.now() - 1000 * 60 * 60 * 26,
    provincia: 'Valencia',
    municipio: 'Alcàsser',
    direccion: 'Av. Reis Catòlics 8, bajo',
    codigoPostal: '46290',
    tipo: 'Casa adosada',
    metros: 168,
    habitaciones: 4,
    banos: 3,
    estado: 'Para reformar',
    planta: 'Chalet / unifamiliar',
    ascensor: false,
    anio: '1985',
    vistas: 'A la calle',
    garaje: '2 o más plazas',
    trastero: true,
    exteriores: 'Jardín',
    climatizacion: 'Calefacción',
    orientacion: 'Este',
    piscina: true,
    nombre: 'Joaquín Server Romero',
    telefono: '699 88 77 66',
    email: 'jserver@hotmail.com',
    plazo: 'Solo curiosidad',
    comentarios: 'Herencia familiar, todavía valorando si vender o alquilar.',
  },
]

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleString('es-ES', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getAdvice(lead: Lead): { tone: 'hot' | 'warm' | 'cool'; text: string } {
  if (lead.plazo === 'Inmediato') {
    return {
      tone: 'hot',
      text: `Lead CALIENTE: quiere vender de inmediato. Prioriza la llamada hoy mismo y propón visita en 24-48h. ${
        lead.estado === 'Para reformar'
          ? 'Inmueble para reformar: posiciona precio realista y destaca el potencial de la zona.'
          : 'Inmueble en buen estado: puedes defender precio de mercado alto.'
      }`,
    }
  }
  if (lead.plazo === '3-6 meses' || lead.plazo === '6-12 meses') {
    return {
      tone: 'warm',
      text: `Lead templado (${lead.plazo}). Cultiva la relación con el informe de mercado y un seguimiento mensual. ${
        lead.estado === 'A estrenar' || lead.estado === 'Reformado'
          ? 'Inmueble listo para entrar: ideal para captar en exclusiva con buenas fotos.'
          : 'Sugiere mejoras de bajo coste que aumenten el valor antes de publicar.'
      }`,
    }
  }
  return {
    tone: 'cool',
    text: 'Lead frío (solo curiosidad). Envía el informe de valor y nútrelo con datos de la zona. No presiones la venta; gánate la confianza para cuando decida dar el paso.',
  }
}
