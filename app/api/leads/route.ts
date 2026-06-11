import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { db } from '@/lib/db'
import { leads } from '@/lib/db/schema'

// Simple in-memory rate limiter: max 5 submissions per IP per 10 minutes
const ipMap = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_SUBMISSIONS = 5

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = ipMap.get(ip)
  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  if (entry.count >= MAX_SUBMISSIONS) return true
  entry.count++
  return false
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Inténtalo de nuevo en unos minutos.' },
      { status: 429 },
    )
  }
  try {
    const formData = await request.formData()

    // Extract all lead fields
    const provincia = formData.get('provincia') as string
    const municipio = formData.get('municipio') as string
    const direccion = formData.get('direccion') as string
    const codigoPostal = formData.get('codigoPostal') as string
    const tipo = formData.get('tipo') as string
    const metros = parseInt(formData.get('metros') as string, 10)
    const habitaciones = parseInt(formData.get('habitaciones') as string, 10)
    const banos = parseInt(formData.get('banos') as string, 10)
    const estado = formData.get('estado') as string
    const planta = formData.get('planta') as string
    const ascensor = formData.get('ascensor') === 'true'
    const anioRaw = formData.get('anio') as string
    const vistas = formData.get('vistas') as string
    const garaje = formData.get('garaje') as string
    const trastero = formData.get('trastero') === 'true'
    const exteriores = formData.get('exteriores') as string
    const climatizacion = formData.get('climatizacion') as string
    const orientacion = formData.get('orientacion') as string
    const piscina = formData.get('piscina') === 'true'
    const nombre = formData.get('nombre') as string
    const telefono = formData.get('telefono') as string
    const email = formData.get('email') as string
    const plazo = formData.get('plazo') as string
    const comentarios = formData.get('comentarios') as string

    // Validate required fields
    if (!provincia || !municipio || !direccion || !codigoPostal || !nombre || !telefono || !email || !plazo) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    // Handle optional catastral document upload
    let catastralDocPathname: string | null = null
    let catastralDocName: string | null = null
    const file = formData.get('catastralDoc') as File | null
    if (file && file.size > 0) {
      const blob = await put(`catastral/${Date.now()}-${file.name}`, file, {
        access: 'private',
      })
      catastralDocPathname = blob.pathname
      catastralDocName = file.name
    }

    // Insert into DB
    const [inserted] = await db
      .insert(leads)
      .values({
        provincia,
        municipio,
        direccion,
        codigoPostal,
        tipo,
        metros,
        habitaciones,
        banos,
        estado,
        planta,
        ascensor,
        anio: anioRaw ? parseInt(anioRaw, 10) : null,
        vistas: vistas || null,
        garaje,
        trastero,
        exteriores: exteriores || null,
        climatizacion: climatizacion || null,
        orientacion: orientacion || null,
        piscina,
        nombre,
        telefono,
        email,
        plazo,
        comentarios: comentarios || null,
        catastralDocPathname,
        catastralDocName,
      })
      .returning()

    return NextResponse.json({ ok: true, id: inserted.id })
  } catch (error) {
    console.error('[v0] Lead submit error:', error)
    return NextResponse.json({ error: 'Error al guardar el lead' }, { status: 500 })
  }
}
