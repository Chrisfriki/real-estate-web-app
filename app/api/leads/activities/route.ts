import { NextRequest, NextResponse } from 'next/server'
import { desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { leadActivities } from '@/lib/db/schema'

const MANUAL_TYPES = ['call', 'whatsapp', 'email', 'visit', 'note'] as const

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const leadId = Number(request.nextUrl.searchParams.get('leadId'))
  if (!leadId) {
    return NextResponse.json({ error: 'Falta leadId' }, { status: 400 })
  }

  try {
    const rows = await db
      .select()
      .from(leadActivities)
      .where(eq(leadActivities.leadId, leadId))
      .orderBy(desc(leadActivities.createdAt))

    return NextResponse.json({ activities: rows })
  } catch (error) {
    console.error('[v0] Activities list error:', error)
    return NextResponse.json({ error: 'Error fetching activities' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { leadId, type, notes, nextNotes } = await request.json()

    if (!leadId || !MANUAL_TYPES.includes(type)) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
    }

    const [created] = await db
      .insert(leadActivities)
      .values({ leadId, type, notes: notes || null, nextNotes: nextNotes || null })
      .returning()

    return NextResponse.json({ ok: true, activity: created })
  } catch (error) {
    console.error('[v0] Activity create error:', error)
    return NextResponse.json({ error: 'Error al añadir la actividad' }, { status: 500 })
  }
}
